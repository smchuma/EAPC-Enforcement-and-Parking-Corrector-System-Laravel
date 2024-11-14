import ReportList from "@/Components/Reports/ReportList";
import SalesForm from "@/Components/SalesForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Ripoti = ({ auth, reports }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <main className="pt-24">
                <div className="border-b-2 border-gray-300 pb-5 flex justify-between items-center">
                    <h1 className="text-xl text-gray-500">Ripoti</h1>
                    <SalesForm auth={auth} />
                </div>
                <div className="pb-16">
                    <ReportList reports={reports} auth={auth} />
                </div>
            </main>
        </AuthenticatedLayout>
    );
};

export default Ripoti;
