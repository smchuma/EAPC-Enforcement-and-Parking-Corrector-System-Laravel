import Card from "@/Components/Cards/Card";
import { FiTrendingUp } from "react-icons/fi";
import { MdOutlineAssessment } from "react-icons/md";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { isToday } from "date-fns";

const sumDailySales = (reports) =>
    reports.reduce(
        (total, report) => total + parseFloat(report.daily_sales || 0),
        0
    );

const sumControlNumberSales = (reports) =>
    reports.reduce((total, report) => {
        return (
            total +
            report.control_number.reduce(
                (sum, control) => sum + (parseFloat(control.amount) || 0),
                0
            )
        );
    }, 0);

const AdminCardsGrid = ({ reports }) => {
    const todaysReports = reports.filter((report) =>
        isToday(new Date(report.created_at))
    );

    const todaysDailySales = sumDailySales(todaysReports);
    const todaysControlNumberSales = sumControlNumberSales(todaysReports);
    const todaysTotal = todaysDailySales + todaysControlNumberSales;

    const totalDailySales = sumDailySales(reports);
    const totalControlNumberSales = sumControlNumberSales(reports);
    const total = totalDailySales + totalControlNumberSales;

    const todayCardData = [
        {
            id: "today-mauzo",
            title: "MAUZO YA LEO",
            value: todaysDailySales.toLocaleString(),
            icon: FiTrendingUp,
            subText: "TSH",
        },
        {
            id: "today-control-number",
            title: "CONTROL NUMBER YA LEO",
            value: todaysControlNumberSales.toLocaleString(),
            icon: AiOutlineDollarCircle,
            subText: "TSH",
        },
        {
            id: "today-jumla",
            title: "JUMLA YA LEO",
            value: todaysTotal.toLocaleString(),
            icon: MdOutlineAssessment,
            subText: "TSH",
        },
    ];

    const overallCardData = [
        {
            id: "total-mauzo",
            title: "JUMLA YA MAUZO (YOTE)",
            value: totalDailySales.toLocaleString(),
            icon: FiTrendingUp,
            subText: "TSH",
        },
        {
            id: "total-control-number",
            title: "JUMLA YA CONTROL NUMBER (YOTE)",
            value: totalControlNumberSales.toLocaleString(),
            icon: AiOutlineDollarCircle,
            subText: "TSH",
        },
        {
            id: "total-jumla",
            title: "JUMLA KUU (YOTE)",
            value: total.toLocaleString(),
            icon: MdOutlineAssessment,
            subText: "TSH",
        },
    ];

    return (
        <main className="space-y-6">
            <div>
                <h2 className="font-semibold text-lg text-gray-800 mb-4">
                    Leo (Today)
                </h2>
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
                    {todayCardData.map((card) => (
                        <Card
                            key={card.id}
                            title={card.title}
                            value={card.value}
                            Icon={card.icon}
                            subText={card.subText}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h2 className="font-semibold text-lg text-gray-800 mb-4">
                    Jumla Kuu (All Time)
                </h2>
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
                    {overallCardData.map((card) => (
                        <Card
                            key={card.id}
                            title={card.title}
                            value={card.value}
                            Icon={card.icon}
                            subText={card.subText}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default AdminCardsGrid;
