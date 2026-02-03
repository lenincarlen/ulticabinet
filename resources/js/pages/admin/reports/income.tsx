import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, TrendingUp, TrendingDown, ShoppingCart, Wrench, Calendar, Download } from 'lucide-react';

interface DailyBreakdown {
    date: string;
    date_formatted: string;
    sales: number;
    services: number;
    total: number;
}

interface PaymentMethod {
    method: string;
    total: number;
}

interface IncomeReportProps {
    filters: {
        start_date: string;
        end_date: string;
    };
    summary: {
        sales_revenue: number;
        service_revenue: number;
        total_revenue: number;
        growth_percentage: number;
        previous_period: {
            sales: number;
            services: number;
            total: number;
        };
    };
    daily_breakdown: DailyBreakdown[];
    revenue_by_payment_method: PaymentMethod[];
}

export default function IncomeReport({ filters, summary, daily_breakdown, revenue_by_payment_method }: IncomeReportProps) {
    const [startDate, setStartDate] = useState(filters.start_date);
    const [endDate, setEndDate] = useState(filters.end_date);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-DO', {
            style: 'currency',
            currency: 'DOP',
        }).format(amount);
    };

    const handleFilter = () => {
        router.get('/reportes/ingresos', {
            start_date: startDate,
            end_date: endDate,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const salesPercentage = summary.total_revenue > 0
        ? (summary.sales_revenue / summary.total_revenue) * 100
        : 0;

    const servicesPercentage = summary.total_revenue > 0
        ? (summary.service_revenue / summary.total_revenue) * 100
        : 0;

    return (
        <AppLayout>
            <Head title="Reporte de Ingresos" />

            <div className="p-3 space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-lg font-semibold">Reporte de Ingresos</h1>
                    <p className="text-muted-foreground mt-2">
                        Análisis de ingresos totales por ventas y servicios
                    </p>
                </div>

                {/* Filters */}
                <Card className="p-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 ">
                            <Calendar className="h-5 w-5" />
                            Filtros de Período
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div>
                                <Label>Fecha Inicio</Label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Fecha Fin</Label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate}
                                />
                            </div>
                            <div className="flex items-end">
                                <Button onClick={handleFilter} className="w-full">
                                    Aplicar Filtros
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                    {/* Total Revenue */}
                    <Card >
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-blue-700 dark:text-blue-300">Ingresos Totales</p>
                                    <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">
                                        {formatCurrency(summary.total_revenue)}
                                    </h3>
                                </div>

                            </div>
                            <div className="mt-3 flex items-center gap-1">
                                {summary.growth_percentage >= 0 ? (
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                ) : (
                                    <TrendingDown className="h-4 w-4 text-red-600" />
                                )}
                                <span className={`text-sm font-medium ${summary.growth_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {Math.abs(summary.growth_percentage).toFixed(2)}%
                                </span>
                                <span className="text-xs text-muted-foreground">vs período anterior</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sales Revenue */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-green-700 dark:text-green-300">Ventas (POS)</p>
                                    <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">
                                        {formatCurrency(summary.sales_revenue)}
                                    </h3>
                                </div>

                            </div>
                            <div className="mt-3">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">{salesPercentage.toFixed(1)}% del total</span>
                                </div>
                                <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2 mt-1">
                                    <div
                                        className="bg-green-600 h-2 rounded-full"
                                        style={{ width: `${salesPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Service Revenue */}
                    <Card >
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-purple-700 dark:text-purple-300">Servicios</p>
                                    <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">
                                        {formatCurrency(summary.service_revenue)}
                                    </h3>
                                </div>

                            </div>
                            <div className="mt-3">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">{servicesPercentage.toFixed(1)}% del total</span>
                                </div>
                                <div className="w-full  dark:bg-purple-800 rounded-full h-2 mt-1">
                                    <div
                                        className="bg-purple-600 h-2 rounded-full"
                                        style={{ width: `${servicesPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Previous Period */}
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-sm text-muted-foreground">Período Anterior</p>
                            <h3 className="text-2xl font-bold mt-1">
                                {formatCurrency(summary.previous_period.total)}
                            </h3>
                            <div className="mt-3 space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Ventas:</span>
                                    <span className="font-medium">{formatCurrency(summary.previous_period.sales)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Servicios:</span>
                                    <span className="font-medium">{formatCurrency(summary.previous_period.services)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Revenue by Payment Method */}
                {revenue_by_payment_method.length > 0 && (
                    <Card className="border-none">
                        <CardHeader className="p-6">
                            <CardTitle>Ingresos por Método de Pago (Ventas POS)</CardTitle>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {revenue_by_payment_method.map((method) => (
                                    <div key={method.method} className="p-4   rounded-lg">
                                        <p className="text-sm text-muted-foreground capitalize">{method.method}</p>
                                        <p className="text-xl font-bold mt-1">{formatCurrency(method.total)}</p>
                                    </div>
                                ))}
                            </div>
                               </CardHeader>
                     
                    </Card>
                )}

                {/* Daily Breakdown Table */}
                <Card className="border-none">
                    <CardHeader className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Desglose Diario</CardTitle>
                                <CardDescription>Ingresos detallados por día</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Exportar
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead className="text-right">Ventas (POS)</TableHead>
                                        <TableHead className="text-right">Servicios</TableHead>
                                        <TableHead className="text-right font-bold">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {daily_breakdown.map((day) => (
                                        <TableRow key={day.date}>
                                            <TableCell className="font-medium">{day.date_formatted}</TableCell>
                                            <TableCell className="text-right text-green-600">
                                                {formatCurrency(day.sales)}
                                            </TableCell>
                                            <TableCell className="text-right text-purple-600">
                                                {formatCurrency(day.services)}
                                            </TableCell>
                                            <TableCell className="text-right font-bold">
                                                {formatCurrency(day.total)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {daily_breakdown.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                                No hay datos para el período seleccionado
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
