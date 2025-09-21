import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import KeywordSearch from '@/components/shared/KeywordSearch';
import { projectTypeColors } from '@/constants/dashboard/appointment/contants';
import { AppointmentType } from '@/types/dashboard/appointment';

type Property = {
    id: string;
    imageLink: string;
    type: AppointmentType;
    title: string;
};

type Props = {
    properties: Property[];
    onSelect: (property: Property) => void;
    label?: string;
};

export default function PropertyFilterContent({ properties, onSelect, label = 'العقار' }: Props) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Property[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const debouncedQuery = useDebounce(query);

    const topProperties = properties.slice(0, 5);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const trimmed = debouncedQuery.trim();
        if (trimmed.length <= 2) {
            setResults([]);
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const lower = trimmed.toLowerCase();
            const filtered = properties.filter((p) =>
                p.title.toLowerCase().includes(lower)
            );
            setResults(filtered);
            setLoading(false);
        }, 300);
    }, [debouncedQuery, properties]);

    return (
        <>
            <h3 className="text-lg font-semibold mb-4">ابحث عن {label}</h3>
            <KeywordSearch
                inputRef={inputRef}
                value={query}
                onChange={setQuery}
                searchPlaceholder={`ابحث بعنوان ${label}`}
            />

            {loading ? (
                <p className="text-center text-sm text-gray-500">جاري البحث...</p>
            ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto mt-3">
                    {(results.length > 0 ? results : topProperties).map((property) => (
                        <button
                            key={property.id}
                            onClick={() => onSelect(property)}
                            type='button'
                            className="w-full text-left"
                        >
                            <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded">
                                <img
                                    src={property.imageLink}
                                    alt={property.title}
                                    className="w-14 h-14 rounded-md object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{property.title}</p>
                                    <span
                                        className="text-xs font-medium px-2 py-1 rounded"
                                        style={{
                                            backgroundColor: projectTypeColors[property.type] || '#ccc',
                                            color: '#fff',
                                        }}
                                    >
                                        {property.type}
                                    </span>
                                </div>
                            </div>
                        </button>
                    ))}
                    {results.length === 0 && debouncedQuery.trim().length > 2 && (
                        <p className="text-sm text-gray-400 text-center mt-2 min-h-32 flex justify-center items-center">
                            لا توجد نتائج
                        </p>
                    )}
                </div>
            )}
        </>
    );
}
