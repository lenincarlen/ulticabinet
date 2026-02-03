import React, { useState } from 'react';
import { ChevronDown, ChevronUp, History, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface InvoiceChange {
    id: string;
    changed_at: string;
    changes: Record<string, { before: any; after: any }>;
    reason?: string;
    previous_status?: string;
    new_status?: string;
    previous_total?: number;
    new_total?: number;
    user: {
        id: number;
        name?: string;
        email: string;
    };
}

interface InvoiceHistoryProps {
    changes: InvoiceChange[];
}

export function InvoiceHistory({ changes }: InvoiceHistoryProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!changes || changes.length === 0) {
        return null;
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString('es-DO', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatPrice = (price: number) => {
        return `RD$ ${parseFloat(String(price)).toFixed(2)}`;
    };

    const getChangeDescription = (change: InvoiceChange) => {
        const descriptions: string[] = [];

        if (change.previous_status !== change.new_status) {
            descriptions.push(
                `Estado: ${change.previous_status} → ${change.new_status}`
            );
        }

        if (change.previous_total !== change.new_total) {
            descriptions.push(
                `Total: ${formatPrice(change.previous_total || 0)} → ${formatPrice(change.new_total || 0)}`
            );
        }

        if (change.changes) {
            Object.entries(change.changes).forEach(([field, values]) => {
                if (field === 'discount') {
                    descriptions.push(
                        `Descuento: ${values.before}% → ${values.after}%`
                    );
                } else if (field === 'invoice_number') {
                    descriptions.push(
                        `Número: ${values.before} → ${values.after}`
                    );
                } else {
                    descriptions.push(
                        `${field}: ${values.before} → ${values.after}`
                    );
                }
            });
        }

        return descriptions.join(', ');
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full text-left"
            >
                <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-gray-600" />
                    <h3 className="text-sm font-semibold text-gray-900">
                        Historial de Cambios ({changes.length})
                    </h3>
                </div>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
            </button>

            {isExpanded && (
                <div className="mt-4 space-y-3">
                    {changes.map((change, index) => (
                        <div
                            key={change.id}
                            className={cn(
                                "border-l-2 pl-4 py-2",
                                index === 0 ? "border-blue-500" : "border-gray-300"
                            )}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <User className="w-3 h-3 text-gray-500" />
                                    <span className="text-xs font-medium text-gray-700">
                                        {change.user.name || change.user.email}
                                    </span>
                                    {index === 0 && (
                                        <Badge className="bg-blue-500 text-xs">
                                            Más reciente
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(change.changed_at)}
                                </div>
                            </div>

                            {/* Changes */}
                            <p className="text-sm text-gray-700 mb-2">
                                {getChangeDescription(change)}
                            </p>

                            {/* Reason */}
                            {change.reason && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded px-2 py-1 mt-2">
                                    <p className="text-xs text-yellow-800">
                                        <span className="font-semibold">Razón:</span> {change.reason}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
