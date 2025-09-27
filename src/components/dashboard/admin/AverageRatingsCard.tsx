'use client'
import { FaStar, FaUserTie, FaEye, FaComments, FaClock } from 'react-icons/fa'

interface RatingCategory {
    name: string
    value: number
    maxValue: number
    icon: React.ReactNode
}

interface AverageRatingsCardProps {
    ratings: RatingCategory[]
}

export default function AverageRatingsCard({ ratings }: AverageRatingsCardProps) {
    // Calculate global average
    const globalAverage = ratings.reduce((sum, rating) => sum + rating.value, 0) / ratings.length
    const globalPercentage = (globalAverage / 5) * 100

    return (
        <div className="space-y-6">
            {/* Global Average Circle */}
            {/* Global Average Circle */}
            <div className="flex justify-center">
                <div className="relative w-32 h-32"> {/* ⬅️ Increased size */}
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="rgb(229 231 235)"
                            strokeWidth="8"
                            fill="none"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="var(--primary)"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - globalPercentage / 100)}`}
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-primary"> {/* ⬅️ Slightly larger text */}
                            {globalAverage.toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-600">5/</span>
                    </div>
                </div>
            </div>

            {/* Individual Ratings */}
            <div className="space-y-4">
                {ratings.map((rating, index) => {
                    const percentage = (rating.value / rating.maxValue) * 100

                    return (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="text-primary">
                                        {rating.icon}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {rating.name}
                                    </span>
                                </div>
                                <span className="text-sm font-semibold text-gray-800">
                                    {rating.value}/{rating.maxValue}
                                </span>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// Default ratings data
export const defaultRatings: RatingCategory[] = [
    {
        name: 'الاحترافية',
        value: 5,
        maxValue: 5,
        icon: <FaUserTie className="w-4 h-4" />
    },
    {
        name: 'الوضوح',
        value: 4.3,
        maxValue: 5,
        icon: <FaEye className="w-4 h-4" />
    },
    {
        name: 'التواصل',
        value: 4.3,
        maxValue: 5,
        icon: <FaComments className="w-4 h-4" />
    },
    {
        name: 'سرعة الاستجابة',
        value: 4.3,
        maxValue: 5,
        icon: <FaClock className="w-4 h-4" />
    }
]
