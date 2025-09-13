'use client'
import { useMemo, useState } from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import { extractVideoId } from "@/utils/helpers";
import VideoSection from "@/components/shared/VideoSection";

export default function ExplorePropertiesSection() {
    const [isPlaying, setIsPlaying] = useState(false);

    // Your YouTube URL
    const videoUrl = "https://youtu.be/v6E-NKtYLRg?si=nCCCOoyOfkELc9kx";

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
                <VideoSection videoUrl={videoUrl} />
            </div>
        </section>
    );
}
