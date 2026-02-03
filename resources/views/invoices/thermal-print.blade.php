<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Factura {{ $invoice->invoice_number }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: 80mm auto;
            margin: 0;
        }

        body {
            font-family: 'Courier New', Courier, monospace;
            font-size: 12px;
            line-height: 1.4;
            width: 80mm;
            margin: 0 auto;
            padding: 5mm;
            background: white;
        }

        .header {
            text-align: center;
            margin-bottom: 10px;
            border-bottom: 1px dashed #000;
            padding-bottom: 10px;
        }

        .company-name {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .company-info {
            font-size: 10px;
            margin-bottom: 2px;
        }

        .invoice-title {
            font-size: 14px;
            font-weight: bold;
            margin: 10px 0 5px 0;
            text-align: center;
        }

        .invoice-number {
            font-size: 11px;
            text-align: center;
            margin-bottom: 10px;
        }

        .section {
            margin-bottom: 10px;
            border-bottom: 1px dashed #000;
            padding-bottom: 10px;
        }

        .row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 3px;
        }

        .label {
            font-weight: bold;
        }

        .items-table {
            width: 100%;
            margin-bottom: 10px;
        }

        .items-header {
            font-weight: bold;
            border-bottom: 1px solid #000;
            padding-bottom: 3px;
            margin-bottom: 5px;
            display: flex;
            justify-content: space-between;
        }

        .item-row {
            margin-bottom: 5px;
        }

        .item-name {
            font-weight: bold;
            margin-bottom: 2px;
        }

        .item-details {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
        }

        .totals {
            margin-top: 10px;
        }

        .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 3px;
        }

        .total-row.grand-total {
            font-size: 14px;
            font-weight: bold;
            border-top: 1px solid #000;
            border-bottom: 2px double #000;
            padding: 5px 0;
            margin-top: 5px;
        }

        .footer {
            text-align: center;
            margin-top: 15px;
            font-size: 10px;
            border-top: 1px dashed #000;
            padding-top: 10px;
        }

        .thank-you {
            font-weight: bold;
            margin-bottom: 5px;
        }

        @media print {
            body {
                padding: 0;
            }
            
            .no-print {
                display: none;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="company-name">{{ $siteSettings->company_name ?? 'MISTER SERVICES' }}</div>
        @if($siteSettings && $siteSettings->company_phone)
            <div class="company-info">Tel: {{ $siteSettings->company_phone }}</div>
        @endif
        @if($siteSettings && $siteSettings->company_whatsapp)
            <div class="company-info">WhatsApp: {{ $siteSettings->company_whatsapp }}</div>
        @endif
        @if($siteSettings && $siteSettings->company_address)
            <div class="company-info">{{ $siteSettings->company_address }}</div>
        @endif
    </div>

    <!-- Invoice Info -->
    <div class="invoice-title">FACTURA</div>
    <div class="invoice-number">No. {{ $invoice->invoice_number }}</div>

    <!-- Customer & Date Info -->
    <div class="section">
        <div class="row">
            <span class="label">Fecha:</span>
            <span>{{ \Carbon\Carbon::parse($invoice->date)->format('d/m/Y H:i') }}</span>
        </div>
        @if($invoice->customer)
            <div class="row">
                <span class="label">Cliente:</span>
                <span>{{ $invoice->customer->nombre_completo ?? $invoice->customer->name }}</span>
            </div>
            @if($invoice->customer->telefono)
                <div class="row">
                    <span class="label">Teléfono:</span>
                    <span>{{ $invoice->customer->telefono }}</span>
                </div>
            @endif
            @if($invoice->customer->rnc)
                <div class="row">
                    <span class="label">RNC:</span>
                    <span>{{ $invoice->customer->rnc }}</span>
                </div>
            @endif
        @endif
        @if($invoice->ncf_number)
            <div class="row">
                <span class="label">NCF:</span>
                <span>{{ $invoice->ncf_number }}</span>
            </div>
        @endif
    </div>

    <!-- Items -->
    <div class="section">
        <div class="items-header">
            <span>DESCRIPCIÓN</span>
            <span>TOTAL</span>
        </div>
        
        @foreach($invoice->items as $item)
            <div class="item-row">
                <div class="item-name">{{ $item->description }}</div>
                <div class="item-details">
                    <span>{{ $item->quantity }} x RD$ {{ number_format($item->sell_price, 2) }}</span>
                    <span>RD$ {{ number_format($item->sell_price * $item->quantity, 2) }}</span>
                </div>
            </div>
        @endforeach
    </div>

    <!-- Totals -->
    <div class="totals">
        <div class="total-row">
            <span>Subtotal:</span>
            <span>RD$ {{ number_format($invoice->subtotal, 2) }}</span>
        </div>
        
        @if($invoice->discount > 0)
            <div class="total-row">
                <span>Descuento:</span>
                <span>-RD$ {{ number_format($invoice->discount, 2) }}</span>
            </div>
        @endif
        
        <div class="total-row">
            <span>ITBIS (18%):</span>
            <span>RD$ {{ number_format($invoice->tax, 2) }}</span>
        </div>
        
        <div class="total-row grand-total">
            <span>TOTAL:</span>
            <span>RD$ {{ number_format($invoice->total, 2) }}</span>
        </div>
    </div>

    <!-- Payment Info -->
    @if($invoice->paymentDetails && $invoice->paymentDetails->count() > 0)
        @php
            $payment = $invoice->paymentDetails->first();
        @endphp
        <div class="section">
            <div class="row">
                <span class="label">Método de Pago:</span>
                <span>
                    @switch($payment->payment_method)
                        @case('cash') Efectivo @break
                        @case('debit_card') Tarjeta Débito @break
                        @case('credit_card') Tarjeta Crédito @break
                        @case('transfer') Transferencia @break
                        @default {{ $payment->payment_method }}
                    @endswitch
                </span>
            </div>
            
            @if($payment->payment_method === 'cash')
                <div class="row">
                    <span class="label">Recibido:</span>
                    <span>RD$ {{ number_format($payment->cash_received, 2) }}</span>
                </div>
                @if($payment->change_given > 0)
                    <div class="row">
                        <span class="label">Cambio:</span>
                        <span>RD$ {{ number_format($payment->change_given, 2) }}</span>
                    </div>
                @endif
            @endif
            
            @if($payment->reference_number)
                <div class="row">
                    <span class="label">Referencia:</span>
                    <span>{{ $payment->reference_number }}</span>
                </div>
            @endif
        </div>
    @endif

    <!-- Service Order Info -->
    @if($invoice->serviceOrder)
        <div class="section">
            <div class="row">
                <span class="label">Orden de Servicio:</span>
                <span>{{ $invoice->serviceOrder->service_order_number }}</span>
            </div>
            @if($invoice->serviceOrder->attendedBy)
                <div class="row">
                    <span class="label">Técnico:</span>
                    <span>{{ $invoice->serviceOrder->attendedBy->name }}</span>
                </div>
            @endif
        </div>
    @endif

    <!-- Footer -->
    <div class="footer">
        <div class="thank-you">¡GRACIAS POR SU COMPRA!</div>
        <div>Este documento es su comprobante de pago</div>
        @if($siteSettings && $siteSettings->company_whatsapp)
            <div style="margin-top: 5px;">Contáctanos: {{ $siteSettings->company_whatsapp }}</div>
        @endif
    </div>

    <script>
        // Auto-print cuando la página carga
        window.onload = function() {
            window.print();
        };
    </script>
</body>
</html>
