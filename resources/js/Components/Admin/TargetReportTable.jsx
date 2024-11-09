import PrimaryButton from "@/Components/PrimaryButton";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";

const TargetReportTable = ({ reports }) => {
    const [aggregatedReports, setAggregatedReports] = useState([]);

    useEffect(() => {
        const aggregatedData = reports.data.reduce((acc, report) => {
            const userId = report.user.id;
            const reportDate = new Date(report.created_at).toLocaleDateString();

            if (!acc[userId]) {
                acc[userId] = {
                    id: userId,
                    fullName: `${report.user.first_name} ${report.user.last_name}`,
                    mtaa: report.user.street || "N/A",
                    target: report.user.target || 0,
                    totalDailySales: 0,
                    totalControlSales: 0,
                    dates: {},
                };
            }

            acc[userId].totalDailySales += parseInt(report.daily_sales)
                ? parseInt(report.daily_sales)
                : 0;
            acc[userId].totalControlSales += report.control_number.reduce(
                (sum, cn) => sum + (parseInt(cn.amount) || 0),
                0
            );

            if (!acc[userId].dates[reportDate]) {
                acc[userId].dates[reportDate] = report.daily_sales
                    ? parseFloat(report.daily_sales)
                    : 0;
            } else {
                acc[userId].dates[reportDate] += report.daily_sales
                    ? parseFloat(parseInt(report.daily_sales))
                    : 0;
            }

            return acc;
        }, {});

        setAggregatedReports(Object.values(aggregatedData));
    }, [reports]);

    const getAchievementColor = (total, target) => {
        const percentage = target ? (total / target) * 100 : 0;
        if (percentage >= 100) return "bg-green-500"; // Met or exceeded target
        if (percentage >= 75) return "bg-yellow-400"; // 75% or more but not met
        return "bg-red-500"; // Less than 75%
    };

    const handleDownload = () => {
        const worksheetData = aggregatedReports.map((user) => {
            let rowData = {
                Name: user.fullName,
                Mtaa: user.mtaa,
                Target: `${user.target} TSH`,
                "Total Daily Sales": `${user.totalDailySales} TSH`,
                "Total Control Sales": `${user.totalControlSales} TSH`,
                Achievement:
                    user.totalDailySales + user.totalControlSales >= user.target
                        ? "Target Met"
                        : "Target Not Met",
            };

            // Add sales data for each unique date as separate columns
            Object.keys(user.dates).forEach((date) => {
                rowData[date] = `${user.dates[date]} TSH`;
            });

            return rowData;
        });

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Target Report");
        XLSX.writeFile(workbook, "TargetReport.xlsx");
    };

    // Get all unique dates across reports for column headers
    const allDates = [
        ...new Set(
            aggregatedReports.flatMap((user) => Object.keys(user.dates))
        ),
    ];
    return (
        <main>
            <main>
                <PrimaryButton onClick={handleDownload}>
                    Download Report
                </PrimaryButton>
                <table className="min-w-full mt-5 leading-normal">
                    <thead>
                        <tr className="bg-blue-700 text-white">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Mtaa</th>
                            <th className="border p-2">Target</th>
                            <th className="border p-2">Total Daily Sales</th>
                            <th className="border p-2">Total Control Sales</th>
                            <th className="border p-2">Achievement</th>
                            {allDates.map((date) => (
                                <th key={date} className="border p-2">
                                    {date}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {aggregatedReports.map((user) => {
                            const totalSales =
                                user.totalDailySales + user.totalControlSales;
                            return (
                                <tr
                                    key={user.id}
                                    className="bg-gray-50 hover:bg-gray-100"
                                >
                                    <td className="border p-3 text-center">
                                        {user.fullName}
                                    </td>
                                    <td className="border p-3 text-center">
                                        {user.mtaa}
                                    </td>
                                    <td className="border p-3 text-center">
                                        {user.target} TSH
                                    </td>
                                    <td className="border p-3 text-center">
                                        {user.totalDailySales} TSH
                                    </td>
                                    <td className="border p-3 text-center">
                                        {user.totalControlSales} TSH
                                    </td>
                                    <td
                                        className={`border p-3 text-center ${getAchievementColor(
                                            totalSales,
                                            user.target
                                        )}`}
                                    >
                                        {totalSales >= user.target
                                            ? "Target Met"
                                            : "Target Not Met"}
                                    </td>
                                    {allDates.map((date) => (
                                        <td
                                            key={`${user.id}-${date}`}
                                            className="border p-3 text-center"
                                        >
                                            {user.dates[date]
                                                ? `${user.dates[date]} TSH`
                                                : "N/A"}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </main>
        </main>
    );
};

export default TargetReportTable;
