import { AdminBarChart } from "@/Components/Admin/AdminBarChart";
import AdminLineChart from "@/Components/Admin/AdminLineChart";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({ auth }) {
    return (
        <AdminLayout>
            <main className="mt-16">
                {/* <CardsGrid /> */}
                <div className="flex flex-col lg:flex-row gap-5 px-4 w-full">
                    <AdminBarChart />
                    <AdminLineChart />
                </div>
            </main>
        </AdminLayout>
    );
}
