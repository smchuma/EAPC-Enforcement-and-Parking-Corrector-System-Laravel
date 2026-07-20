import TargetTable from "@/Components/Admin/TargetTable";
import AdminLayout from "@/Layouts/AdminLayout";

const Targets = ({ users }) => {
    return (
        <AdminLayout>
            <main>
                <TargetTable users={users} />
            </main>
        </AdminLayout>
    );
};

export default Targets;
