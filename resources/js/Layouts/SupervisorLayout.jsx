import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function SupervisorLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="md:w-[80%] mx-auto">
                <nav className="flex items-center justify-between px-5 bg-gray-50 rounded-lg py-5 fixed w-full md:w-[80%] top-0 shadow-lg z-[50]">
                    <ApplicationLogo className="text-xl lobster-regular text-blue-600 font-semibold" />
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="text-sm text-gray-700 hover:text-blue-500"
                    >
                        Log Out
                    </Link>
                </nav>
                <main>{children}</main>
            </div>
        </div>
    );
}
