'use client';

import { useState } from 'react';
import Card from '@/components/shared/Card';
import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import VideoSection from '@/components/shared/VideoSection';
import CenteredContainer from '@/components/shared/CenteredContainer';

export default function IntroVideoPage() {
    const [videoUrl, setVideoUrl] = useState('https://youtu.be/v6E-NKtYLRg');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div>
            <DashboardHeaderTitle path={['الفيديو التعريفي']} />

            <CenteredContainer className='space-y-6'>
                <Card title="إضافة رابط الفيديو التعريفي">
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="أدخل رابط الفيديو من يوتيوب"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-md text-white bg-[var(--primary)] hover:bg-[var(--primary-600)]"
                        >
                            حفظ الفيديو
                        </button>
                    </form>
                </Card>



                <VideoSection videoUrl={videoUrl} title="الفيديو التعريفي" />
            </CenteredContainer>
        </div>
    );
}
