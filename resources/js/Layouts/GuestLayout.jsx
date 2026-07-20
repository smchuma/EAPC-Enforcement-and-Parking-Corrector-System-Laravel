import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-[linear-gradient(135deg,#eff6ff_0%,#f8fafc_45%,#e0e7ff_100%)]">
            <div className="w-full max-w-md">
                <div className="bg-white w-full flex items-center justify-center flex-col py-8 px-6 sm:px-10 shadow-xl shadow-gray-200/70 border border-gray-100 rounded-2xl">
                    <div className="flex flex-col items-center mb-6">
                        <ApplicationLogo className="text-2xl font-bold text-blue-600" />
                        <p className="text-sm text-gray-500 mt-1 text-center">
                            Enforcement &amp; Parking Corrector System
                        </p>
                    </div>
                    <div className="w-full">{children}</div>
                </div>
            </div>
        </div>
    );
}
