import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import SelectField from "./SelectField";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "@inertiajs/react";

const MauzoForm = ({ supervisors = [], onDone }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        supervisor_id: "",
        daily_sales: "",
        sales_proof_image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("report.store_sales"), {
            onSuccess: () => {
                reset();
                onDone();
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded pt-3 text-black"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <InputLabel htmlFor="jazaMauzo" className="mb-2">
                        Jaza Mauzo
                    </InputLabel>
                    <TextInput
                        type="number"
                        value={data.daily_sales}
                        onChange={(e) =>
                            setData("daily_sales", e.target.value)
                        }
                        id="jazaMauzo"
                        name="jazaMauzo"
                        required
                        placeholder="Ingiza mauzo yako"
                    />
                    {errors.daily_sales && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.daily_sales}
                        </span>
                    )}
                </div>

                <div className="flex flex-col">
                    <InputLabel htmlFor="uploadPicha" className="mb-2">
                        Weka Picha Inayoonyesha Mauzo Yako ya Leo
                    </InputLabel>
                    <TextInput
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setData("sales_proof_image", e.target.files[0])
                        }
                        id="uploadPicha"
                        name="uploadPicha"
                        required
                    />
                    {errors.sales_proof_image && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.sales_proof_image}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-col mt-4">
                <InputLabel htmlFor="supervisorSelect" className="mb-2">
                    Chagua Msimamizi
                </InputLabel>
                <SelectField
                    id="supervisorSelect"
                    value={data.supervisor_id}
                    onChange={(e) => setData("supervisor_id", e.target.value)}
                >
                    <option value="">Chagua...</option>
                    {supervisors.map((supervisor) => (
                        <option key={supervisor.id} value={supervisor.id}>
                            {supervisor.first_name} {supervisor.last_name}
                        </option>
                    ))}
                </SelectField>
                {errors.supervisor_id && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.supervisor_id}
                    </span>
                )}
            </div>

            <p className="text-sm mt-3 text-center text-red-600">
                {errors.user_id}
            </p>

            <div className="mt-7 mb-2 flex justify-end">
                <PrimaryButton
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={processing}
                >
                    {processing ? "Inatuma..." : "Tuma Mauzo"}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default MauzoForm;
