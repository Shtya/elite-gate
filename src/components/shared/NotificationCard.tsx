"use client";
import { NotificationType } from "@/types/global";
import React, { JSX, useState } from "react";
import { AiOutlineInfoCircle, AiOutlineCheckCircle, AiOutlineWarning, AiOutlineCloseCircle } from "react-icons/ai";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";
import { MdClose } from "react-icons/md";



interface NotificationCardProps {
    type?: NotificationType;
    title: string;
    description?: string;
    /** called when user clicks the X or when the default action closes it */
    onClose?: () => void;
    /** custom action area (e.g. a button). If omitted a small "Okay" button that closes will be shown */
    actions?: React.ReactNode;
    defaultOpen?: boolean;
}

const CONFIG: Record<NotificationType, { icon: JSX.Element; iconBg: string; titleColor: string; borderColor: string }> = {
    info: {
        icon: <AiOutlineInfoCircle className="w-4 h-4" />,
        iconBg: "bg-blue-100 text-blue-600",
        titleColor: "text-blue-700",
        borderColor: "border-blue-100",
    },
    done: {
        icon: <AiOutlineCheckCircle className="w-4 h-4" />,
        iconBg: "bg-green-100 text-green-600",
        titleColor: "text-green-700",
        borderColor: "border-green-100",
    },
    warn: {
        icon: <AiOutlineWarning className="w-4 h-4" />,
        iconBg: "bg-yellow-100 text-yellow-600",
        titleColor: "text-yellow-700",
        borderColor: "border-yellow-100",
    },
    error: {
        icon: <AiOutlineCloseCircle className="w-4 h-4" />,
        iconBg: "bg-red-100 text-red-600",
        titleColor: "text-red-700",
        borderColor: "border-red-100",
    },
};

export default function NotificationCard({
    type = "info",
    title,
    description,
    onClose,
    actions,
    defaultOpen = false,
}: NotificationCardProps) {
    const [open, setOpen] = useState<boolean>(defaultOpen);
    const [visible, setVisible] = useState<boolean>(true);

    if (!visible) return null;

    const cfg = CONFIG[type];

    function handleClose() {
        setVisible(false);
        onClose?.();
    }

    return (
        <div
            className={`w-full rounded-xl border ${cfg.borderColor} bg-white shadow-sm p-3`}
        >
            <div className="flex gap-3">
                {/* left icon */}
                <div
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${cfg.iconBg} ring-0`}
                    aria-hidden
                >
                    {cfg.icon}
                </div>

                {/* main content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                        <h4 className={`text-sm font-semibold truncate  ${cfg.titleColor}`} title={title}>{title}</h4>

                        <div className="flex items-center gap-1">
                            <button
                                aria-label={open ? "Collapse notification" : "Expand notification"}
                                onClick={() => setOpen((v) => !v)}
                                className="p-1 rounded hover:bg-gray-100"
                                title={open ? "Collapse" : "Expand"}
                            >
                                {open ? (
                                    <HiChevronUp className="w-4 h-4 text-gray-600" />
                                ) : (
                                    <HiChevronDown className="w-4 h-4 text-gray-600" />
                                )}
                            </button>

                            <button
                                aria-label="Close notification"
                                onClick={handleClose}
                                className="p-1 rounded hover:bg-gray-100"
                                title="Close"
                            >
                                <MdClose className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    {/* collapsible body */}
                    <div
                        className={`mt-2 text-sm text-gray-700 overflow-hidden transition-[max-height] duration-200 ease-in-out ${open ? "max-h-[400px]" : "max-h-0"
                            }`}
                    >
                        {description && <div className="leading-relaxed text-right ">{description}</div>}

                        <div className={`mt-3 ${description ? "" : ""}`}>{/* actions area */}
                            {actions ?? (
                                <button
                                    onClick={handleClose}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
                                >
                                    Okay
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

