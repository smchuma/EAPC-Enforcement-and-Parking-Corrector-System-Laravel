import AdminAllGraph from "@/Components/Admin/AdminAllGraph";
import AdminBarChart from "@/Components/Admin/AdminBarChart";
import AdminCardsGrid from "@/Components/Admin/Cards/AdminCardsGrid";
import TopSellersTable from "@/Components/Admin/TopSellersTable";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({ reports }) {
    return (
        <AdminLayout>
            <main className="mt-16">
                <AdminCardsGrid reports={reports} />
                <div className="flex flex-col lg:flex-row gap-5 px-8  w-full">
                    <AdminBarChart reports={reports} />
                    <AdminAllGraph reports={reports} />
                </div>
                <h1 className="mt-10 mx-10 font-bold">Top Sellers</h1>
                <TopSellersTable reports={reports} />
            </main>
        </AdminLayout>
    );
}
