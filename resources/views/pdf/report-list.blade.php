<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>
    <style>
        body { font-family: sans-serif; font-size: 11px; }
        h1 { font-size: 16px; margin-bottom: 4px; }
        p.range { margin-top: 0; margin-bottom: 12px; color: #555; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #333; padding: 4px 6px; text-align: center; }
        th { background-color: #1f2937; color: #fff; }
        tfoot td { font-weight: bold; background-color: #f3f4f6; }
    </style>
</head>
<body>
    <h1>{{ $title }}</h1>
    <p class="range">{{ $from }} &mdash; {{ $to }}</p>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Role</th>
                <th>Mauzo</th>
                <th>Control Numbers</th>
                <th>Control Number Total</th>
                <th>Grand Total</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($rows as $row)
                <tr>
                    <td>{{ $row['date'] }}</td>
                    <td>{{ $row['name'] }}</td>
                    <td>{{ $row['role'] }}</td>
                    <td>{{ $row['daily_sales'] !== null ? number_format($row['daily_sales'], 2) : '-' }}</td>
                    <td>{{ $row['control_number_count'] }}</td>
                    <td>{{ number_format($row['control_number_total'], 2) }}</td>
                    <td>{{ number_format($row['grand_total'], 2) }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="7">No reports found for this date range.</td>
                </tr>
            @endforelse
        </tbody>
        @if (count($rows) > 0)
            <tfoot>
                <tr>
                    <td colspan="3">Jumla (Total)</td>
                    <td>{{ number_format($totals['daily_sales'], 2) }}</td>
                    <td>{{ $totals['control_number_count'] }}</td>
                    <td>{{ number_format($totals['control_number_total'], 2) }}</td>
                    <td>{{ number_format($totals['grand_total'], 2) }}</td>
                </tr>
            </tfoot>
        @endif
    </table>
</body>
</html>
