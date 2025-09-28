'use client'
import FallbackImage from '@/components/shared/FallbackImage'

interface Agent {
    id: string
    name: string
    image: string
    totalAppointments: number
    completedAppointments: number
}

interface AgentPerformanceCardProps {
    agents: Agent[]
}

export default function AgentPerformanceCard({ agents }: AgentPerformanceCardProps) {
    return (
        <div className="space-y-4">
            {agents.map((agent) => {
                const completionRate = agent.totalAppointments > 0
                    ? Math.round((agent.completedAppointments / agent.totalAppointments) * 100)
                    : 0

                return (
                    <div key={agent.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        {/* Agent Image */}
                        <div className="relative w-12 h-12 flex-shrink-0">
                            <FallbackImage src={agent.image} alt={agent.name} fill className="rounded-full object-cover" />
                        </div>

                        {/* Agent Info */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-800 truncate">
                                {agent.name}
                            </h4>
                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                                <span>المواعيد: {agent.totalAppointments}</span>
                                <span>المكتملة: {agent.completedAppointments}</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex-shrink-0 w-20">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-gray-700">
                                    {completionRate}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${completionRate}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
