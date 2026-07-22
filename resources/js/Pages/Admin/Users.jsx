import UserCreateForm from "@/Components/Admin/UserCreateForm";
import UsersTable from "@/Components/Admin/UsersTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage } from "@inertiajs/react";

const Users = () => {
    const { props } = usePage();
    const { users } = props;

    return (
        <AdminLayout>
            <Head title="Users" />
            <main className="pt-6">
                <div className="flex justify-end px-4 sm:px-6 lg:px-8">
                    <UserCreateForm />
                </div>
                <UsersTable users={users} />
            </main>
        </AdminLayout>
    );
};

export default Users;
