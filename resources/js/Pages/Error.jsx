import { Head } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

const MESSAGES = {
    403: {
        title: "Access Denied",
        description: "You don't have permission to view this page.",
    },
    404: {
        title: "Page Not Found",
        description: "The page you're looking for doesn't exist or was moved.",
    },
    429: {
        title: "Too Many Requests",
        description: "You've made too many requests. Please wait a moment and try again.",
    },
    500: {
        title: "Something Went Wrong",
        description: "An unexpected error occurred on our end. Please try again in a moment.",
    },
    503: {
        title: "Under Maintenance",
        description: "The system is temporarily unavailable. Please check back shortly.",
    },
};

export default function Error({ status }) {
    const { title, description } = MESSAGES[status] || MESSAGES[500];

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-[linear-gradient(135deg,#eff6ff_0%,#f8fafc_45%,#e0e7ff_100%)]">
            <Head title={title} />
            <div className="w-full max-w-md">
                <div className="bg-white w-full flex items-center justify-center flex-col py-10 px-6 sm:px-10 shadow-xl shadow-gray-200/70 border border-gray-100 rounded-2xl text-center">
                    <ApplicationLogo className="text-2xl font-bold text-blue-600 mb-6" />
                    <p className="text-5xl font-bold text-gray-300 mb-2">{status}</p>
                    <h1 className="text-lg font-semibold text-gray-800 mb-2">
                        {title}
                    </h1>
                    <p className="text-sm text-gray-500 mb-8">{description}</p>
                    <a
                        href="/"
                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg font-semibold text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Go Back Home
                    </a>
                </div>
            </div>
        </div>
    );
}
