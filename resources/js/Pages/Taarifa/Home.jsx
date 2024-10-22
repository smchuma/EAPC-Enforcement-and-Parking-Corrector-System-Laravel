import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Home = ({ auth }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <h1 className="text-gray-900 text-5xl">HOME</h1>
        </AuthenticatedLayout>
    );
};

export default Home;
