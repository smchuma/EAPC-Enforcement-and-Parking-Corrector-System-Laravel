import AdminBarChart from "@/Components/Admin/AdminBarChart";
import AdminLineChart from "@/Components/Admin/AdminLineChart";
import EmpPieChart from "@/Components/Graphs/EmpPieChart";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({ reports }) {
    return (
        <AdminLayout>
            <main className="mt-16">
                {/* <CardsGrid /> */}
                <h1 className="pt-10 px-8 pb-5 font-bold">Mauzo Kwa Mwezi</h1>
                <div className="flex flex-col lg:flex-row gap-5 px-8  w-full">
                    <AdminBarChart reports={reports} />
                    {/* <AdminLineChart reports={reports} /> */}
                    <EmpPieChart />
                </div>
            </main>
        </AdminLayout>
    );
}
