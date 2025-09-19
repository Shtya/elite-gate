'use client';

import React, { useEffect, useState } from 'react';
import InfoCell from '../shared/InfoCell';
import Popup from '../shared/Popup';
import KeywordSearch from '../shared/KeywordSearch';
import { useDebounce } from '@/hooks/useDebounce';
import { MdClose } from 'react-icons/md';
import { mockAppointments } from '@/constants/dashboard/appointment/contants';

type Agent = {
    id: number;
    name: string;
    email: string;
    image?: string;
};

type Props = {
    selectedAgent?: Agent;
    onSelect: (agent: Agent) => void;
    onClear: () => void;
};



export default function AgentFilterPopup({ selectedAgent, onSelect, onClear }: Props) {
    const [show, setShow] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(false);

    // ✅ Move inside component to avoid early access
    const allAgents: Agent[] = React.useMemo(() => {
        return Array.from(
            new Map(mockAppointments.map((a) => [a.agent.id, a.agent])).values()
        );
    }, []);

    const topAgents: Agent[] = React.useMemo(() => {
        return allAgents.slice(0, 5);
    }, [allAgents]);

    const debouncedQuery = useDebounce(query);

    useEffect(() => {
        const fetchAgents = async () => {
            const trimmed = debouncedQuery.trim();
            if (trimmed.length <= 2) {
                setResults([]);
                return;
            }

            setLoading(true);
            await new Promise((r) => setTimeout(r, 300));

            const lower = trimmed.toLowerCase();
            const filtered = allAgents.filter(
                (a) =>
                    a.name.toLowerCase().includes(lower) ||
                    a.email.toLowerCase().includes(lower)
            );

            setResults(filtered);
            setLoading(false);
        };

        fetchAgents();
    }, [debouncedQuery]);

    return (
        <div className="relative">
            {!selectedAgent ? (
                <button
                    onClick={() => setShow(true)}
                    className="py-3 px-8 border font-semibold rounded-full hover:bg-gray-200 transition-colors"
                >
                    تصفية حسب الوسيط
                </button>
            ) : (
                <div className="flex items-center gap-2 border  p-1 rounded-full bg-white ">
                    <InfoCell
                        user={selectedAgent}
                        href={`/dashboard/agents/${selectedAgent.id}`}
                        imageRounded="full"
                    />
                    <button onClick={onClear} className="text-gray-500 hover:text-red-500 p-2 rounded-full">
                        <MdClose className="w-5 h-5" />
                    </button>
                </div>
            )}

            <Popup show={show} onClose={() => setShow(false)}>
                <h3 className="text-lg font-semibold mb-4">ابحث عن وسيط</h3>
                <KeywordSearch
                    value={query}
                    onChange={setQuery}
                    searchPlaceholder="ابحث باسم أو بريد الوسيط لعرض النتائج"
                />


                {loading ? (
                    <p className="text-center text-sm text-gray-500">جاري البحث...</p>
                ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto mt-3">
                        {results.length > 0 ? (
                            results.map((agent) => (
                                <button
                                    key={agent.id}
                                    onClick={() => {
                                        onSelect(agent);
                                        setShow(false);
                                    }}
                                    className="w-full text-left"
                                >
                                    <InfoCell
                                        user={agent}
                                        href={`/dashboard/agents/${agent.id}`}
                                        imageRounded="full"
                                        className="hover:bg-gray-100 p-2 rounded"
                                    />
                                </button>
                            ))
                        ) : debouncedQuery.trim().length <= 2 ? (
                            <>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">الأكثر تفاعلاً</h4>
                                {topAgents.map((agent) => (
                                    <button
                                        key={agent.id}
                                        onClick={() => {
                                            onSelect(agent);
                                            setShow(false);
                                        }}
                                        className="w-full text-left"
                                    >
                                        <InfoCell
                                            user={agent}
                                            href={`/dashboard/agents/${agent.id}`}
                                            imageRounded="full"
                                            className="hover:bg-gray-100 p-2 rounded"
                                        />
                                    </button>
                                ))}
                            </>
                        ) : (
                            <p className="text-sm text-gray-400 text-center mt-2 min-h-32 flex justify-center items-center">
                                لا توجد نتائج
                            </p>
                        )}

                    </div>
                )}
            </Popup>
        </div>
    );
}
