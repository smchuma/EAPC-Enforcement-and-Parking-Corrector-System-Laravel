import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CollectorSales = ({ reports }) => {
    // Extract unique dates from the grouped data
    const dates = Object.keys(reports);

    // Prepare columns dynamically
    const columns = [
        { field: "name", headerName: "Name", width: 200 },
        { field: "mtaa", headerName: "Mtaa", width: 150 },
        { field: "target", headerName: "Target", width: 120 },
        ...dates.map((date, index) => ({
            field: `date_${index}`,
            headerName: date,
            width: 150,
            renderCell: (params) => {
                const value = params.value || 0;
                const backgroundColor =
                    value >= 100 ? "green" : value >= 75 ? "yellow" : "red";
                const color = "white";

                return (
                    <div
                        style={{
                            backgroundColor,
                            color,
                            padding: "5px",
                            textAlign: "center",
                            borderRadius: "4px",
                        }}
                    >
                        {value}%
                    </div>
                );
            },
        })),
    ];

    // Prepare rows dynamically, ensuring no duplicates
    const rows = [];
    const groupedUsers = {};

    Object.keys(reports).forEach((date, dateIndex) => {
        reports[date].forEach((report) => {
            const userKey = `${report.first_name} ${report.last_name}`;

            if (!groupedUsers[userKey]) {
                // Initialize a new user row
                groupedUsers[userKey] = {
                    id: `${report.user_id}`,
                    name: userKey,
                    mtaa: report.mtaa,
                    target: report.target,
                };

                // Add placeholders for all date fields
                dates.forEach((_, idx) => {
                    groupedUsers[userKey][`date_${idx}`] = null;
                });

                rows.push(groupedUsers[userKey]);
            }

            // Update the corresponding date field for this user
            groupedUsers[userKey][`date_${dateIndex}`] = Math.round(
                (report.sales / report.target) * 100
            );
        });
    });

    // Export to PDF function
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Parking Collector Report", 14, 10);

        // Map rows and columns for the PDF table
        const tableData = rows.map((row) =>
            columns.map((col) => {
                if (col.field.startsWith("date_")) {
                    return `${row[col.field] || 0}%`;
                }
                return row[col.field] || "N/A";
            })
        );

        // Use jsPDF autoTable for dynamic PDF generation with styles
        doc.autoTable({
            head: [columns.map((col) => col.headerName)],
            body: tableData,
            styles: {
                fillColor: (rowIndex, columnIndex) => {
                    if (columnIndex > 2) {
                        const value =
                            rows[rowIndex][columns[columnIndex].field];
                        if (value >= 100) return [0, 128, 0]; // Green
                        if (value >= 75) return [255, 255, 0]; // Yellow
                        return [255, 0, 0]; // Red
                    }
                    return null;
                },
                textColor: "black",
            },
        });

        doc.save("CollectorDailySalesReport.pdf");
    };

    return (
        <main className="p-5 space-y-4">
            <div className="flex items-center justify-between gap-x-5">
                <Button
                    onClick={exportToPDF}
                    variant="contained"
                    color="primary"
                >
                    Export to PDF
                </Button>
            </div>
            <DataGrid rows={rows} columns={columns} pageSize={5} autoHeight />
        </main>
    );
};

export default CollectorSales;
