import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CollectorControlNumber = ({ reports }) => {
    // Prepare columns dynamically
    const dates = Object.keys(reports);
    const columns = [
        { field: "name", headerName: "Name", width: 200 },
        { field: "mtaa", headerName: "Mtaa", width: 150 },
        {
            field: "target",
            headerName: "Control Number Target",
            width: 180,
        },
        ...dates.map((date, index) => ({
            field: `date_${index}`,
            headerName: date,
            width: 150,
            renderCell: (params) => {
                const value = params.value || 0;
                const backgroundColor =
                    value === 100 ? "green" : value >= 75 ? "yellow" : "red";
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

    // Aggregate sales by user across all control numbers
    const rows = [];
    const aggregatedData = {};

    dates.forEach((date, dateIndex) => {
        reports[date].forEach((report) => {
            const userId = report.user_id;

            if (!aggregatedData[userId]) {
                // Initialize user data
                aggregatedData[userId] = {
                    id: userId,
                    name: `${report.first_name} ${report.last_name}`,
                    mtaa: report.mtaa,
                    target: parseInt(report.control_number_target),
                    totalSales: 0, // Initialize sales aggregation
                };

                // Placeholder for dynamic date fields
                dates.forEach((_, idx) => {
                    aggregatedData[userId][`date_${idx}`] = null;
                });

                rows.push(aggregatedData[userId]);
            }

            // Aggregate sales for the user
            aggregatedData[userId].totalSales += parseInt(report.sales);

            // Calculate percentage and update for the specific date
            aggregatedData[userId][`date_${dateIndex}`] = Math.min(
                Math.round(
                    (aggregatedData[userId].totalSales /
                        aggregatedData[userId].target) *
                        100
                ),
                100
            );
        });
    });

    // Export to PDF function
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Parking Collector Control Number Sales Report", 14, 10);

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
                        if (value === 100) return [0, 128, 0]; // Green
                        if (value >= 75) return [255, 255, 0]; // Yellow
                        return [255, 0, 0]; // Red
                    }
                    return null;
                },
                textColor: "black",
            },
        });

        doc.save("CollectorControlNumberSalesReport.pdf");
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

export default CollectorControlNumber;
