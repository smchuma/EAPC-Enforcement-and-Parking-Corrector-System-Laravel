import ReportSummaryTable from "@/Components/Reports/ReportSummaryTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

const Reports = ({ reports }) => {
    return (
        <AdminLayout>
            <Head title="Reports" />
            <main className="pt-6">
                <ReportSummaryTable
                    reports={reports}
                    pdfRoute="admin.reports_pdf"
                    csvRoute="admin.reports_csv"
                />
            </main>
        </AdminLayout>
    );
};

export default Reports;
