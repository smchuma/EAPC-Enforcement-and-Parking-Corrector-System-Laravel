import Card from "@/Components/Cards/Card";
import { FiTrendingUp } from "react-icons/fi";
import { MdOutlineAssessment } from "react-icons/md";
import { AiOutlineDollarCircle } from "react-icons/ai";

const AdminCardsGrid = ({ reports }) => {
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

    const total = totalDailySales + totalControlNumberSales;

    const cardData = [
        {
            id: 1,
            title: "MAUZO YA SIKU",
            value: `${totalDailySales.toLocaleString()}
            `,
            icon: FiTrendingUp,
            subText: "TSH",
        },
        {
            id: 2,
            title: "MAUZO YA CONTROL NUMBER",
            value: `${totalControlNumberSales.toLocaleString()}`,

            icon: AiOutlineDollarCircle,
            subText: "TSH",
        },
        {
            id: 3,
            title: "JUMLA",
            value: `${total.toLocaleString()}`,
            icon: MdOutlineAssessment,
            subText: "TSH",
        },
    ];

    return (
        <main className="container mx-auto px-8 py-6">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 ">
                {cardData.map((card) => (
                    <Card
                        key={card.id}
                        title={card.title}
                        value={card.value}
                        Icon={card.icon}
                        subText={card.subText}
                    />
                ))}
            </div>
        </main>
    );
};

export default AdminCardsGrid;
