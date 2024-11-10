import ReportCard from "@/Components/Admin/Cards/ReportCard";
import AdminLayout from "@/Layouts/AdminLayout";

const TargetReports = () => {
    return (
        <AdminLayout>
            <main className="p-5 space-y-4">
                <h1 className="text-2xl mb-4">Target Reports</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ReportCard
                        title="Collector Daily Sales Report"
                        link="/admin/target-reports/collector_daily_sales_report"
                    />
                    <ReportCard
                        title="Collector Control Number Sales Report"
                        link="/admin/target-reports/collector_control_number_sales_report"
                    />
                    <ReportCard
                        title="Enforcement Control Numbers Sales Report"
                        link="/admin/target-reports/enforcement_control_number_sales_report"
                    />
                </div>
            </main>
        </AdminLayout>
    );
};

export default TargetReports;
