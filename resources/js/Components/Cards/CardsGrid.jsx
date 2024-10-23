import { FaBullseye, FaChartLine, FaClipboardList } from "react-icons/fa";
import Card from "./Card";

const CardsGrid = () => {
    const cardData = [
        {
            id: 1,
            title: "MTAA NA TARGET",
            value: "KIPATA/100,000",
            icon: FaBullseye,
            subText: "/day",
        },
        {
            id: 2,
            title: "MAZUO YA SIKU",
            value: "90,000",
            icon: FaChartLine,
            subText: "/day",
        },
        {
            id: 3,
            title: "MAUZO YA CONTROL NUMBER",
            value: "30,000",
            icon: FaClipboardList,
            subText: "/day",
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
                    />
                ))}
            </div>
        </main>
    );
};

export default CardsGrid;
