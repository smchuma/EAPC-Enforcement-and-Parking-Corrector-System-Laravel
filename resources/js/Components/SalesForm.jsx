import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { IoMdAddCircleOutline } from "react-icons/io";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import SelectField from "./SelectField";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "@inertiajs/react";

const SalesForm = ({ auth, supervisors = [] }) => {
    const role = auth.user.role;

    const [open, setOpen] = useState(false);

    // Using useForm from Inertia.js
    const { data, setData, post, processing, reset, errors } = useForm({
        user_id: auth.user.id,
        supervisor_id: "",
        daily_sales: "",
        control_numbers: [{ number: "", amount: "" }],
        sales_proof_image: null,
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

        post("/ripoti", {
            onSuccess: () => {
                reset(); // Reset initial fields
                setData("control_numbers", [{ number: "", amount: "" }]);
                setOpen(false);
            },
        });
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <div className="flex bg-blue-600 px-4 py-2 text-white rounded-lg gap-x-2 items-center font-medium text-sm hover:bg-blue-700 transition-colors">
                        <IoMdAddCircleOutline size={18} />
                        Jaza Ripoti
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="border-b border-gray-200 pb-4">
                            Ripoti
                        </DialogTitle>
                        <DialogDescription>
                            Jaza Mauzo yako ya siku
                        </DialogDescription>

                        <form
                            onSubmit={handleSubmit}
                            className="rounded pt-3 text-black"
                        >
                            {role === "collector" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                    {/* Jaza Mauzo */}
                                    <div className="flex flex-col">
                                        <InputLabel
                                            htmlFor="jazaMauzo"
                                            className="mb-2"
                                        >
                                            Jaza Mauzo
                                        </InputLabel>
                                        <TextInput
                                            type="number"
                                            value={data.daily_sales}
                                            onChange={(e) =>
                                                setData(
                                                    "daily_sales",
                                                    e.target.value
                                                )
                                            }
                                            id="jazaMauzo"
                                            name="jazaMauzo"
                                            required
                                            placeholder="Ingiza mauzo yako"
                                        />
                                    </div>

                                    {/* Upload Picha */}
                                    <div className="flex flex-col">
                                        <InputLabel
                                            htmlFor="uploadPicha"
                                            className="mb-2"
                                        >
                                            Weka Picha Inayoonyesha Mauzo Yako
                                            ya Leo
                                        </InputLabel>
                                        <TextInput
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setData(
                                                    "sales_proof_image",
                                                    e.target.files[0]
                                                )
                                            }
                                            id="uploadPicha"
                                            name="uploadPicha"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {role === "collector" && (
                                <div className="flex flex-col mt-4">
                                    <InputLabel
                                        htmlFor="supervisorSelect"
                                        className="mb-2"
                                    >
                                        Chagua Msimamizi
                                    </InputLabel>
                                    <SelectField
                                        id="supervisorSelect"
                                        value={data.supervisor_id}
                                        onChange={(e) =>
                                            setData(
                                                "supervisor_id",
                                                e.target.value
                                            )
                                        }
                                        required
                                    >
                                        <option value="">Chagua...</option>
                                        {supervisors.map((supervisor) => (
                                            <option
                                                key={supervisor.id}
                                                value={supervisor.id}
                                            >
                                                {supervisor.first_name}{" "}
                                                {supervisor.last_name}
                                            </option>
                                        ))}
                                    </SelectField>
                                    {errors.supervisor_id && (
                                        <span className="text-red-500 text-sm mt-1">
                                            {errors.supervisor_id}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Mauzo ya Control Number */}
                            <div className="mt-6">
                                <h2 className="text-lg font-semibold mb-4">
                                    Mauzo ya Control Number
                                </h2>
                                {data.control_numbers.map(
                                    (controller, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-2 mb-4"
                                        >
                                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {/* Control Number */}
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
                                                        value={
                                                            controller.number
                                                        }
                                                        onChange={(e) => {
                                                            const updatedControlNumbers =
                                                                [
                                                                    ...data.control_numbers,
                                                                ];
                                                            updatedControlNumbers[
                                                                index
                                                            ].number =
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

                                                {/* Amount */}
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
                                                        value={
                                                            controller.amount
                                                        }
                                                        onChange={(e) => {
                                                            const updatedControlNumbers =
                                                                [
                                                                    ...data.control_numbers,
                                                                ];
                                                            updatedControlNumbers[
                                                                index
                                                            ].amount =
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

                                            {/* Delete Button */}
                                            {data.control_numbers.length >
                                                1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeControlNumber(
                                                            index
                                                        )
                                                    }
                                                    className="bg-transparent shrink-0 text-red-500 hover:text-red-700 mt-8"
                                                    aria-label="Delete Control Number"
                                                >
                                                    <FaTrash size={15} />
                                                </button>
                                            )}
                                        </div>
                                    )
                                )}

                                {/* Add Button */}
                                <button
                                    type="button"
                                    onClick={addControlNumber}
                                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    <FaPlus className="mr-2" size={12} />{" "}
                                    Ongeza Control Number
                                </button>
                            </div>

                            <p className="text-sm mt-3 text-center text-red-600">
                                {errors.user_id}
                            </p>

                            {/* Submit Button */}
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
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SalesForm;
