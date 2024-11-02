import AdminNavbar from "@/Components/Admin/AdminNavbar";
import Sidebar from "@/Components/Admin/Sidebar";
import { ToastProvider } from "@/Context/ToastContext";

export default function AdminAuthenticated({ user, header, children }) {
    return (
        <ToastProvider>
            <main className="min-h-screen bg-gray-100">
                <Sidebar />
                <main className="ml-0 lg:ml-72">
                    <AdminNavbar />
                    <main className="mt-16">{children}</main>
                </main>
            </main>
        </ToastProvider>
    );
}
