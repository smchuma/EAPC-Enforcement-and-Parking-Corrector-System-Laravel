import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { IoMdArrowBack } from "react-icons/io";
import CollectorSales from "@/Components/Reports/CollectorSales";

const CollectorDailySales = ({ reports }) => {
    return (
        <AdminLayout>
            <main className="p-5 space-y-4">
                <div className="flex items-center justify-between gap-x-5">
                    <Link href="/admin/target-reports">
                        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                            <IoMdArrowBack size={20} /> <span>Back</span>
                        </button>
                    </Link>

                    <h1 className="text-xl">Collector Daily sales Report</h1>
                </div>
                <CollectorSales reports={reports} />
            </main>
        </AdminLayout>
    );
};

export default CollectorDailySales;
