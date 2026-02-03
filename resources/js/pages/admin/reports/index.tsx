import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    TrendingUp,
    Package,
    DollarSign,
    Users,
    UserCheck,
    BarChart3
} from 'lucide-react';

export default function ReportsIndex() {
    const reports = [
        {
            title: 'Reportes de Ventas',
            description: 'Análisis de ventas por período, servicio y método de pago',
           
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            href: '/reportes/ventas',
        },
         
         
        {
            title: 'Reportes de Clientes',
            description: 'Clientes nuevos, recurrentes y top clientes',
          
            color: 'text-pink-600',
            bgColor: 'bg-pink-50',
            href: '/reportes/clientes',
        },
        {
            title: 'Reportes de Ingresos',
            description: 'Ingresos totales por ventas y servicios por período',
           
            color: 'text-teal-600',
            bgColor: 'bg-teal-50',
            href: '/reportes/ingresos',
        },
    ];

    return (
        <AppLayout>
            <Head title="Reportes y Analíticas" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold">Reportes y Analíticas</h1>
                    <p className="text-muted-foreground mt-2">
                        Accede a reportes detallados para tomar decisiones informadas
                    </p>
                </div>

                {/* Reports Grid */}
                <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {reports.map((report) => {
                        
                        return (
                            <Card key={report.title} className="p-6  bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 ">
                                <div className="flex items-start gap-">
                                   
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {report.description}
                                        </p>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={report.href}>
                                                <BarChart3 className="h-4 w-4 mr-2" />
                                                Ver Reporte
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Quick Stats */}
                <Card className="p-3 border-t-4 border-primary">
                    <h3 className="text-lg font-semibold mb-4">Acceso Rápido</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="text-center p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Reportes Disponibles</p>
                            <p className="text-2xl font-bold mt-1">{reports.length}</p>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Formatos de Exportación</p>
                            <p className="text-2xl font-bold mt-1">3</p>
                            <p className="text-xs text-muted-foreground mt-1">PDF, Excel, CSV</p>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Actualización</p>
                            <p className="text-2xl font-bold mt-1">Tiempo Real</p>
                        </div>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
