import CardsGrid from "@/Components/Cards/CardsGrid";
import EmpBarGraph from "@/Components/Graphs/EmpBarGraph";
import EmpPieChart from "@/Components/Graphs/EmpPieChart";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Home = ({ auth }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <main className="flex justify-center flex-col pt-24">
                <CardsGrid />
                <div className="flex flex-col lg:flex-row gap-x-5 gap-y-5 px-8 lg:px-5">
                    <EmpBarGraph />
                    <EmpPieChart />
                </div>
            </main>
        </AuthenticatedLayout>
    );
};

export default Home;
