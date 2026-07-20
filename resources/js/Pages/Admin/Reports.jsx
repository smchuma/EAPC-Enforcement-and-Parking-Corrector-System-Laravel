import AdminAddReport from "@/Components/Admin/AdminAddReport ";
import ReportTable from "@/Components/Admin/ReportTable";
import AdminLayout from "@/Layouts/AdminLayout";

const Reports = ({ reports, users, supervisors }) => {
    return (
        <AdminLayout>
            <main className="pt-6">
                <div className="flex justify-end px-4 sm:px-6 lg:px-8">
                    <AdminAddReport users={users} supervisors={supervisors} />
                </div>
                <ReportTable reports={reports} />
            </main>
        </AdminLayout>
    );
};

export default Reports;
