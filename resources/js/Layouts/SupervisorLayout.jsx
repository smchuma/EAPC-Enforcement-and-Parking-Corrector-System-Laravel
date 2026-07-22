import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { ToastProvider } from "@/Context/ToastContext";

export default function SupervisorLayout({ children }) {
    return (
        <ToastProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100">
            <div className="md:w-[80%] mx-auto">
                <nav className="flex items-center justify-between px-5 bg-gray-50 rounded-lg py-5 fixed w-full md:w-[80%] top-0 shadow-lg z-[50]">
                    <ApplicationLogo className="text-xl lobster-regular text-blue-600 font-semibold" />
                    <div className="flex items-center gap-x-6">
                        <Link
                            href={route("supervisor.dashboard")}
                            className="text-sm text-gray-700 hover:text-blue-500"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route("supervisor.viewUsers")}
                            className="text-sm text-gray-700 hover:text-blue-500"
                        >
                            Users
                        </Link>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="text-sm text-gray-700 hover:text-blue-500"
                        >
                            Log Out
                        </Link>
                    </div>
                </nav>
                <main>{children}</main>
            </div>
        </div>
        </ToastProvider>
    );
}
