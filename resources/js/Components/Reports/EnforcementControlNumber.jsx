import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const EnforcementControlNumber = ({ reports }) => {
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

    return (
        <main className="p-5 space-y-4">
            <div className="flex items-center justify-between gap-x-5">
                <Button
                    href={route(
                        "admin.enforcement_control_number_sales_report_pdf"
                    )}
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

export default EnforcementControlNumber;
