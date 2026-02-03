import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CreditCard, Wallet } from 'lucide-react';

interface CashSession {
    session_id: string;
    session_number: string;
    cashier: string;
    opened_at: string;
    total_sales: number;
    cash: number;
    card: number;
    is_open: boolean;
}

interface CashSummaryProps {
    cashData: CashSession | null;
}

export default function CashSummary({ cashData }: CashSummaryProps) {
    if (!cashData) {
        return (
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Resumen de Caja</h3>
                <div className="text-center py-8 text-muted-foreground">
                    <Wallet className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No hay caja abierta</p>
                </div>
            </Card>
        );
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-DO', {
            style: 'currency',
            currency: 'DOP',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Resumen de Caja</h3>
                <Badge variant="default" className="bg-green-500">
                    Abierta
                </Badge>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Turno:</span>
                    <span className="font-semibold">#{cashData.session_number}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Cajero:</span>
                    <span className="font-medium">{cashData.cashier}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Apertura:</span>
                    <span className="font-medium">
                        {new Date(cashData.opened_at).toLocaleTimeString('es-DO', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </span>
                </div>

                <div className="border-t pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium">Total Ventas</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">
                            {formatCurrency(cashData.total_sales)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <Wallet className="w-4 h-4 text-muted-foreground" />
                            <span>Efectivo</span>
                        </div>
                        <span className="font-medium">{formatCurrency(cashData.cash)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-muted-foreground" />
                            <span>Tarjeta</span>
                        </div>
                        <span className="font-medium">{formatCurrency(cashData.card)}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
