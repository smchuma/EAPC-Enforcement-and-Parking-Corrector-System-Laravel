import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="bg-white w-3/4 md:w-2/4 lg:w-1/3 mx-20 flex items-center justify-center flex-col py-5 shadow-md rounded-xl">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-blue-500 text-4xl font-bold lobster-regular py-6" />
                    </Link>
                </div>

                <div className="w-full sm:max-w-md  px-6 py-10 overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
