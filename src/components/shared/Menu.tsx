'use client';

import React, {
    cloneElement,
    ReactElement,
    ReactNode,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';

export type MenuChildProps = {
    onClose: () => void;
};

type MenuProps = {
    trigger: (toggle: () => void) => ReactNode;
    children: ReactElement<MenuChildProps>; // expects onClose prop
    className?: string;
    width?: number; // px
    align?: 'right' | 'left'; // alignment relative to trigger
};

export default function Menu({
    trigger,
    children,
    width = 224,
    className = '',
    align = 'right',
}: MenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const anchorRef = useRef<HTMLElement | null>(null); // the trigger wrapper

    const menuRef = useRef<HTMLDivElement | null>(null);
    const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

    const onClose = () => setIsMenuOpen(false);
    const toggleMenu = () => setIsMenuOpen((p) => !p);

    // measure and position the menu relative to anchor
    const updatePosition = () => {
        const anchor = anchorRef.current;
        if (!anchor) return;
        const rect = anchor.getBoundingClientRect();
        // default align right (align menu's right edge with anchor's right edge)
        let left = rect.left;
        if (align === 'right') {
            left = rect.right - width;
        } else {
            left = rect.left;
        }

        // Keep menu inside viewport (basic clamp)
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const clampedLeft = Math.max(8, Math.min(left, vw - width - 8));
        const top = rect.bottom + window.scrollY + 8; // 8px offset
        const clampedTop = Math.max(8 + window.scrollY, Math.min(top, window.scrollY + vh - 40));
        setPos({ top: clampedTop, left: clampedLeft });
    };

    // When menu opens, compute position
    useLayoutEffect(() => {
        if (isMenuOpen) {
            updatePosition();
        } else {
            setPos(null);
        }
    }, [isMenuOpen]);

    // Recompute on resize/scroll (throttle-ish via requestAnimationFrame)
    useEffect(() => {
        if (!isMenuOpen) return;
        let raf = 0;
        const handler = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => updatePosition());
        };
        window.addEventListener('resize', handler);
        window.addEventListener('scroll', handler, true); // capture scroll from ancestors
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', handler);
            window.removeEventListener('scroll', handler, true);
        };
    }, [isMenuOpen]);

    // close when clicking outside anchor or menu (works across portal boundary)
    useEffect(() => {
        const handleMousedown = (ev: MouseEvent) => {
            if (!isMenuOpen) return;
            const target = ev.target as Node | null;
            if (!target) return;
            if (target instanceof Element && target.closest('[data-popup]')) {
                return;
            }
            if (menuRef.current?.contains(target)) return;
            if (anchorRef.current?.contains(target)) return;
            setIsMenuOpen(false);
        };
        document.addEventListener('mousedown', handleMousedown);
        return () => document.removeEventListener('mousedown', handleMousedown);
    }, [isMenuOpen]);

    // We'll render the trigger inside a span so we can measure it and attach ref
    // NOTE: trigger(toggle) might return a <button> — we wrap it in a span that forwards events.
    const triggerElement = (
        <span
            ref={(el) => {
                // anchorRef should be an HTMLElement. Cast from HTMLSpanElement to HTMLElement ok.
                anchorRef.current = el;
            }}
            className="inline-flex"
        // keep wrapper display inline so table layout unaffected
        >
            {trigger(toggleMenu)}
        </span>
    );

    // menu JSX (rendered into portal)
    const menuNode =
        pos && typeof document !== 'undefined' ? (
            createPortal(
                <div
                    ref={menuRef}
                    role="menu"
                    aria-hidden={!isMenuOpen}
                    style={{
                        position: 'absolute',
                        top: pos.top,
                        left: pos.left,
                        width: `${width}px`,
                        zIndex: 9999,
                    }}
                    className={`rounded-md bg-white shadow-lg border p-3 transition-all duration-150 ease-in-out transform ${isMenuOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'} ${className}`}
                >
                    {cloneElement(children, { onClose })}
                </div>,
                document.body
            )
        ) : null;

    return (
        <>
            {/* trigger placed inline in DOM (inside table cell) so click area is correct */}
            {triggerElement}

            {/* only mount portal node when menu is open (or pos measured) */}
            {isMenuOpen && menuNode}
        </>
    );
}
