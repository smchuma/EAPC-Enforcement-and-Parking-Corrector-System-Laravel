import ReportSummaryTable from "@/Components/Reports/ReportSummaryTable";
import SupervisorLayout from "@/Layouts/SupervisorLayout";
import { Head } from "@inertiajs/react";

const Dashboard = ({ reports }) => {
    return (
        <SupervisorLayout>
            <Head title="Dashboard" />
            <main className="pt-24">
                <div className="border-b-2 border-gray-300 pb-5 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-xl text-gray-500">
                        Ripoti Ninazosimamia
                    </h1>
                </div>

                <ReportSummaryTable
                    reports={reports}
                    pdfRoute="supervisor.reports_pdf"
                    csvRoute="supervisor.reports_csv"
                />
            </main>
        </SupervisorLayout>
    );
};

export default Dashboard;
