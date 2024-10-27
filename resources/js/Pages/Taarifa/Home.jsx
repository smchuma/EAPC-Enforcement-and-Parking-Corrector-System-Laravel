import CardsGrid from "@/Components/Cards/CardsGrid";
import EmpBarGraph from "@/Components/Graphs/EmpBarGraph";
import EmpPieChart from "@/Components/Graphs/EmpPieChart";
import { HorizontalBarGraph } from "@/Components/Graphs/HorizontalBarGraph";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Home = ({ auth, reports }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <main className="flex justify-center flex-col pt-24 overflow-scroll pb-24">
                <CardsGrid auth={auth} reports={reports} />
                <div className="flex flex-col lg:flex-row gap-x-5 gap-y-5 px-8 lg:px-5">
                    <EmpBarGraph />
                    {/* <EmpPieChart /> */}
                    <HorizontalBarGraph />
                </div>
            </main>
        </AuthenticatedLayout>
    );
};

export default Home;
