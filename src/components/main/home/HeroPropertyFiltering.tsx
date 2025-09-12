"use client";

import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Slider from "rc-slider";
import Link from "next/link";
import SelectDropdown from "@/components/shared/SelectDropdown";

type TransactionType = "للإيجار" | "للبيع";
type CityType = "نيويورك" | "شيكاغو" | "أتلانتا" | "تورونتو" | "لوس أنجلوس";
type PropertyType = "شقة" | "فيلا" | "مكتب";

export default function HeroPropertyFiltering() {
    const [transaction, setTransaction] = useState<TransactionType>("للإيجار");
    const [city, setCity] = useState<CityType>("نيويورك");
    const [propertyType, setPropertyType] = useState<PropertyType>("شقة");
    const [price, setPrice] = useState<number>(40);

    return (
        <div className="z-30 p-4 lg:p-5 rounded-xl shadow-lg bg-white flex flex-wrap items-center gap-3 relative max-w-[1060px] mx-auto mt-12">
            <div className="w-full md:w-[48%] xl:w-[22%] cursor-pointer">
                <SelectDropdown
                    options={["للإيجار", "للبيع"]}
                    value={transaction}
                    onChange={setTransaction}
                />
            </div>

            <div className="w-full md:w-[48%] xl:w-[22%] cursor-pointer">
                <SelectDropdown
                    options={["نيويورك", "شيكاغو", "أتلانتا", "تورونتو", "لوس أنجلوس"]}
                    value={city}
                    onChange={setCity}
                />
            </div>
            <div className="w-full md:w-[48%] xl:w-[22%] cursor-pointer">
                <SelectDropdown
                    options={["شقة", "فيلا", "مكتب"]}
                    value={propertyType}
                    onChange={setPropertyType}
                />
            </div>

            {/* Price Slider */}
            <div className="w-full md:w-[48%] xl:w-[22%]">
                <div className="relative flex items-center gap-2 py-2 px-6 bg-bg-1 border rounded-3xl focus:shadow-xl">
                    <span className="flex items-center gap-1">
                        <AiOutlineSearch className="w-5 h-5" />
                        السعر
                    </span>
                    <span className="absolute top-[-14px] right-4 bg-white px-5 py-1 rounded-2xl shadow text-primary text-xs">
                        ${price}
                    </span>
                    <div className="flex-1 px-2">
                        <Slider
                            min={0}
                            max={100}
                            value={price}
                            onChange={(val) => setPrice(val as number)}
                            styles={{
                                track: { backgroundColor: "var(--primary)" },
                                handle: {
                                    borderColor: "var(--primary)",
                                    backgroundColor: "var(--primary)",
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Search Button */}
            <div className="w-full xl:w-auto">
                <Link href="/search" className="py-[14px] px-6 w-full flex justify-center text-white bg-primary rounded-full">
                    <AiOutlineSearch className="w-5 h-5 shrink-0" />
                </Link>
            </div>
        </div>
    )
}