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
import { MdOutlineEdit } from "react-icons/md";

const EditUser = ({ user, open, setOpen }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        role: user.role || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.update_user", user.id, { preserveScroll: true }), {
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
                <DialogTrigger>
                    <div className="flex items-center gap-x-2 cursor-pointer">
                        <MdOutlineEdit />
                        Edit
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="border-b border-gray-200 pb-4">
                            Update User
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
                                            setData(
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
                                            setData(
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

                            <div className="flex justify-end mt-2">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? "Updating..." : "Update"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditUser;
