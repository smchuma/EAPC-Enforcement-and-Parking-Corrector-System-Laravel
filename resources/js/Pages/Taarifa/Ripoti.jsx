import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Ripoti = ({ auth }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <main className="pt-24">Ripoti</main>
        </AuthenticatedLayout>
    );
};

export default Ripoti;
