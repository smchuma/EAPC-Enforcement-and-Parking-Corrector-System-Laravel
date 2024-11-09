import AdminLayout from "@/Layouts/AdminLayout";
import TargetReportTable from "@/Components/Admin/TargetReportTable";
import Test from "./Test";

const TargetReport = ({ reports }) => {
    return (
        <AdminLayout>
            <main className="p-5">
                <Test reports={reports} />
            </main>
        </AdminLayout>
    );
};

export default TargetReport;
