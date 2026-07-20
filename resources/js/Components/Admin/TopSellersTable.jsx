import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function TopSellersTable({ reports }) {
    // Aggregate total sales per user
    const userSalesData = reports.reduce((acc, report) => {
        if (!report.user) return acc;

        const userId = report.user.id;
        const userFullName = `${report.user.first_name} ${report.user.last_name}`;
        const userRole = report.user.role; // Assuming 'role' field exists on the user object
        const dailySales = parseFloat(report.daily_sales) || 0;

        // Calculate control number total for each report
        const controlNumberSales = report.control_number
            ? report.control_number.reduce(
                  (sum, control) => sum + parseFloat(control.amount || 0),
                  0
              )
            : 0;

        // Accumulate or initialize totals for the user
        if (!acc[userId]) {
            acc[userId] = {
                name: userFullName,
                role: userRole,
                totalDailySales: 0,
                totalControlSales: 0,
            };
        }

        acc[userId].totalDailySales += dailySales;
        acc[userId].totalControlSales += controlNumberSales;

        return acc;
    }, {});

    // Convert to an array and sort by the highest total sales
    const sortedUsers = Object.values(userSalesData).sort(
        (a, b) =>
            b.totalDailySales +
            b.totalControlSales -
            (a.totalDailySales + a.totalControlSales)
    );

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Top Sellers</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase tracking-wide">
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Role</th>
                                <th className="px-4 py-3 text-right">
                                    Total Daily Sales
                                </th>
                                <th className="px-4 py-3 text-right">
                                    Total Control Sales
                                </th>
                                <th className="px-4 py-3 text-right">
                                    Combined Total Sales
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sortedUsers.map((user, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-3 text-gray-800">
                                        {user.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 capitalize">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-600">
                                        {user.totalDailySales}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-600">
                                        {user.totalControlSales}
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                                        {user.totalDailySales +
                                            user.totalControlSales}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
