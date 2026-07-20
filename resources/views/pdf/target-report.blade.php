<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>
    <style>
        body { font-family: sans-serif; font-size: 11px; }
        h1 { font-size: 16px; margin-bottom: 12px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #333; padding: 4px 6px; text-align: center; }
        th { background-color: #1f2937; color: #fff; }
        .cell-green { background-color: #008000; color: #fff; }
        .cell-yellow { background-color: #ffff00; color: #000; }
        .cell-red { background-color: #ff0000; color: #fff; }
    </style>
</head>
<body>
    <h1>{{ $title }}</h1>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Mtaa</th>
                <th>{{ $targetLabel }}</th>
                @foreach ($dates as $date)
                    <th>{{ $date }}</th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @foreach ($rows as $row)
                <tr>
                    <td>{{ $row['name'] }}</td>
                    <td>{{ $row['mtaa'] ?? 'N/A' }}</td>
                    <td>{{ $row['target'] ?? 'N/A' }}</td>
                    @foreach ($dates as $date)
                        @php $value = $row['dates'][$date] ?? 0; @endphp
                        <td class="{{ $value === 100 ? 'cell-green' : ($value >= 75 ? 'cell-yellow' : 'cell-red') }}">
                            {{ $value }}%
                        </td>
                    @endforeach
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
