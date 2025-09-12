export default function MenuItem({
    icon,
    label,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}) {
    return (
        <button
            className="group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100 mt-2"
            role="menuitem"
            onClick={onClick}
        >
            {icon}
            {label}
        </button>
    );
}
