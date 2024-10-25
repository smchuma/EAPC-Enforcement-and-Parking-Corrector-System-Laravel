import AdminNavbar from "@/Components/Admin/AdminNavbar";
import Sidebar from "@/Components/Admin/Sidebar";

export default function Authenticated({ user, header, children }) {
    return (
        <main className="min-h-screen bg-gray-100">
            <Sidebar />
            <main className="ml-0 lg:ml-72">
                <AdminNavbar />
                <main className="mt-16">{children}</main>
            </main>
        </main>
    );
}
