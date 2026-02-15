
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Plus, Search, Trash2 } from 'lucide-react';

interface Part {
    id?: string;
    product_id?: string;
    part_name: string;
    condition?: 'new' | 'used';
    quantity: number;
    unit_price: number;
    sold_by_staff_id?: string;
    commission_amount?: number;
}

interface CompleteBillingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    customer: any;
    parts: Part[];
    setParts: (parts: Part[]) => void;
    allStaff: Array<{ id: string; name: string; email: string }>;
    technician: any;
    operator: any;
    invoiceStatus: 'pending' | 'paid';
    setInvoiceStatus: (status: 'pending' | 'paid') => void;
    issueDate: string;
    setIssueDate: (date: string) => void;
    discount: number;
    setDiscount: (amount: number) => void;
    serviceCost: number;
    setServiceCost: (amount: number) => void;
    technicianCommission: number;
    setTechnicianCommission: (amount: number) => void;
    onSave: () => void;
    onCustomerChange: (customer: any) => void;
    onProductSearch: (term: string) => Promise<any[]>;
}

export default function CompleteBillingDialog({
    open,
    onOpenChange,
    customer,
    parts,
    setParts,
    allStaff,
    technician,
    operator,
    invoiceStatus,
    setInvoiceStatus,
    issueDate,
    setIssueDate,
    discount,
    setDiscount,
    serviceCost,
    setServiceCost,
    technicianCommission,
    setTechnicianCommission,
    onSave,
    onCustomerChange,
    onProductSearch,
}: CompleteBillingDialogProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const totalPartsCost = parts.reduce((sum, part) => sum + (part.unit_price * part.quantity), 0);
    const subtotal = serviceCost + totalPartsCost;
    const total = subtotal - discount;

    const handleSearchCustomer = async () => {
        // Implement customer search if needed, for now just use onProductSearch as placeholder logic pattern
        // In real app this would call an API
        console.log('Searching customer:', searchTerm);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Crear Factura</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    {/* Customer Section */}
                    <Card className="p-4 space-y-4">
                        <h3 className="font-semibold">Cliente</h3>
                        {!customer ? (
                            <div className="space-y-2">
                                <Label>Buscar Cliente</Label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Nombre o teléfono..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Button variant="outline" size="icon" onClick={handleSearchCustomer}>
                                        <Search className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    (Funcionalidad simplificada para despliegue)
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p className="font-medium">{customer.name}</p>
                                <p className="text-sm text-muted-foreground">{customer.email}</p>
                                <Button variant="link" className="p-0 h-auto" onClick={() => onCustomerChange(null)}>
                                    Cambiar Cliente
                                </Button>
                            </div>
                        )}
                    </Card>

                    {/* Invoice Details */}
                    <Card className="p-4 space-y-4">
                        <h3 className="font-semibold">Detalles</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Fecha de Emisión</Label>
                                <Input
                                    type="date"
                                    value={issueDate}
                                    onChange={(e) => setIssueDate(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Estado</Label>
                                <Select value={invoiceStatus} onValueChange={(v: 'pending' | 'paid') => setInvoiceStatus(v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pendiente</SelectItem>
                                        <SelectItem value="paid">Pagada</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </Card>

                    {/* Service & Costs */}
                    <Card className="p-4 space-y-4 md:col-span-2">
                        <h3 className="font-semibold">Costos y Servicios</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Costo del Servicio</Label>
                                <Input
                                    type="number"
                                    min="0"
                                    value={serviceCost}
                                    onChange={(e) => setServiceCost(Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Descuento</Label>
                                <Input
                                    type="number"
                                    min="0"
                                    value={discount}
                                    onChange={(e) => setDiscount(Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Comisión Técnico</Label>
                                <Input
                                    type="number"
                                    min="0"
                                    value={technicianCommission}
                                    onChange={(e) => setTechnicianCommission(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        {/* Parts Section */}
                        <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <Label className="font-semibold">Repuestos / Materiales</Label>
                                <Button variant="outline" size="sm" onClick={() => {
                                    setParts([...parts, { part_name: '', quantity: 1, unit_price: 0 }]);
                                }}>
                                    <Plus className="h-4 w-4 mr-2" /> Agregar
                                </Button>
                            </div>
                            {parts.length === 0 && (
                                <p className="text-sm text-muted-foreground italic text-center py-2">No hay repuestos agregados.</p>
                            )}
                            <div className="space-y-2">
                                {parts.map((part, index) => (
                                    <div key={index} className="flex gap-2 items-end">
                                        <div className="flex-1">
                                            <Input
                                                placeholder="Nombre del repuesto"
                                                value={part.part_name}
                                                onChange={(e) => {
                                                    const newParts = [...parts];
                                                    newParts[index].part_name = e.target.value;
                                                    setParts(newParts);
                                                }}
                                            />
                                        </div>
                                        <div className="w-20">
                                            <Input
                                                type="number"
                                                placeholder="Cant."
                                                min="1"
                                                value={part.quantity}
                                                onChange={(e) => {
                                                    const newParts = [...parts];
                                                    newParts[index].quantity = Number(e.target.value);
                                                    setParts(newParts);
                                                }}
                                            />
                                        </div>
                                        <div className="w-24">
                                            <Input
                                                type="number"
                                                placeholder="Precio"
                                                min="0"
                                                value={part.unit_price}
                                                onChange={(e) => {
                                                    const newParts = [...parts];
                                                    newParts[index].unit_price = Number(e.target.value);
                                                    setParts(newParts);
                                                }}
                                            />
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive"
                                            onClick={() => {
                                                const newParts = [...parts];
                                                newParts.splice(index, 1);
                                                setParts(newParts);
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Summary */}
                    <div className="md:col-span-2 flex justify-end">
                        <Card className="p-4 w-full md:w-1/3 space-y-2 bg-muted/50">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Descuento:</span>
                                <span>-${discount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 mt-2">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </Card>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={onSave}>Guardar Factura</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
