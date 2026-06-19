import React from 'react'

interface StatCardProps {
    title: string
    value: number | string
    icon: React.ReactNode
    trend?: string
    trendUp?: boolean
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp }) => {
    return (
        <div className="bg-white border border-gray-100/80 rounded-3xl p-7 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200/50 flex items-center justify-center text-gray-700 shadow-xs">
                    {icon}
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                        {trendUp ? '↑' : '↓'} {trend}
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-3xl font-black text-gray-900 mb-1">{value}</h3>
                <span className="text-sm font-semibold text-gray-400 tracking-wide">{title}</span>
            </div>
        </div>
    )
}

export default StatCard