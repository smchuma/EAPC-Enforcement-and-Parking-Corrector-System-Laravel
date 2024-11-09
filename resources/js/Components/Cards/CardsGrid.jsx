import { FaBullseye, FaChartLine, FaClipboardList } from "react-icons/fa";
import Card from "./Card";

const CardsGrid = ({ auth, reports }) => {
    const totalDailySales = reports.reduce(
        (total, report) => total + parseFloat(report.daily_sales || 0),
        0
    );
    const totalControlNumberSales = reports.reduce((total, report) => {
        return (
            total +
            report.control_number.reduce(
                (sum, control) => sum + (parseFloat(control.amount) || 0),
                0
            )
        );
    }, 0);

    const dailySalesTarget = auth.user.target || 0;
    const controlNumberTarget = auth.user.control_number_target || 0;

    const cardData = [
        {
            id: 1,
            title: "MTAA",
            value: `${!auth.user.street ? "N/A" : auth.user.street}`,
            icon: FaBullseye,
        },
        {
            id: 2,
            title: "MAZUO YA SIKU",
            value: `${totalDailySales.toLocaleString()}/${dailySalesTarget.toLocaleString()}`,

            icon: FaChartLine,
            subText: "/day",
            valueColor:
                totalDailySales >= dailySalesTarget
                    ? "text-green-500"
                    : "text-red-500",
        },
        {
            id: 3,
            title: "MAUZO YA CONTROL NUMBER",
            value: `${totalControlNumberSales.toLocaleString()}/${controlNumberTarget.toLocaleString()}`,

            icon: FaClipboardList,
            subText: "/day",
            valueColor:
                totalControlNumberSales >= controlNumberTarget
                    ? "text-green-500"
                    : "text-red-500",
        },
    ];

    return (
        <main className="container mx-auto px-4 py-6">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 ">
                {cardData.map((card) => (
                    <Card
                        key={card.id}
                        title={card.title}
                        value={card.value}
                        Icon={card.icon}
                        subText={card.subText}
                        valueColor={card.valueColor}
                    />
                ))}
            </div>
        </main>
    );
};

export default CardsGrid;
