import TargetTable from "@/Components/Admin/TargetTable";
import AdminLayout from "@/Layouts/AdminLayout";

const Targets = ({ users }) => {
    return (
        <AdminLayout>
            <main className="container px-2 ">
                <TargetTable users={users} />
            </main>
        </AdminLayout>
    );
};

export default Targets;
