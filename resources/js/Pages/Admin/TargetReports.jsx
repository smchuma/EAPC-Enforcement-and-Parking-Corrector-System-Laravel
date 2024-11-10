import AdminLayout from "@/Layouts/AdminLayout";
import Test from "./Test";

const TargetReports = ({ reports }) => {
    console.log(reports);
    return (
        <AdminLayout>
            <main className="p-5">
                <h1 className="text-2xl">Target Reports</h1>
            </main>
        </AdminLayout>
    );
};

export default TargetReports;
