import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { IoMdAddCircleOutline } from "react-icons/io";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { usePage, useForm } from "@inertiajs/react";

const AdminAddReport = ({ users }) => {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Form data setup using Inertia.js
    const { data, setData, post, processing, reset, errors } = useForm({
        user_id: "",
        daily_sales: "",
        control_numbers: [{ number: "", amount: "" }],
        sales_proof_image: null,
    });

    // Handle selection of a user
    const handleUserChange = (e) => {
        const userId = e.target.value;
        const user = users.find((u) => u.id === parseInt(userId));
        setSelectedUser(user);
        setData("user_id", userId);
    };

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
        post(route("admin.add_report"), {
            onSuccess: () => {
                reset();
                setData("control_numbers", [{ number: "", amount: "" }]);
                setOpen(false);
            },
        });
    };
    const filteredUsers = users.filter((user) => user.role !== "admin");

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <div className="flex bg-gray-800 px-3 text-white p-2 rounded-md gap-x-2 items-center hover:scale-105 transition-all">
                        <IoMdAddCircleOutline size={18} />
                        Jaza Ripoti
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="border-b-2 pb-4">
                            Ripoti
                        </DialogTitle>
                        <DialogDescription>
                            Jaza Mauzo ya Mtumiaji
                        </DialogDescription>

                        <form
                            onSubmit={handleSubmit}
                            className="rounded pt-3 px-5 text-black"
                        >
                            {/* User Selection */}
                            <div className="flex flex-col mb-4">
                                <InputLabel htmlFor="userSelect">
                                    Chagua Mtumiaji
                                </InputLabel>
                                <select
                                    id="userSelect"
                                    value={data.user_id}
                                    onChange={handleUserChange}
                                    required
                                    className="p-2 border border-gray-400 rounded"
                                >
                                    <option value="">Chagua...</option>
                                    {filteredUsers.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.first_name} {user.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Conditional Inputs for Collector */}
                            {selectedUser?.role === "collector" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                    {/* Daily Sales */}
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

                                    {/* Sales Proof Image */}
                                    <div className="flex flex-col">
                                        <InputLabel
                                            htmlFor="uploadPicha"
                                            className="mb-4"
                                        >
                                            Weka Picha ya Mauzo
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

                            {/* Control Numbers */}
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
                                                        type="text"
                                                        id={`controlNumber-${index}`}
                                                        pattern="[0-9]{0,13}"
                                                        maxLength={13}
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

                                {/* Add Control Number Button */}
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
                                    disabled={processing}
                                >
                                    {processing ? "Inatuma..." : "Tuma Ripoti"}
                                </button>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminAddReport;
