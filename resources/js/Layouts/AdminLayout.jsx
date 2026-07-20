import { useState } from "react";
import AdminNavbar from "@/Components/Admin/AdminNavbar";
import Sidebar from "@/Components/Admin/Sidebar";
import { ToastProvider } from "@/Context/ToastContext";

export default function AdminAuthenticated({ user, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <ToastProvider>
            <main className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100">
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />
                <main className="ml-0 lg:ml-72">
                    <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />
                    <main className="mt-16 px-0 sm:px-2 overflow-x-hidden">
                        {children}
                    </main>
                </main>
            </main>
        </ToastProvider>
    );
}
