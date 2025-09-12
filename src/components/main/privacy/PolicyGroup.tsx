import React from 'react';
import PolicyCard from './PolicyCard';

interface PolicyGroupProps {
    policies: {
        title: string;
        items: string[];
    }[];
}

export default function PolicyGroup({ policies }: PolicyGroupProps) {
    return (
        <div className="rounded-2xl grid grid-cols-12 gap-6 bg-white p-4 md:p-6 lg:p-8 shadow-lg mb-6">
            {policies.map((Policy, idx) => (
                <PolicyCard key={idx} title={Policy.title} items={Policy.items} />
            ))}
        </div>
    );
}
