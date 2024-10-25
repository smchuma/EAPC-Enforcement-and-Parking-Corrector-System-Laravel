import UserCreateForm from "@/Components/Admin/UserCreateForm";
import AdminLayout from "@/Layouts/AdminLayout";

const Users = () => {
    return (
        <AdminLayout>
            <main className="container px-2">
                <UserCreateForm />
                {/* <EmployeeBody /> */}
            </main>
        </AdminLayout>
    );
};

export default Users;
