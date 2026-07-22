import TargetTable from "@/Components/Admin/TargetTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

const Targets = ({ users }) => {
    return (
        <AdminLayout>
            <Head title="Targets" />
            <main>
                <TargetTable users={users} />
            </main>
        </AdminLayout>
    );
};

export default Targets;
