import ReportList from "@/Components/Reports/ReportList";
import SalesForm from "@/Components/SalesForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Ripoti = ({ auth, reports, supervisors }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <main className="pt-40 sm:pt-24 px-3 sm:px-0">
                <div className="border-b-2 border-gray-300 pb-5 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center">
                    <h1 className="text-xl text-gray-500">Ripoti</h1>
                    <SalesForm auth={auth} supervisors={supervisors} />
                </div>
                <div className="pb-16">
                    <ReportList reports={reports} auth={auth} />
                </div>
            </main>
        </AuthenticatedLayout>
    );
};

export default Ripoti;
