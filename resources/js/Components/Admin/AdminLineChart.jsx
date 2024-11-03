import { GitCommitVertical, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

export const description = "A line chart with custom dots";

// Utility to format month names for display
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// Function to aggregate control number counts per month
function aggregateControlNumbersByMonth(reports) {
    const monthlyData = Array(12).fill(0);

    reports.forEach((report) => {
        const month = new Date(report.created_at).getMonth();
        monthlyData[month] += report.control_number.length;
    });

    return monthlyData.map((total, index) => ({
        month: monthNames[index],
        totalSales: total,
    }));
}

export default function AdminLineChart({ reports }) {
    const chartData = aggregateControlNumbersByMonth(reports);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Total Mauzo ya Control Number</CardTitle>
                <CardDescription>January - December 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={{
                        totalSales: {
                            label: "Total Sales",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                >
                    <LineChart
                        data={chartData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="totalSales"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={({ cx, cy, payload }) => (
                                <GitCommitVertical
                                    x={cx - 12}
                                    y={cy - 12}
                                    width={24}
                                    height={24}
                                    fill="hsl(var(--background))"
                                    stroke="var(--color-desktop)"
                                />
                            )}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
