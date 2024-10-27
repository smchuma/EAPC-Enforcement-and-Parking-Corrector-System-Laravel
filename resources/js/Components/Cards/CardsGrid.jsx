import { FaBullseye, FaChartLine, FaClipboardList } from "react-icons/fa";
import Card from "./Card";
import { usePage } from "@inertiajs/react";

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

    const cardData = [
        {
            id: 1,
            title: "MTAA NA TARGET",
            value: `${auth.user.street} / ${auth.user.target}`,
            icon: FaBullseye,
        },
        {
            id: 2,
            title: "MAZUO YA SIKU",
            value: totalDailySales.toLocaleString(),
            icon: FaChartLine,
            subText: "/day",
        },
        {
            id: 3,
            title: "MAUZO YA CONTROL NUMBER",
            value: totalControlNumberSales.toLocaleString(),
            icon: FaClipboardList,
            subText: "/day",
        },
    ];

    const dailySalesMetTarget = totalDailySales >= auth.user.target;
    const dailySalesMessage = dailySalesMetTarget
        ? "Target Achieved!"
        : "Below Target";

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
                        auth={auth}
                        metTarget={card.metTarget}
                        message={card.message}
                    />
                ))}
            </div>
        </main>
    );
};

export default CardsGrid;
