import CardsGrid from "@/Components/Cards/CardsGrid";
import EmpBarGraph from "@/Components/Graphs/EmpBarGraph";
import { UserDetails } from "@/Components/Graphs/UserDetails";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Home = ({ auth, reports }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <main className="flex justify-center flex-col pt-24 overflow-scroll pb-24">
                <CardsGrid auth={auth} reports={reports} />
                <div className="flex flex-col lg:flex-row gap-x-5 gap-y-5 px-8 lg:px-5">
                    <EmpBarGraph reports={reports} />
                    {/* <EmpPieChart /> */}
                    <UserDetails user={auth.user} />
                </div>
            </main>
        </AuthenticatedLayout>
    );
};

export default Home;
