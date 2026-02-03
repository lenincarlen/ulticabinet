<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Factura #{{ $invoice->invoice_number }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
            line-height: 1.6;
        }
        .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e5e7eb;
        }
        .company-info {
            flex: 1;
        }
        .company-name {
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 5px;
        }
        .company-tagline {
            color: #6b7280;
            font-size: 14px;
        }
        .invoice-info {
            text-align: right;
        }
        .invoice-title {
            font-size: 32px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 10px;
        }
        .invoice-meta {
            color: #6b7280;
            font-size: 14px;
            line-height: 1.8;
        }
        .invoice-meta strong {
            color: #374151;
        }
        .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-top: 10px;
        }
        .status-paid {
            background-color: #d1fae5;
            color: #065f46;
        }
        .status-pending {
            background-color: #fef3c7;
            color: #92400e;
        }
        .billed-by {
            color: #6b7280;
            font-size: 13px;
            margin-bottom: 30px;
        }
        .customer-section {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 10px;
        }
        .customer-details {
            color: #374151;
            font-size: 14px;
            line-height: 1.8;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
        }
        .items-table thead {
            background-color: #f9fafb;
        }
        .items-table th {
            padding: 12px;
            text-align: left;
            font-size: 13px;
            font-weight: 600;
            color: #374151;
            border-bottom: 2px solid #e5e7eb;
        }
        .items-table th.text-center {
            text-align: center;
        }
        .items-table th.text-right {
            text-align: right;
        }
        .items-table td {
            padding: 15px 12px;
            border-bottom: 1px solid #e5e7eb;
            color: #374151;
            font-size: 14px;
        }
        .items-table td.text-center {
            text-align: center;
        }
        .items-table td.text-right {
            text-align: right;
        }
        .item-description {
            font-weight: 600;
            color: #1f2937;
        }
        .item-subtitle {
            color: #6b7280;
            font-size: 13px;
            margin-top: 2px;
        }
        .totals-section {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
        }
        .total-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            font-size: 14px;
        }
        .total-row.subtotal {
            color: #6b7280;
        }
        .total-row.tax {
            color: #6b7280;
        }
        .total-row.final {
            font-size: 20px;
            font-weight: 700;
            color: #1f2937;
            padding-top: 15px;
            margin-top: 10px;
            border-top: 2px solid #e5e7eb;
        }
        .total-row.final .amount {
            color: #7c3aed;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 13px;
        }
        .footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <!-- Header -->
        <div class="header">
            <div class="company-info">
                <div class="company-name">{{ company_name() }}</div>
                <div class="company-tagline">Servicios Técnicos a Domicilio</div>
            </div>
            <div class="invoice-info">
                <div class="invoice-title">FACTURA</div>
                <div class="invoice-meta">
                    <div><strong>Factura No:</strong> {{ $invoice->invoice_number }}</div>
                    <div><strong>Fecha:</strong> {{ $invoice->date->format('d \d\e F \d\e Y') }}</div>
                    @if($invoice->serviceOrder)
                        <div><strong>Orden No:</strong> #{{ $invoice->serviceOrder->service_order_number }}</div>
                    @endif
                </div>
                <span class="status-badge status-{{ $invoice->status === 'paid' ? 'paid' : 'pending' }}">
                    {{ $invoice->status === 'paid' ? 'PAGADA' : 'PENDIENTE' }}
                </span>
            </div>
        </div>

        <!-- Billed By -->
        @if($invoice->billedBy)
        <div class="billed-by">
            Facturado por: {{ $invoice->billedBy->email }}
        </div>
        @endif

        <!-- Customer Section -->
        <div class="customer-section">
            <div class="section-title">Cliente</div>
            <div class="customer-details">
                <div><strong>{{ $invoice->customer->name }}</strong></div>
                @if($invoice->customer->phone)
                    <div>Tel: {{ $invoice->customer->phone }}</div>
                @endif
                @if($invoice->customer->address)
                    <div>{{ $invoice->customer->address }}</div>
                @endif
            </div>
        </div>

        <!-- Items Table -->
        <table class="items-table">
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th class="text-center">Cant.</th>
                    <th class="text-right">Precio Unit.</th>
                    <th class="text-right">Total</th>
                </tr>
            </thead>
            <tbody>
                @foreach($invoice->items as $item)
                    <tr>
                        <td>
                            <div class="item-description">
                                @if($item->type === 'service')
                                    Servicio Técnico
                                @else
                                    {{ $item->description }}
                                @endif
                            </div>
                            @if($item->type === 'service' && $invoice->serviceOrder)
                                <div class="item-subtitle">{{ $invoice->serviceOrder->appliance_type }}</div>
                            @endif
                        </td>
                        <td class="text-center">{{ $item->quantity }}</td>
                        <td class="text-right">RD$ {{ number_format($item->sell_price, 2) }}</td>
                        <td class="text-right">RD$ {{ number_format($item->sell_price * $item->quantity, 2) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <!-- Totals Section -->
        <div class="totals-section">
            <div class="total-row subtotal">
                <span>Subtotal</span>
                <span>RD$ {{ number_format($invoice->subtotal, 2) }}</span>
            </div>
            
            @if($invoice->tax > 0)
            <div class="total-row tax">
                <span>ITBIS ({{ number_format($invoice->tax_percentage, 0) }}%)</span>
                <span>RD$ {{ number_format($invoice->tax, 2) }}</span>
            </div>
            @endif
            
            @if($invoice->discount > 0)
            <div class="total-row tax">
                <span>Descuento</span>
                <span>- RD$ {{ number_format($invoice->discount, 2) }}</span>
            </div>
            @endif
            
            <div class="total-row final">
                <span>Total a Pagar</span>
                <span class="amount">RD$ {{ number_format($invoice->total, 2) }}</span>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>{{ company_name() }}</strong></p>
            <p>Gracias por su preferencia</p>
            <p style="font-size: 12px; color: #9ca3af; margin-top: 10px;">
                Esta factura fue generada automáticamente por nuestro sistema.
            </p>
        </div>
    </div>
</body>
</html>
