<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reporte de Ventas</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 10px; }
        .header h1 { margin: 0; font-size: 24px; }
        .header p { margin: 5px 0; color: #666; }
        .info { margin-bottom: 20px; }
        .info-row { display: flex; justify-content: space-between; margin: 5px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background-color: #f0f0f0; padding: 10px; text-align: left; border: 1px solid #ddd; }
        td { padding: 8px; border: 1px solid #ddd; }
        .summary { margin-top: 30px; background-color: #f9f9f9; padding: 15px; }
        .summary-item { display: flex; justify-content: space-between; margin: 5px 0; }
        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 10px; border-top: 1px solid #ddd; padding-top: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>MisterServices</h1>
        <p>Reporte de Ventas</p>
    </div>

    <div class="info">
        <div class="info-row">
            <span><strong>Período:</strong> {{ $startDate }} - {{ $endDate }}</span>
            <span><strong>Fecha de generación:</strong> {{ now()->format('d/m/Y H:i') }}</span>
        </div>
    </div>

    <div class="summary">
        <h3>Resumen</h3>
        <div class="summary-item">
            <span>Total de Ventas:</span>
            <strong>{{ number_format($summary['total_sales'], 2) }} RD$</strong>
        </div>
        <div class="summary-item">
            <span>Número de Órdenes:</span>
            <strong>{{ $summary['total_orders'] }}</strong>
        </div>
        <div class="summary-item">
            <span>Ticket Promedio:</span>
            <strong>{{ number_format($summary['average_ticket'], 2) }} RD$</strong>
        </div>
    </div>

    <h3>Ventas por Servicio</h3>
    <table>
        <thead>
            <tr>
                <th>Servicio</th>
                <th style="text-align: center;">Cantidad</th>
                <th style="text-align: right;">Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($salesByService as $item)
            <tr>
                <td>{{ $item->service }}</td>
                <td style="text-align: center;">{{ $item->count }}</td>
                <td style="text-align: right;">{{ number_format($item->total, 2) }} RD$</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        <p>Este reporte fue generado automáticamente por MisterServices</p>
    </div>
</body>
</html>
