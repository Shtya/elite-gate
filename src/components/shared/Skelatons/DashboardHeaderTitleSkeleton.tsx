'use client';

export default function DashboardHeaderTitleSkeleton() {
    return (
        <div
            className="flex items-center justify-between flex-wrap px-6 py-6 md:px-10 md:py-8 lg:px-16 lg:py-10 gap-4 animate-pulse"
            style={{ backgroundColor: 'var(--bg-1)' }}
        >
            {/* Left: Icon + Breadcrumbs */}
            <div className="flex gap-2 items-center text-[var(--dark)]">
                {/* Icon */}
                <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: '#d1d5db' }} // gray-300
                />

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2">
                    <div
                        className="h-5 w-24 rounded-md"
                        style={{ backgroundColor: '#d1d5db' }}
                    />
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: '#d1d5db' }}
                    />
                    <div
                        className="h-5 w-32 rounded-md"
                        style={{ backgroundColor: '#d1d5db' }}
                    />
                </div>
            </div>

            {/* Right: Action Button Placeholder */}
            <div
                className="h-10 rounded-full"
                style={{ backgroundColor: '#d1d5db', width: 144 }}
            />
        </div>
    );
}
