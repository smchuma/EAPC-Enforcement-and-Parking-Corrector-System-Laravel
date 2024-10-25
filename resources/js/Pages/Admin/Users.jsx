import UserCreateForm from "@/Components/Admin/UserCreateForm";
import UsersTable from "@/Components/Admin/UsersTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";

const Users = () => {
    const { props } = usePage();
    const { users } = props;

    return (
        <AdminLayout>
            <main className="container px-2">
                <UserCreateForm />
                <UsersTable users={users} />
            </main>
        </AdminLayout>
    );
};

export default Users;
