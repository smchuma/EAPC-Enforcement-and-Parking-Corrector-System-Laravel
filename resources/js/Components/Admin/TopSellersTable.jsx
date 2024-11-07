import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function TopSellersTable({ reports }) {
    // Aggregate total sales per user
    const userSalesData = reports.reduce((acc, report) => {
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
        <Card className="w-full bg-gray-50">
            <CardHeader>
                <CardTitle>Top Sellers</CardTitle>
            </CardHeader>
            <CardContent>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Role</th>
                            <th className="px-4 py-2 border-b">
                                Total Daily Sales
                            </th>
                            <th className="px-4 py-2 border-b">
                                Total Control Sales
                            </th>
                            <th className="px-4 py-2 border-b">
                                Combined Total Sales
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers.map((user, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border-b text-center">
                                    {user.name}
                                </td>
                                <td className="px-4 py-2 border-b text-center">
                                    {user.role}
                                </td>
                                <td className="px-4 py-2 border-b text-center">
                                    {user.totalDailySales}
                                </td>
                                <td className="px-4 py-2 border-b text-center">
                                    {user.totalControlSales}
                                </td>
                                <td className="px-4 py-2 border-b font-bold text-center">
                                    {user.totalDailySales +
                                        user.totalControlSales}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}
