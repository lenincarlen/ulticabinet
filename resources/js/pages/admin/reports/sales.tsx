import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    TrendingUp,
    Download,
    Calendar,
    DollarSign,
    ShoppingCart,
    TrendingDown
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { format, startOfMonth, endOfMonth } from 'date-fns';

export default function SalesReport() {
    const [startDate, setStartDate] = useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(endOfMonth(new Date()), 'yyyy-MM-dd'));
    const [paymentMethod, setPaymentMethod] = useState<string>('all');
    const [salesData, setSalesData] = useState<any>(null);
    const [salesByService, setSalesByService] = useState<any[]>([]);
    const [salesByPayment, setSalesByPayment] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    const fetchData = async () => {
        setLoading(true);
        try {
            const params = {
                start_date: startDate || format(startOfMonth(new Date()), 'yyyy-MM-dd'),
                end_date: endDate || format(endOfMonth(new Date()), 'yyyy-MM-dd'),
                payment_method: paymentMethod !== 'all' ? paymentMethod : undefined,
            };

            console.log('Fetching data with params:', params);

            const [sales, byService, byPayment] = await Promise.all([
                axios.get('/reportes/api/ventas', { params }),
                axios.get('/reportes/api/ventas-por-servicio', { params }),
                axios.get('/reportes/api/ventas-por-metodo-pago', { params }),
            ]);

            console.log('Sales data:', sales.data);
            console.log('By service:', byService.data);
            console.log('By payment:', byPayment.data);

            // Validate and set data
            if (sales.data) {
                setSalesData({
                    sales: sales.data.sales || [],
                    summary: sales.data.summary || {
                        total_sales: 0,
                        total_orders: 0,
                        average_ticket: 0
                    }
                });
            } else {
                setSalesData({
                    sales: [],
                    summary: {
                        total_sales: 0,
                        total_orders: 0,
                        average_ticket: 0
                    }
                });
            }

            setSalesByService(Array.isArray(byService.data) ? byService.data : []);
            setSalesByPayment(Array.isArray(byPayment.data) ? byPayment.data : []);
        } catch (error: any) {
            console.error('Error fetching sales data:', error);
            if (error.response) {
                console.error('Response error:', error.response.data);
                console.error('Status:', error.response.status);
            }
            setSalesData({
                sales: [],
                summary: {
                    total_sales: 0,
                    total_orders: 0,
                    average_ticket: 0
                }
            });
            setSalesByService([]);
            setSalesByPayment([]);
        } finally {
            setLoading(false);
        }
    };

    // Load data on mount
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-DO', {
            style: 'currency',
            currency: 'DOP',
        }).format(value);
    };

    return (
        <AppLayout>
            <Head title="Reporte de Ventas" />
            <div className="flex h-full flex-1 flex-col gap-3 p-4 md:p-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Reporte de Ventas</h1>
                        <p className="text-muted-foreground mt-2">
                            Análisis detallado de ventas por período
                        </p>
                    </div>
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                    </Button>
                </div>

                {/* Filters */}
                <Card className="p-4">
                    <div className="flex gap-4 items-end">
                        <div className="flex-1">
                            <Label>Fecha Inicio</Label>
                            <Input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <Label>Fecha Fin</Label>
                            <Input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <Label>Método de Pago</Label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="all">Todos los métodos</option>
                                <option value="cash">Efectivo</option>
                                <option value="debit_card">Tarjeta Débito</option>
                                <option value="credit_card">Tarjeta Crédito</option>
                                <option value="transfer">Transferencia</option>
                                <option value="mixed">Pago Mixto</option>
                            </select>
                        </div>
                        <Button onClick={fetchData}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Aplicar Filtros
                        </Button>
                    </div>
                </Card>

                {loading ? (
                    <div className="text-center py-12">Cargando datos...</div>
                ) : (
                    <>
                        {/* KPIs */}
                        <div className="grid gap-0 md:grid-cols-3">
                            <Card className="p-6  dark:from-green-950 dark:to-green-900 border-green-200">
                                <div className="flex items-center gap-4">

                                    <div>
                                        <p className="text-sm text-muted-foreground">Total Ventas</p>
                                        <p className="text-lg font-bold">
                                            {formatCurrency(salesData?.summary?.total_sales || 0)}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-6  dark:from-green-950 dark:to-green-900 border-green-200 ">
                                <div className="flex items-center gap-4">

                                    <div>
                                        <p className="text-sm text-muted-foreground">Órdenes</p>
                                        <p className="text-lg font-bold">
                                            {salesData?.summary?.total_orders || 0}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-6   dark:from-green-950 dark:to-green-900 border-green-200">
                                <div className="flex items-center gap-4">

                                    <div>
                                        <p className="text-sm text-muted-foreground">Ticket Promedio</p>
                                        <p className="text-lg font-bold">
                                            {formatCurrency(salesData?.summary?.average_ticket || 0)}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Charts */}
                        <div className="grid  md:grid-cols-2">
                            {/* Sales Trend */}
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Tendencia de Ventas</h3>
                                {salesData?.sales && salesData.sales.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={salesData.sales}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                                            <Legend />
                                            <Line type="monotone" dataKey="total" stroke="#8884d8" name="Ventas" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                                        No hay datos de ventas para el período seleccionado
                                    </div>
                                )}
                            </Card>

                            {/* Sales by Service */}
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Ventas por Servicio</h3>
                                {salesByService && salesByService.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={salesByService}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="service" />
                                            <YAxis />
                                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                                            <Legend />
                                            <Bar dataKey="total" fill="#82ca9d" name="Total" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                                        No hay datos de ventas por servicio para el período seleccionado
                                    </div>
                                )}
                            </Card>

                            {/* Sales by Payment Method */}
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Ventas por Método de Pago</h3>
                                {salesByPayment && salesByPayment.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={salesByPayment}
                                                dataKey="total"
                                                nameKey="payment_method"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                label={(entry) => `${entry.payment_method}: ${formatCurrency(entry.total)}`}
                                            >
                                                {salesByPayment.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                                        No hay datos de ventas por método de pago para el período seleccionado
                                    </div>
                                )}
                            </Card>

                            {/* Sales Table */}
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Detalle por Servicio</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2">Servicio</th>
                                                <th className="text-right py-2">Cantidad</th>
                                                <th className="text-right py-2">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {salesByService && salesByService.length > 0 ? (
                                                salesByService.map((item, index) => (
                                                    <tr key={index} className="border-b">
                                                        <td className="py-2">{item.service || 'Sin especificar'}</td>
                                                        <td className="text-right">{item.count || 0}</td>
                                                        <td className="text-right font-semibold">
                                                            {formatCurrency(item.total || 0)}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={3} className="text-center py-8 text-muted-foreground">
                                                        No hay datos disponibles para el período seleccionado
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
