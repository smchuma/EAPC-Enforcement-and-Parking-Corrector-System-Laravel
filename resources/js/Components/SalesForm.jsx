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
import { usePage, useForm } from "@inertiajs/react";

const SalesForm = () => {
    const { auth } = usePage().props;
    const role = auth.user.role;

    const [open, setOpen] = useState(false);

    // Using useForm from Inertia.js
    const { data, setData, post, processing, reset, errors } = useForm({
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
                    <div className="flex bg-gray-800 px-3 text-white p-2 rounded-md gap-x-2 items-center hover:scale-105 transition-all">
                        <IoMdAddCircleOutline size={18} />
                        Jaza Ripoti
                    </div>
                </DialogTrigger>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle className="border-b-2 pb-4">
                            Ripoti
                        </DialogTitle>
                        <DialogDescription>
                            Jaza Mauzo yako ya siku
                        </DialogDescription>

                        <form
                            onSubmit={handleSubmit}
                            className="rounded pt-3 px-5 text-black"
                        >
                            {role === "collector" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                    {/* Jaza Mauzo */}
                                    <div className="flex flex-col">
                                        <InputLabel
                                            htmlFor="jazaMauzo"
                                            className="mb-4"
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
                                            className="border border-gray-400 rounded-md"
                                            placeholder="Ingiza mauzo yako"
                                        />
                                    </div>

                                    {/* Upload Picha */}
                                    <div className="flex flex-col">
                                        <InputLabel
                                            htmlFor="uploadPicha"
                                            className="mb-4"
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
                                            className="p-2 border border-gray-400 rounded"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Mauzo ya Control Number */}
                            <div className="mt-6">
                                <h2 className="text-lg font-semibold mb-5">
                                    Mauzo ya Control Number
                                </h2>
                                {data.control_numbers.map(
                                    (controller, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center mb-5"
                                        >
                                            <div className="flex-1 grid grid-cols-2 gap-4">
                                                {/* Control Number */}
                                                <div className="flex flex-col">
                                                    <label
                                                        htmlFor={`controlNumber-${index}`}
                                                        className="mb-3"
                                                    >
                                                        Control Number
                                                    </label>
                                                    <input
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
                                                        className="p-2 border border-gray-400 rounded"
                                                        placeholder="Ingiza Control Number"
                                                    />
                                                    {errors[
                                                        `control_numbers.${index}.number`
                                                    ] && (
                                                        <span className="text-red-500 mt-1">
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
                                                    <label
                                                        htmlFor={`amount-${index}`}
                                                        className="mb-3"
                                                    >
                                                        Kiasi
                                                    </label>
                                                    <input
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
                                                        className="p-2 border border-gray-400 rounded"
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
                                                    className="bg-transparent ml-4 text-red-500 hover:text-red-700 mt-6"
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
                                    className="flex items-center text-blue-500 hover:text-blue-700"
                                >
                                    <FaPlus className="mr-2" /> Ongeza Control
                                    Number
                                </button>
                            </div>

                            <p className="text-sm mt-3 text-center text-red-600">
                                {errors.user_id}
                            </p>

                            {/* Submit Button */}
                            <div className="mt-7 mb-8 flex justify-end gap-2">
                                <button
                                    type="submit"
                                    className="w-1/4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                                    disabled={processing} // Disable button during form processing
                                >
                                    {processing ? "Inatuma..." : "Tuma Mauzo"}
                                </button>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SalesForm;
