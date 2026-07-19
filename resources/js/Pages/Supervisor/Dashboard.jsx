import ReportList from "@/Components/Reports/ReportList";
import SupervisorLayout from "@/Layouts/SupervisorLayout";

const Dashboard = ({ auth, reports }) => {
    return (
        <SupervisorLayout>
            <main className="pt-24">
                <div className="border-b-2 border-gray-300 pb-5">
                    <h1 className="text-xl text-gray-500">
                        Ripoti Ninazosimamia
                    </h1>
                </div>
                <div className="pb-16">
                    <ReportList reports={reports} auth={auth} />
                </div>
            </main>
        </SupervisorLayout>
    );
};

export default Dashboard;
