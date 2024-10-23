import SalesForm from "@/Components/SalesForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Home = ({ auth }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <main className="pt-24">
                <div className="border-b-2 border-gray-300 pb-5 flex justify-between items-center">
                    <h1 className="text-xl text-gray-500">Ripoti</h1>
                    <SalesForm />
                </div>
                <div>{/* <ReportList /> */}</div>
            </main>
        </AuthenticatedLayout>
    );
};

export default Home;
