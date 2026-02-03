import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, Download, UserPlus, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { format, startOfMonth, endOfMonth } from 'date-fns';

export default function CustomersReport() {
    const [startDate, setStartDate] = useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(endOfMonth(new Date()), 'yyyy-MM-dd'));
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/reportes/api/resumen-clientes', {
                params: { start_date: startDate, end_date: endDate }
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-DO', {
            style: 'currency',
            currency: 'DOP',
        }).format(value);
    };

    return (
        <AppLayout>
            <Head title="Reporte de Clientes" />
            <div className="flex h-full flex-1 flex-col gap-3 p-2 md:p-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold">Reporte de Clientes</h1>
                        <p className="text-muted-foreground mt-2">
                            Análisis de clientes y comportamiento de compra
                        </p>
                    </div>
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                    </Button>
                </div>

                {/* Filters */}
                <Card className="p-4 ">
                    <div className="flex gap-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 items-center justify-center">
                        <div className=" fle">
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
                          <Button onClick={fetchData}>Aplicar Filtros</Button>
                    </div>
                
                </Card>

                {loading ? (
                    <div className="text-center py-12">Cargando datos...</div>
                ) : (
                    <>
                        {/* KPIs */}
                        <div className="grid  md:grid-cols-4">
                            <Card className="p-4    dark:from-green-950 dark:to-green-900 border-green-200 ">
                                <div className="flex items-center gap-4">

                                    <div>
                                        <p className="text-sm text-muted-foreground">Clientes Nuevos</p>
                                        <p className="text-lg font-bold">{data?.new_customers || 0}</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-6    dark:from-green-950 dark:to-green-900 border-green-200 ">
                                <div className="flex items-center gap-4">

                                    <div>
                                        <p className="text-sm text-muted-foreground">Top Clientes</p>
                                        <p className="text-lg font-bold">{data?.top_customers?.length || 0}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Chart */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Top 10 Clientes por Valor</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={data?.top_customers || []}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                                    <Legend />
                                    <Bar dataKey="total_spent" fill="#82ca9d" name="Total Gastado" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>

                        {/* Top Customers Table */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Detalle de Top Clientes</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2">Cliente</th>
                                            <th className="text-center py-2">Órdenes</th>
                                            <th className="text-right py-2">Total Gastado</th>
                                            <th className="text-right py-2">Promedio por Orden</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!data?.top_customers || data.top_customers.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="text-center py-8 text-muted-foreground">
                                                    No hay datos de clientes en este período
                                                </td>
                                            </tr>
                                        ) : (
                                            data.top_customers.map((customer: any, index: number) => (
                                                <tr key={customer.id} className="border-b">
                                                    <td className="py-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold text-muted-foreground">#{index + 1}</span>
                                                            <span className="font-medium">{customer.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">{customer.orders_count}</td>
                                                    <td className="text-right font-semibold">
                                                        {formatCurrency(customer.total_spent)}
                                                    </td>
                                                    <td className="text-right text-muted-foreground">
                                                        {formatCurrency(customer.total_spent / customer.orders_count)}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
