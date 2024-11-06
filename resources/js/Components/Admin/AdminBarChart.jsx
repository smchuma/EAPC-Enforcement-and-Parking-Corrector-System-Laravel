import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { format, isValid } from "date-fns";

const chartConfig = {
    target: {
        label: "Target Mauzo",
        color: "hsl(var(--chart-1))",
    },
    control_number_target: {
        label: "Control Number Mauzo",
        color: "hsl(var(--chart-2))",
    },
};

export default function AdminBarGraph({ reports }) {
    // Use a map to dynamically store data only for months with sales
    const monthlyData = {};

    reports.forEach((report) => {
        const reportDate = new Date(report.created_at);
        const month = isValid(reportDate) ? format(reportDate, "MMMM") : null;

        if (month) {
            // Initialize the month in monthlyData if it doesn't exist
            if (!monthlyData[month]) {
                monthlyData[month] = {
                    month,
                    daily_sales: 0,
                    control_number_target: 0,
                };
            }

            // Accumulate daily sales
            const dailySalesValue = report.daily_sales
                ? parseInt(report.daily_sales, 10)
                : 0;
            monthlyData[month].daily_sales += dailySalesValue;

            // Accumulate control number amounts
            if (report.control_number) {
                report.control_number.forEach((control) => {
                    const controlAmount = parseFloat(control.amount) || 0;
                    monthlyData[month].control_number_target += controlAmount;
                });
            }
        }
    });

    // Convert the accumulated data in monthlyData to an array for charting
    const chartData = Object.values(monthlyData);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Mauzo ya Target na Control Number</CardTitle>
                <CardDescription>
                    Months with Available Data Only
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey="daily_sales"
                            fill="var(--color-target)"
                            radius={4}
                        />
                        <Bar
                            dataKey="control_number_target"
                            fill="#00687a"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
