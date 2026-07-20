import ReportSummaryTable from "@/Components/Reports/ReportSummaryTable";
import AdminLayout from "@/Layouts/AdminLayout";

const Reports = ({ reports }) => {
    return (
        <AdminLayout>
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
