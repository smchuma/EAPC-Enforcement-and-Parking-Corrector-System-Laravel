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
import { usePage } from "@inertiajs/react";

const SalesForm = () => {
    const { auth } = usePage().props;
    const role = auth.user.role;

    const [dailySales, setDailySales] = useState("");
    const [controlNumbers, setControlNumbers] = useState([
        { number: "", amount: "" },
    ]);
    const [salesProofImage, setSalesProofImage] = useState(null);

    // Function to add a new empty controller number entry
    const addControlNumber = () => {
        setControlNumbers([...controlNumbers, { number: "", amount: "" }]);
    };

    // Function to remove a controller number by its index
    const removeControlNumber = (indexToRemove) => {
        const updatedControlNumbers = controlNumbers.filter(
            (_, index) => index !== indexToRemove
        );
        setControlNumbers(updatedControlNumbers);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("daily_sales", dailySales);
        formData.append("sales_proof_image", salesProofImage);

        controlNumbers.forEach((controller, index) => {
            formData.append(
                `control_numbers[${index}][number]`,
                controller.number
            );
            formData.append(
                `control_numbers[${index}][amount]`,
                controller.amount
            );
        });

        // Inertia.post("/reports", formData, {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     },
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <div className="flex bg-gray-800 px-3 text-white p-2 rounded-md gap-x-2 items-center hover:scale-105 transition-all">
                        <IoMdAddCircleOutline size={18} />
                        Jaza Ripoti
                    </div>
                </DialogTrigger>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle className="border-b-2 pb-4">
                            Jaza Ripoti
                        </DialogTitle>
                        <DialogDescription>
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
                                                className="mb-4 font-semibold"
                                            >
                                                Jaza Mauzo
                                            </InputLabel>
                                            <TextInput
                                                type="number"
                                                value={dailySales}
                                                onChange={(e) =>
                                                    setDailySales(
                                                        e.target.value
                                                    )
                                                }
                                                id="jazaMauzo"
                                                name="jazaMauzo"
                                                required
                                                className=" border border-gray-400 rounded-md"
                                                placeholder="Ingiza mauzo yako"
                                            />
                                        </div>

                                        {/* Upload Picha */}
                                        <div className="flex flex-col">
                                            <InputLabel
                                                htmlFor="uploadPicha"
                                                className="mb-4 font-semibold"
                                            >
                                                Weka Picha Inayoonyesha Mauzo
                                                Yako ya Leo
                                            </InputLabel>
                                            <TextInput
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    setSalesProofImage(
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
                                    {controlNumbers.map((controller, index) => (
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
                                                        type="text"
                                                        id={`controlNumber-${index}`}
                                                        name={`controlNumber-${index}`}
                                                        value={
                                                            controller.number
                                                        }
                                                        onChange={(e) => {
                                                            const updatedControlNumbers =
                                                                [
                                                                    ...controlNumbers,
                                                                ];
                                                            updatedControlNumbers[
                                                                index
                                                            ].number =
                                                                e.target.value;
                                                            setControlNumbers(
                                                                updatedControlNumbers
                                                            );
                                                        }}
                                                        required
                                                        className="p-2 border border-gray-400 rounded"
                                                        placeholder="Ingiza Control Number"
                                                    />
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
                                                                    ...controlNumbers,
                                                                ];
                                                            updatedControlNumbers[
                                                                index
                                                            ].amount =
                                                                e.target.value;
                                                            setControlNumbers(
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
                                            {controlNumbers.length > 1 && (
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
                                    ))}

                                    {/* Add Button */}
                                    <button
                                        type="button"
                                        onClick={addControlNumber}
                                        className="flex items-center text-blue-500 hover:text-blue-700"
                                    >
                                        <FaPlus className="mr-2" /> Ongeza
                                        Control Number
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <div className="mt-7 mb-8 flex justify-end gap-2">
                                    <button
                                        type="submit"
                                        className="w-1/4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                                    >
                                        Tuma Mauzo
                                    </button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SalesForm;
