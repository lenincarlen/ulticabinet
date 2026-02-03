import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import CompleteBillingDialog from '@/components/billing/CompleteBillingDialog';

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

interface CreateInvoiceProps {
    invoiceNumber: string;
    allStaff: Array<{ id: string; name: string; email: string }>;
}

export default function CreateInvoice({ invoiceNumber, allStaff }: CreateInvoiceProps) {
    const [parts, setParts] = useState<Part[]>([]);
    const [invoiceStatus, setInvoiceStatus] = useState<'pending' | 'paid'>('pending');
    const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
    const [discount, setDiscount] = useState(0);
    const [serviceCost, setServiceCost] = useState(0);
    const [technicianCommission, setTechnicianCommission] = useState(0);
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

    const handleSave = () => {
        if (!selectedCustomer) {
            alert('Debe seleccionar un cliente');
            return;
        }

        // Prepare data for submission
        const data = {
            customer_id: selectedCustomer.id,
            invoice_number: invoiceNumber,
            issue_date: issueDate,
            status: invoiceStatus,
            discount: discount,
            service_cost: serviceCost,
            technician_commission: technicianCommission,
            parts: parts,
        };

        router.post('/invoices/store-standalone', data, {
            onSuccess: () => {
                // Redirect handled by controller
            },
            onError: (errors) => {
                console.error('Error creating invoice:', errors);
                alert('Error al crear la factura. Por favor revise los datos.');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Nueva Factura" />

            <CompleteBillingDialog
                open={true}
                onOpenChange={(open) => {
                    if (!open) {
                        router.visit('/invoices');
                    }
                }}
                customer={null}
                parts={parts}
                setParts={setParts}
                allStaff={allStaff}
                technician={null}
                operator={null}
                invoiceStatus={invoiceStatus}
                setInvoiceStatus={setInvoiceStatus}
                issueDate={issueDate}
                setIssueDate={setIssueDate}
                discount={discount}
                setDiscount={setDiscount}
                serviceCost={serviceCost}
                setServiceCost={setServiceCost}
                technicianCommission={technicianCommission}
                setTechnicianCommission={setTechnicianCommission}
                onSave={handleSave}
                onCustomerChange={setSelectedCustomer}
                onProductSearch={async (searchTerm) => {
                    try {
                        const response = await fetch(`/api/inventory/products/search?search=${encodeURIComponent(searchTerm)}`);
                        if (response.ok) {
                            return await response.json();
                        }
                        return [];
                    } catch (error) {
                        console.error('Error searching products:', error);
                        return [];
                    }
                }}
            />
        </AppLayout>
    );
}
