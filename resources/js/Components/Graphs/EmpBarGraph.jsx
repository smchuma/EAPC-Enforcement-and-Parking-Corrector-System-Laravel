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

const allMonths = [
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

export default function EmpBarGraph({ reports }) {
    // Initialize chart data with zero values for each month
    const chartData = allMonths.map((month) => ({
        month,
        daily_sales: 0,
        control_number_target: 0,
    }));

    // Process reports data to aggregate by month
    reports.forEach((report) => {
        const reportDate = new Date(report.created_at);
        const month = isValid(reportDate) ? format(reportDate, "MMMM") : null;

        if (month) {
            // Find the index of the month in the chart data
            const monthIndex = chartData.findIndex(
                (data) => data.month === month
            );

            if (monthIndex !== -1) {
                // Accumulate daily sales
                const dailySalesValue = report.daily_sales
                    ? parseInt(report.daily_sales, 10)
                    : 0;
                chartData[monthIndex].daily_sales += dailySalesValue || 0;

                // Accumulate control number amounts
                if (report.control_number) {
                    report.control_number.forEach((control) => {
                        const controlAmount = parseFloat(control.amount) || 0;
                        chartData[monthIndex].control_number_target +=
                            controlAmount;
                    });
                }
            }
        }
    });

    return (
        <Card className="w-full lg:w-[50%]">
            <CardHeader>
                <CardTitle>Mauzo</CardTitle>
                <CardDescription>January - December 2024</CardDescription>
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
                            fill="var(--color-control-number-target)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
