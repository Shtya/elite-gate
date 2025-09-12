type PageHeaderProps = {
    title: string,
    description?: string
}
export default function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <header className="text-white text-center py-[60px] px-3 lg:py-[120px] bg-dark">
            <h1 className="h1 font-semibold mb-4 lg:mb-6">{title}</h1>
            {description && <p>{description}</p>}
        </header>
    )
}