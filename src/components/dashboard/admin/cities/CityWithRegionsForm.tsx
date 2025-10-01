'use client';

import PrimaryButton from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import SelectDropdown from '@/components/shared/Forms/SelectDropdown';
import SoftActionButton from '@/components/shared/SoftActionButton';
import { City, Region } from '@/types/dashboard/city';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

type OptionItem = { value: string; label: string };
type Props = {
    cities: City[];
    titleText: string;
};

export default function CityWithRegionsForm({
    cities,
    titleText,
}: Props) {
    const searchParams = useSearchParams();
    const cityIdParam = searchParams.get('city_id');
    const initialCityId = cityIdParam ? parseInt(cityIdParam) : null;

    const [selectedCity, setSelectedCity] = useState<City | null>(
        cities.find((c) => c.id === initialCityId) || null
    );
    const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

    // City options
    const cityOptions: OptionItem[] = cities.map((c) => ({
        value: String(c.id),
        label: c.name,
    }));

    // Region options = only non-selected
    const regionOptions: OptionItem[] =
        selectedCity?.regions
            .filter((r) => !r.selected)
            .map((r) => ({ value: String(r.id), label: r.name })) || [];

    const handleCityChange = (val: string) => {
        if (val === String(selectedCity?.id)) return;
        const city = cities.find((c) => String(c.id) === val) || null;
        setSelectedCity(city);
        setSelectedRegion(null);
    };

    const handleRegionChange = (val: string, label: string) => {
        setSelectedRegion({ id: Number(val), name: label });
    };

    const handleAddRegion = () => {
        if (selectedCity && selectedRegion) {
            const updatedCity: City = {
                ...selectedCity,
                regions: selectedCity.regions.map((r) =>
                    r.id === selectedRegion.id ? { ...r, selected: true } : r
                ),
            };
            setSelectedCity(updatedCity);
            setSelectedRegion(null);
        }
    };

    const handleRemoveRegion = (regionId: number) => {
        if (selectedCity) {
            const updatedCity: City = {
                ...selectedCity,
                regions: selectedCity.regions.map((r) =>
                    r.id === regionId ? { ...r, selected: false } : r
                ),
            };
            setSelectedCity(updatedCity);
        }
    };

    const handleSave = () => {
        if (!selectedCity) return;
        const payload = {
            cityId: selectedCity.id,
            regions: selectedCity.regions.filter((r) => r.selected).map((r) => r.id),
        };
        console.log('Saving to DB:', payload);
    };

    return (
        <Card title={titleText}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
                className="space-y-6"
            >
                <p className="text-sm text-gray-500 mt-1">
                    ملاحظة: سيتم حفظ المدينة المختاره فقط مع مناطقها المختارة.
                </p>
                {/* City Select */}
                <SelectDropdown
                    options={cityOptions}
                    value={selectedCity ? String(selectedCity.id) : ''}
                    onChange={(val) => handleCityChange(val)}
                    label="اختر المدينة"
                />

                {/* Region Select */}
                {selectedCity && (
                    <div className="flex gap-2 items-center justify-center">
                        <div className="flex-1">
                            <SelectDropdown
                                options={regionOptions}
                                value={selectedRegion ? String(selectedRegion.id) : ''}
                                onChange={handleRegionChange}
                                label="اختر المنطقة"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleAddRegion}
                            className="btn-primary px-4 rounded-3xl min-w-12"
                        >
                            ➕ إضافة
                        </button>
                    </div>
                )}

                {/* Added Regions */}
                {selectedCity && selectedCity.regions.some((r) => r.selected) && (
                    <div>
                        <h4 className="text-lg font-semibold mb-2">المناطق المضافة:</h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedCity.regions
                                .filter((r) => r.selected)
                                .map((region) => (
                                    <div
                                        key={region.id}
                                        className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                                    >
                                        <span>{region.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveRegion(region.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {/* Save Button */}
                <div className='space-x-4 flex items-center justify-start'>

                    <PrimaryButton type="submit">
                        حفظ المدينة والمناطق
                    </PrimaryButton>
                    <SoftActionButton onClick={() => { }}>إلغاء</SoftActionButton>
                </div>

            </form>
        </Card>
    );
}
