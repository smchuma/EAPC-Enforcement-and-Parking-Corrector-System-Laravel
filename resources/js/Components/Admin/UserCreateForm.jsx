import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosAdd } from "react-icons/io";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import InputError from "../InputError";
import PrimaryButton from "../PrimaryButton";
import SelectField from "../SelectField";

const generateUsername = (firstName, lastName) =>
    (firstName.charAt(0) + "." + lastName).toLowerCase().replace(/\s+/g, "");

const UserCreateForm = ({ storeRoute = "admin.storeUser" }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        role: "",
    });

    const [open, setOpen] = useState(false);
    const [previewUsername, setPreviewUsername] = useState("");

    const handleNameChange = (field, value) => {
        setData(field, value);
        const first = field === "first_name" ? value : data.first_name;
        const last = field === "last_name" ? value : data.last_name;
        setPreviewUsername(generateUsername(first, last));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route(storeRoute), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOpen(false);
            },
            onError: (errors) => {
                // Handle error
                toast.error("Failed");
            },
        });
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 border border-transparent rounded-lg font-semibold text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150">
                    <IoIosAdd size={20} />
                    <span>Create User</span>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="border-b border-gray-200 pb-4">
                            Create User
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4 my-2"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel
                                        htmlFor="grid-first_name"
                                        required
                                    >
                                        First Name
                                    </InputLabel>
                                    <TextInput
                                        className="block w-full"
                                        id="grid-first_name"
                                        type="text"
                                        value={data.first_name}
                                        onChange={(e) =>
                                            handleNameChange(
                                                "first_name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter the First Name"
                                    />
                                    <InputError
                                        message={errors.first_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="grid-last_name"
                                        required
                                    >
                                        Last Name
                                    </InputLabel>
                                    <TextInput
                                        className="block w-full"
                                        id="grid-last_name"
                                        type="text"
                                        placeholder="Enter the Last Name"
                                        value={data.last_name}
                                        onChange={(e) =>
                                            handleNameChange(
                                                "last_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.last_name}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            {previewUsername && (
                                <div>
                                    <InputLabel>
                                        Username (auto-generated)
                                    </InputLabel>
                                    <div className="block w-full bg-gray-50 text-gray-500 border border-gray-200 rounded-lg py-2 px-3 text-sm font-mono">
                                        {previewUsername}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="grid-email" required>
                                        Email
                                    </InputLabel>
                                    <TextInput
                                        className="block w-full"
                                        id="grid-email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="Enter the Email"
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="grid-phone_number"
                                        required
                                    >
                                        Phone Number
                                    </InputLabel>
                                    <TextInput
                                        className="block w-full"
                                        id="grid-phone_number"
                                        type="number"
                                        placeholder="Enter Phone Number"
                                        value={data.phone_number}
                                        onChange={(e) =>
                                            setData(
                                                "phone_number",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.phone_number}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="role" required>
                                    Role
                                </InputLabel>
                                <SelectField
                                    id="role"
                                    value={data.role}
                                    className="block w-full"
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                >
                                    <option value="">Select</option>
                                    <option value="enforcement">
                                        Enforcement
                                    </option>
                                    <option value="collector">
                                        Collector
                                    </option>
                                    <option value="supervisor">
                                        Supervisor
                                    </option>
                                </SelectField>
                                <InputError
                                    message={errors.role}
                                    className="mt-2"
                                />
                            </div>

                            <p className="text-xs text-gray-500">
                                The user will receive an email invitation to
                                set their own password.
                            </p>

                            <div className="flex justify-end mt-2">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? "Creating..." : "Create"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserCreateForm;
