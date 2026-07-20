import { FaPlus, FaTrash } from "react-icons/fa";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import SelectField from "./SelectField";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "@inertiajs/react";

const ControlNumberForm = ({ supervisors = [], onDone }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        supervisor_id: "",
        control_numbers: [{ number: "", amount: "" }],
    });

    const addControlNumber = () => {
        setData("control_numbers", [
            ...data.control_numbers,
            { number: "", amount: "" },
        ]);
    };

    const removeControlNumber = (indexToRemove) => {
        const updatedControlNumbers = data.control_numbers.filter(
            (_, index) => index !== indexToRemove
        );
        setData("control_numbers", updatedControlNumbers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("report.store_control_numbers"), {
            onSuccess: () => {
                reset();
                setData("control_numbers", [{ number: "", amount: "" }]);
                onDone();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="rounded pt-3 text-black">
            <div className="flex flex-col">
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

            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">
                    Mauzo ya Control Number
                </h2>
                {data.control_numbers.map((controller, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-2 mb-4"
                    >
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <InputLabel
                                    htmlFor={`controlNumber-${index}`}
                                    className="mb-2"
                                >
                                    Control Number
                                </InputLabel>
                                <TextInput
                                    type="number"
                                    id={`controlNumber-${index}`}
                                    name={`controlNumber-${index}`}
                                    value={controller.number}
                                    onChange={(e) => {
                                        const updatedControlNumbers = [
                                            ...data.control_numbers,
                                        ];
                                        updatedControlNumbers[index].number =
                                            e.target.value;
                                        setData(
                                            "control_numbers",
                                            updatedControlNumbers
                                        );
                                    }}
                                    required
                                    placeholder="Ingiza Control Number"
                                />
                                {errors[
                                    `control_numbers.${index}.number`
                                ] && (
                                    <span className="text-red-500 text-sm mt-1">
                                        {
                                            errors[
                                                `control_numbers.${index}.number`
                                            ]
                                        }
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <InputLabel
                                    htmlFor={`amount-${index}`}
                                    className="mb-2"
                                >
                                    Kiasi
                                </InputLabel>
                                <TextInput
                                    type="number"
                                    id={`amount-${index}`}
                                    name={`amount-${index}`}
                                    value={controller.amount}
                                    onChange={(e) => {
                                        const updatedControlNumbers = [
                                            ...data.control_numbers,
                                        ];
                                        updatedControlNumbers[index].amount =
                                            e.target.value;
                                        setData(
                                            "control_numbers",
                                            updatedControlNumbers
                                        );
                                    }}
                                    required
                                    placeholder="Ingiza Kiasi"
                                />
                            </div>
                        </div>

                        {data.control_numbers.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeControlNumber(index)}
                                className="bg-transparent shrink-0 text-red-500 hover:text-red-700 mt-8"
                                aria-label="Delete Control Number"
                            >
                                <FaTrash size={15} />
                            </button>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addControlNumber}
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                    <FaPlus className="mr-2" size={12} /> Ongeza Control
                    Number
                </button>
            </div>

            <p className="text-sm mt-3 text-center text-red-600">
                {errors.control_numbers}
            </p>

            <div className="mt-7 mb-2 flex justify-end">
                <PrimaryButton
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={processing}
                >
                    {processing ? "Inatuma..." : "Tuma Control Number"}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default ControlNumberForm;
