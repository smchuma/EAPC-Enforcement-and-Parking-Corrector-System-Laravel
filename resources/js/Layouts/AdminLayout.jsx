import AdminNavbar from "@/Components/Admin/AdminNavbar";
import Sidebar from "@/Components/Admin/Sidebar";

export default function Authenticated({ user, header, children }) {
    return (
        <main className="min-h-screen bg-gray-100">
            <Sidebar />
            <main className="ml-0 lg:ml-72 w-full lg:w-[calc(100%-20rem)] pr-0 lg:pr-10">
                <AdminNavbar />
                {children}
            </main>
        </main>
    );
}
