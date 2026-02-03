"use client"

import { useState, useMemo } from "react"
import TechnicianLayout from "@/layouts/technician-layout"
import { Head, router, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Package, CheckCircle2, MapPin, Phone, User, Navigation, Calendar, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { format, startOfDay, endOfDay, isToday, isYesterday, isTomorrow, startOfWeek, endOfWeek, isSameDay } from "date-fns"
import { es } from "date-fns/locale"
import type { ServiceOrder } from "../service-orders/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import InputError from "@/components/input-error"
import OrderMap from "./components/OrderMap"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Props {
  serviceOrders: ServiceOrder[]
}

export default function TechnicianOrdersIndex({ serviceOrders = [] }: Props) {
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null)
  const [isMarkAttendedDialogOpen, setIsMarkAttendedDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const markAttendedForm = useForm({
    service_notes: "",
  })

  // Filtrar órdenes por fecha seleccionada
  const filteredOrders = useMemo(() => {
    if (!selectedDate) return serviceOrders

    const start = startOfDay(selectedDate)
    const end = endOfDay(selectedDate)

    return serviceOrders.filter((order) => {
      // Filtrar por fecha de creación o fecha programada
      const orderDate = order.start 
        ? new Date(order.start) 
        : order.desired_date 
        ? new Date(order.desired_date)
        : order.created_at 
        ? new Date(order.created_at)
        : null

      if (!orderDate) return false

      return orderDate >= start && orderDate <= end
    })
  }, [serviceOrders, selectedDate])

  // Agrupar órdenes por día para mostrar
  const ordersByDay = useMemo(() => {
    const groups: Record<string, ServiceOrder[]> = {}

    filteredOrders.forEach((order) => {
      const orderDate = order.start 
        ? new Date(order.start) 
        : order.desired_date 
        ? new Date(order.desired_date)
        : order.created_at 
        ? new Date(order.created_at)
        : null

      if (!orderDate) return

      const dateKey = format(orderDate, 'yyyy-MM-dd')
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(order)
    })

    return groups
  }, [filteredOrders])

  const handleDateChange = (days: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + days)
    setSelectedDate(newDate)
  }

  const handleDateSelect = (value: string) => {
    if (value === 'today') {
      setSelectedDate(new Date())
    } else if (value === 'yesterday') {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      setSelectedDate(yesterday)
    } else if (value === 'tomorrow') {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      setSelectedDate(tomorrow)
    } else if (value === 'thisWeek') {
      setSelectedDate(new Date())
    }
  }

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Hoy'
    if (isYesterday(date)) return 'Ayer'
    if (isTomorrow(date)) return 'Mañana'
    return format(date, 'EEEE, d MMMM', { locale: es })
  }

  function getStatusBadgeVariant(status?: string) {
    switch (status?.toLowerCase()) {
      case "pending":
      case "pendiente":
        return "outline"
      case "scheduled":
      case "programada":
        return "secondary"
      case "in_progress":
      case "en_proceso":
        return "default"
      case "completed":
      case "completada":
        return "default"
      case "pending_billing":
      case "pendiente_facturacion":
        return "secondary"
      case "cancelled":
      case "cancelada":
        return "destructive"
      default:
        return "outline"
    }
  }

  function getStatusLabel(status?: string) {
    if (!status) return "Sin estado"
    const statusMap: Record<string, string> = {
      pending: "Orden Creada",
      pendiente: "Orden Creada",
      tecnico_asignado: "Técnico Asignado",
      scheduled: "Agendada",
      programada: "Agendada",
      in_progress: "En Proceso",
      en_proceso: "En Proceso",
      completed: "Completada",
      completada: "Completada",
      pending_billing: "Pendiente Facturación",
      pendiente_facturacion: "Pendiente Facturación",
      cancelled: "Cancelada",
      cancelada: "Cancelada",
    }
    return statusMap[status.toLowerCase()] || status
  }

  const handleMarkAsAttended = (order: ServiceOrder) => {
    setSelectedOrder(order)
    setIsMarkAttendedDialogOpen(true)
    const existingNotes = order.service_notes
    let notesText = ""
    if (existingNotes && typeof existingNotes === 'object') {
      notesText = existingNotes.description || existingNotes.notes || ""
    } else if (typeof existingNotes === 'string') {
      notesText = existingNotes
    }
    markAttendedForm.setData({
      service_notes: notesText,
    })
  }

  const handleSubmitMarkAttended = () => {
    if (!selectedOrder) return

    markAttendedForm.post(`/service-orders-technician/${selectedOrder.id}/mark-attended`, {
      preserveScroll: true,
      onSuccess: () => {
        setIsMarkAttendedDialogOpen(false)
        setSelectedOrder(null)
        markAttendedForm.reset()
        router.reload()
      },
    })
  }

  const openInMaps = (address: string, lat?: number | null, lng?: number | null) => {
    if (lat && lng) {
      // Si tenemos coordenadas, usar esas
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank')
    } else if (address) {
      // Si solo tenemos dirección, usar esa
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank')
    }
  }

  return (
    <TechnicianLayout>
      <Head title="Mis Ordenes" />
      <div className="space-y-4 p-4 pb-20 max-w-5xl mx-auto">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-lg font-bold">Mis Órdenes</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gestiona tus órdenes de servicio asignadas
            </p>
          </div>

          {/* Filtro de Fecha */}
          <Card className="p-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDateChange(-1)}
                  className="h-9"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md min-w-[200px] justify-center">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">
                    {getDateLabel(selectedDate)}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDateChange(1)}
                  className="h-9"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(new Date())}
                  className="h-9"
                >
                  Hoy
                </Button>
              </div>

              <Select value={isToday(selectedDate) ? 'today' : isYesterday(selectedDate) ? 'yesterday' : isTomorrow(selectedDate) ? 'tomorrow' : ''} onValueChange={handleDateSelect}>
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Seleccionar fecha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoy</SelectItem>
                  <SelectItem value="yesterday">Ayer</SelectItem>
                  <SelectItem value="tomorrow">Mañana</SelectItem>
                  <SelectItem value="thisWeek">Esta Semana</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>

        {/* Lista de Órdenes */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="p-12 text-center border-dashed">
              <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground/40" />
              <p className="text-lg font-semibold mb-1">No hay órdenes</p>
              <p className="text-sm text-muted-foreground">
                {serviceOrders.length === 0 
                  ? 'No tienes órdenes asignadas en este momento'
                  : `No hay órdenes para ${getDateLabel(selectedDate).toLowerCase()}`
                }
              </p>
            </Card>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N.º Orden</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const isCompleted =
                      order.status?.toLowerCase() === "completed" || order.status?.toLowerCase() === "completada"
                    
                    const orderDateTime = order.start 
                      ? new Date(order.start) 
                      : order.desired_date 
                      ? new Date(order.desired_date)
                      : null
                    const timeStr = orderDateTime 
                      ? format(orderDateTime, 'HH:mm')
                      : order.desired_time || ''

                    return (
                      <TableRow key={order.id} onClick={() => router.visit(`/service-orders-technician/${order.id}`)} className="cursor-pointer">
                        <TableCell className="font-medium p-4">{order.service_order_number || `#${order.id.slice(0, 8)}`}</TableCell>
                        <TableCell className="p-4">{order.customer?.name || 'N/A'}</TableCell>
                        <TableCell className="p-4">{order.customer?.address || order.customer_address || 'N/A'}</TableCell>
                        <TableCell className="p-4">{timeStr}</TableCell>
                        <TableCell className="p-4">
                          <Badge variant={getStatusBadgeVariant(order.status)} className="shrink-0">
                            {getStatusLabel(order.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right p-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                router.visit(`/service-orders-technician/${order.id}`)
                              }}
                              variant="outline"
                              size="sm"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {(order.status?.toLowerCase() === "scheduled" || order.status?.toLowerCase() === "programada") && !isCompleted && (
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleMarkAsAttended(order)
                                }}
                                size="sm"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </div>

      {/* Dialog para marcar como atendida */}
      <Dialog open={isMarkAttendedDialogOpen} onOpenChange={setIsMarkAttendedDialogOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Marcar como Atendida</DialogTitle>
            <DialogDescription className="text-sm">
              Describe el trabajo realizado y las piezas necesarias
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="service_notes" className="text-sm font-semibold">
                Descripción del Trabajo *
              </Label>
              <Textarea
                id="service_notes"
                value={markAttendedForm.data.service_notes}
                onChange={(e) => markAttendedForm.setData("service_notes", e.target.value)}
                placeholder="Ejemplo: Limpieza de filtro, cambio de compresor modelo XYZ, 2 unidades de gas refrigerante..."
                rows={6}
                className="text-sm resize-none"
                required
              />
              <p className="text-xs text-muted-foreground">
                Incluye todos los detalles del trabajo y las piezas utilizadas
              </p>
              <InputError message={markAttendedForm.errors.service_notes} />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsMarkAttendedDialogOpen(false)}
              className="w-full sm:w-auto h-11"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSubmitMarkAttended}
              disabled={markAttendedForm.processing || !markAttendedForm.data.service_notes.trim()}
              className="w-full sm:w-auto h-11"
            >
              {markAttendedForm.processing ? "Guardando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TechnicianLayout>
  )
}
