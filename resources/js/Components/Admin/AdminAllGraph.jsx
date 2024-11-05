import { TrendingUp } from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    Tooltip,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

// Function to aggregate report data by user
const aggregateReports = (reports) => {
    const userData = {};

    reports.forEach((report) => {
        const { user_id, daily_sales, user, control_number } = report;

        // Initialize user data if it doesn't exist
        if (!userData[user_id]) {
            userData[user_id] = {
                name: `${user.first_name} ${user.last_name}`,
                totalDailySales: 0,
                totalControlNumberSales: 0,
            };
        }

        // Accumulate daily sales, default to 0 if not a number
        userData[user_id].totalDailySales += isNaN(parseInt(daily_sales))
            ? 0
            : parseInt(daily_sales);

        // Accumulate control number sales
        control_number.forEach((cn) => {
            userData[user_id].totalControlNumberSales +=
                parseFloat(cn.amount) || 0; // Fallback to 0 if NaN
        });
    });

    // Convert aggregated data into array format for the chart
    return Object.values(userData).map((user) => ({
        name: user.name,
        dailySales: user.totalDailySales,
        controlNumberSales: user.totalControlNumberSales,
    }));
};

export default function AdminAllGraph({ reports }) {
    // Aggregate report data
    const chartData = aggregateReports(reports);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Total Mauzo ya watu</CardTitle>
                <CardDescription>User Sales Overview</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer>
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <Tooltip content={<ChartTooltipContent hideLabel />} />
                        <Bar
                            dataKey="dailySales"
                            name="Total Daily Sales"
                            fill="hsl(var(--chart-1))"
                            radius={8}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                        <Bar
                            dataKey="controlNumberSales"
                            name="Total Control Number Sales"
                            fill="hsl(var(--chart-2))"
                            radius={8}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
