import ReportTable from "@/Components/Admin/ReportTable";
import AdminLayout from "@/Layouts/AdminLayout";

const Reports = ({ reports }) => {
    return (
        <AdminLayout>
            <main className="pt-16">
                <ReportTable reports={reports} />
            </main>
        </AdminLayout>
    );
};

export default Reports;
