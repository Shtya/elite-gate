'use client'
import { useMemo, useState } from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import { extractVideoId } from "@/utils/helpers";

export default function ExplorePropertiesSection() {
    const [isPlaying, setIsPlaying] = useState(false);

    // Your YouTube URL
    const videoUrl = "https://youtu.be/v6E-NKtYLRg?si=nCCCOoyOfkELc9kx";
    const videoId = useMemo(() => extractVideoId(videoUrl), [videoUrl]);

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    const handlePlay = () => setIsPlaying(true);

    return (
        <section className="bg-white pt-[60px] lg:pt-[120px] relative z-10">
            {/* Decorative Background Layer */}
            <img
                alt="el"
                width={110}
                height={115}
                className="absolute hidden lg:block top-20 right-20"
                src="/main/about/explore-el-2.png"
            />

            <div className="container z-20 relative">
                {/* Section Title */}
                <SectionTitle
                    arrowTitle="استكشاف العقارات"
                    title="نظرة تفصيلية داخل عقاراتنا"
                    description="يمكن شراء العقارات أو بيعها أو تأجيرها، وهي فرصة استثمارية قيّمة. قيمة العقارات قابلة للنمو..."
                    bgColor="var(--primary-light)"
                />

                {/* Video Section */}
                <div className="relative mx-auto max-w-6xl mt-10 z-30">
                    <div
                        className="relative w-full rounded-2xl overflow-hidden border-[1px]  shadow-lg"
                        style={{ paddingTop: "56.25%" }}
                    >
                        {!isPlaying ? (
                            <div
                                className="absolute top-0 left-0 w-full h-full bg-cover bg-center cursor-pointer flex items-center justify-center"
                                style={{ backgroundImage: `url(${thumbnailUrl})` }}
                                onClick={handlePlay}
                            >
                                <span className="bg-yellow-400 w-16 h-16 grid place-items-center rounded-full shadow-lg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="black"
                                        viewBox="0 0 24 24"
                                        className="w-6 h-6"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </span>
                            </div>
                        ) : (
                            <iframe
                                className="absolute top-0 left-0 w-full h-full bg-gray-200"
                                src={embedUrl}
                                title="Inside Our Properties"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
