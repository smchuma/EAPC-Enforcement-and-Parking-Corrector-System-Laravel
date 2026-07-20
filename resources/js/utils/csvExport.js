const escapeCsvCell = (value) => {
    const stringValue = value === null || value === undefined ? "" : String(value);
    if (/[",\n]/.test(stringValue)) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
};

// Builds a CSV from an array of row objects (rows may have differing keys,
// e.g. one column per report date) and triggers a browser download.
export function downloadCsv(rows, filename) {
    if (!rows.length) return;

    const headers = Array.from(
        rows.reduce((set, row) => {
            Object.keys(row).forEach((key) => set.add(key));
            return set;
        }, new Set())
    );

    const csvContent = [
        headers.map(escapeCsvCell).join(","),
        ...rows.map((row) =>
            headers.map((header) => escapeCsvCell(row[header])).join(",")
        ),
    ].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
