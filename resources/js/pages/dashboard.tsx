import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import StatCard from '@/components/dashboard/StatCard';
import AlertsList from '@/components/dashboard/AlertsList';
import TodayAppointments from '@/components/dashboard/TodayAppointments';
import CashSummary from '@/components/dashboard/CashSummary';
import { Package, DollarSign, Users, UserCheck, RefreshCw, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import axios from 'axios';

interface DashboardData {
  kpis: any;
  alerts: any;
  todayAppointments: any;
  cashSummary: any;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const fetchDashboardData = async (date?: Date) => {
    try {
      setLoading(true);
      const dateParam = date ? format(date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');

      const [kpis, alerts, appointments, cashSummary] =
        await Promise.all([
          axios.get(`/api/dashboard/kpis?date=${dateParam}`),
          axios.get('/api/dashboard/alerts'),
          axios.get(`/api/dashboard/today-appointments?date=${dateParam}`),
          axios.get('/api/dashboard/cash-summary'),
        ]);

      setData({
        kpis: kpis.data,
        alerts: alerts.data,
        todayAppointments: appointments.data,
        cashSummary: cashSummary.data,
      });
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(selectedDate);

    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchDashboardData(selectedDate);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedDate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading && !data) {
    return (
      <AppLayout>

        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg font-medium">Cargando dashboard...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>


      <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Última actualización: {lastUpdate.toLocaleTimeString('es-DO')}
            </p>
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className='border-blue-800 rounded-sm h-10 font-semibold text-blue-800'>
                  <CalendarIcon className="w-4 h-4 mr-3 " />
                  {format(selectedDate, 'dd-MMM-yyyy', { locale: es })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar

                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                  locale={es}
                />
              </PopoverContent>
            </Popover>

          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Solicitudes Card */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              SOLICITUDES DEMO
            </h3>
            <div className="text-4xl font-bold text-gray-900">
              {data?.kpis?.demo_requests || 0}
            </div>
          </div>

          {/* Clientes Card */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              CLIENTES
            </h3>
            <div className="text-4xl font-bold text-gray-900">
              {data?.kpis?.customers || 0}
            </div>
          </div>
        </div>




        {/* Alerts */}
        <AlertsList alerts={data?.alerts || null} />

        {/* Bottom Row */}
        <div className="grid gap-4 lg:grid-cols-2">
          <TodayAppointments appointments={data?.todayAppointments || []} />
          <CashSummary cashData={data?.cashSummary || null} />
        </div>
      </div>
    </AppLayout>
  );
}