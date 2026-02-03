import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: 'blue' | 'green' | 'purple' | 'orange';
    subtitle?: string;
}

const colorClasses = {
    blue: '#3B82F6',
    green: '#10B981',
    purple: '#A855F7',
    orange: '#F97316',
};

export default function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    color = 'blue',
    subtitle
}: StatCardProps) {
    return (
        <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{title}</p>
                    <h3 className="text-2xl font-bold mt-2">{value}</h3>

                    {subtitle && (
                        <p className="text-sm mt-1" style={{ color: colorClasses[color] }}>
                            {subtitle}
                        </p>
                    )}

                    {trend && (
                        <div className={`flex items-center gap-1 mt-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {trend.isPositive ? (
                                <ArrowUp className="w-4 h-4" />
                            ) : (
                                <ArrowDown className="w-4 h-4" />
                            )}
                            <span className="font-medium">{Math.abs(trend.value)}%</span>
                            <span className="text-muted-foreground">vs mes anterior</span>
                        </div>
                    )}
                </div>

                {Icon && (
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${colorClasses[color]}20` }}>
                        <Icon className="w-6 h-6" style={{ color: colorClasses[color] }} />
                    </div>
                )}
            </div>
        </Card>
    );
}

