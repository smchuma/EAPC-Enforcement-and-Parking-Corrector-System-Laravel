import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { formatNumber } from "@/lib/formatNumber";

const CollectorSales = ({ reports }) => {
    // Extract unique dates from the grouped data
    const dates = Object.keys(reports);

    // Prepare columns dynamically
    const columns = [
        { field: "name", headerName: "Name", width: 200 },
        { field: "mtaa", headerName: "Mtaa", width: 150 },
        {
            field: "target",
            headerName: "Target",
            width: 120,
            valueFormatter: (value) => formatNumber(value),
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

            // Calculate percentage and clamp it to 100% max
            const percentage = Math.min(
                Math.round((report.sales / report.target) * 100),
                100
            );

            // Update the corresponding date field for this user
            groupedUsers[userKey][`date_${dateIndex}`] = percentage;
        });
    });

    return (
        <main className="p-5 space-y-4">
            <div className="flex items-center justify-between gap-x-5">
                <Button
                    href={route("admin.collector_daily_sales_report_pdf")}
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
