import PrimaryButton from "@/Components/PrimaryButton";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Test = ({ reports }) => {
    const [aggregatedReports, setAggregatedReports] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const aggregatedData = reports.data.reduce((acc, report) => {
            const userId = report.user.id;
            const reportDate = new Date(report.created_at).toLocaleDateString();

            if (!acc[userId]) {
                acc[userId] = {
                    id: userId,
                    fullName: `${report.user.first_name} ${report.user.last_name}`,
                    mtaa: report.user.street || "N/A",
                    salesTarget: report.user.sales_target || 0, // Sales Target
                    dates: {},
                };
            }

            const dailySales = parseInt(report.daily_sales) || 0;
            const controlSales = report.control_number.reduce(
                (sum, cn) => sum + (parseInt(cn.amount) || 0),
                0
            );

            // Initialize or reset daily totals for the date
            if (!acc[userId].dates[reportDate]) {
                acc[userId].dates[reportDate] = {
                    totalDailySales: 0,
                    totalControlSales: 0,
                };
            }

            // Aggregate daily sales and control sales for each day
            acc[userId].dates[reportDate].totalDailySales += dailySales;
            acc[userId].dates[reportDate].totalControlSales += controlSales;

            return acc;
        }, {});

        setAggregatedReports(Object.values(aggregatedData));

        // Setup columns, including dynamic date columns for both sales and control targets
        const dateColumns = [
            ...new Set(
                Object.values(aggregatedData).flatMap((user) =>
                    Object.keys(user.dates)
                )
            ),
        ].flatMap((date) => [
            {
                field: `${date}_sales`,
                headerName: `${date} Sales`,
                width: 120,
                renderCell: (params) => {
                    const dailyData = params.row.dates[date];
                    if (!dailyData) return "N/A";

                    const colorClass = getAchievementColor(
                        dailyData.totalDailySales,
                        params.row.salesTarget
                    );
                    return (
                        <span className={colorClass}>
                            {dailyData.totalDailySales >= params.row.salesTarget
                                ? "100%"
                                : `${Math.round(
                                      (dailyData.totalDailySales /
                                          params.row.salesTarget) *
                                          100
                                  )}%`}
                        </span>
                    );
                },
            },
            {
                field: `${date}_control`,
                headerName: `${date} Control`,
                width: 120,
                renderCell: (params) => {
                    const dailyData = params.row.dates[date];
                    if (!dailyData) return "N/A";

                    const colorClass = getAchievementColor(
                        dailyData.totalControlSales,
                        params.row.controlNumberTarget
                    );
                    return (
                        <span className={colorClass}>
                            {dailyData.totalControlSales >=
                            params.row.controlNumberTarget
                                ? "100%"
                                : `${Math.round(
                                      (dailyData.totalControlSales /
                                          params.row.controlNumberTarget) *
                                          100
                                  )}%`}
                        </span>
                    );
                },
            },
        ]);

        setColumns([
            { field: "fullName", headerName: "Name", width: 150 },
            { field: "mtaa", headerName: "Mtaa", width: 100 },
            { field: "salesTarget", headerName: "Sales Target", width: 120 },
            {
                field: "controlNumberTarget",
                headerName: "Control Number Target",
                width: 150,
            },
            ...dateColumns,
        ]);
    }, [reports]);

    // Helper function for color coding based on percentage
    const getAchievementColor = (total, target) => {
        const percentage = target ? (total / target) * 100 : 0;
        if (percentage >= 100) return "bg-green-500 text-white"; // Target met
        if (percentage >= 75) return "bg-yellow-400 text-white"; // Between 75% and 99%
        return "bg-red-500 text-white"; // Below 75%
    };

    // Handle Excel download
    const handleDownload = () => {
        const worksheetData = aggregatedReports.map((user) => {
            let rowData = {
                Name: user.fullName,
                Mtaa: user.mtaa,
                "Sales Target": user.salesTarget,
                "Control Number Target": user.controlNumberTarget,
            };

            // Add daily achievement status for each target on each date
            Object.keys(user.dates).forEach((date) => {
                const dailyData = user.dates[date];

                const salesPercentage =
                    dailyData.totalDailySales >= user.salesTarget
                        ? "100%"
                        : `${Math.round(
                              (dailyData.totalDailySales / user.salesTarget) *
                                  100
                          )}%`;

                const controlPercentage =
                    dailyData.totalControlSales >= user.controlNumberTarget
                        ? "100%"
                        : `${Math.round(
                              (dailyData.totalControlSales /
                                  user.controlNumberTarget) *
                                  100
                          )}%`;

                rowData[`${date} Sales`] = salesPercentage;
                rowData[`${date} Control`] = controlPercentage;
            });

            return rowData;
        });

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Target Report");
        XLSX.writeFile(workbook, "TargetReport.xlsx");
    };

    return (
        <main>
            <div className="flex justify-end">
                <PrimaryButton onClick={handleDownload}>
                    Download Report
                </PrimaryButton>
            </div>

            <div
                style={{ height: 450, width: "100%", marginTop: "1rem" }}
                className="bg-gray-100"
            >
                <DataGrid
                    rows={aggregatedReports}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    checkboxSelection
                />
            </div>
        </main>
    );
};

export default Test;
