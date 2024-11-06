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

    const cardData = [
        {
            id: 1,
            title: "Mauzo",
            value: ``,
            icon: FiTrendingUp,
            subText: "TSH",
        },
        {
            id: 2,
            title: "MAuzo ya Control Number",
            value: ``,
            icon: AiOutlineDollarCircle,
            subText: "TSH",
        },
        {
            id: 3,
            title: "Jumla",
            value: "",
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
