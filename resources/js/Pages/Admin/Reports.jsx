import AdminAddReport from "@/Components/Admin/AdminAddReport ";
import ReportTable from "@/Components/Admin/ReportTable";
import AdminLayout from "@/Layouts/AdminLayout";

const Reports = ({ reports, users }) => {
    return (
        <AdminLayout>
            <main className="pt-8">
                <div className="flex justify-end pr-6 pb-5">
                    <AdminAddReport users={users} />
                </div>
                <ReportTable reports={reports} />
            </main>
        </AdminLayout>
    );
};

export default Reports;
