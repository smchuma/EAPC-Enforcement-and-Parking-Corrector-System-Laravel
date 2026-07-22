import AdminAllGraph from "@/Components/Admin/AdminAllGraph";
import AdminBarChart from "@/Components/Admin/AdminBarChart";
import AdminCardsGrid from "@/Components/Admin/Cards/AdminCardsGrid";
import TopSellersTable from "@/Components/Admin/TopSellersTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ reports }) {
    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <main className="px-4 sm:px-6 lg:px-8 py-6 space-y-8">
                <AdminCardsGrid reports={reports} />
                <div className="flex flex-col lg:flex-row gap-5 w-full">
                    <AdminBarChart reports={reports} />
                    <AdminAllGraph reports={reports} />
                </div>
                <div>
                    <h2 className="font-semibold text-lg text-gray-800 mb-4">
                        Top Sellers
                    </h2>
                    <TopSellersTable reports={reports} />
                </div>
            </main>
        </AdminLayout>
    );
}
