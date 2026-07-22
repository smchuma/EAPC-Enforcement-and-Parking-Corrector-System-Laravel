import UserCreateForm from "@/Components/Admin/UserCreateForm";
import UsersTable from "@/Components/Admin/UsersTable";
import SupervisorLayout from "@/Layouts/SupervisorLayout";
import { Head, usePage } from "@inertiajs/react";

const Users = () => {
    const { props } = usePage();
    const { users } = props;

    return (
        <SupervisorLayout>
            <Head title="Users" />
            <main className="pt-24">
                <div className="flex justify-end px-4 sm:px-6 lg:px-8">
                    <UserCreateForm storeRoute="supervisor.storeUser" />
                </div>
                <UsersTable
                    users={users}
                    updateRoute="supervisor.update_user"
                    deleteRoute="supervisor.destroy_user"
                    inviteRoute="supervisor.send_invitation"
                />
            </main>
        </SupervisorLayout>
    );
};

export default Users;
