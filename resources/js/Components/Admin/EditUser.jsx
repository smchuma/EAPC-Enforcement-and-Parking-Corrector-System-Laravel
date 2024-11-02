import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
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
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle className="border-b-2 pb-4">
                            Update User
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                        <form
                            onSubmit={handleSubmit}
                            className="rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
                        >
                            <div className="-mx-3 md:flex mb-2">
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <InputLabel
                                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                        htmlFor="grid-first_name"
                                        required
                                    >
                                        First Name
                                    </InputLabel>
                                    <TextInput
                                        className="placeholder:text-sm appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                        id="grid-first_name"
                                        type="text"
                                        value={data.first_name}
                                        onChange={(e) =>
                                            setData(
                                                "first_name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter the Fist Name"
                                    />
                                    <InputError
                                        message={errors.first_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="md:w-1/2 px-3">
                                    <InputLabel
                                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                        htmlFor="grid-last_name"
                                        required
                                    >
                                        last name
                                    </InputLabel>
                                    <TextInput
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 placeholder:text-sm"
                                        id="grid-last_name"
                                        type="text"
                                        placeholder="Enter the Last Name"
                                        value={data.last_name}
                                        onChange={(e) =>
                                            setData("last_name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.last_name}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="-mx-3 md:flex mb-2">
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <InputLabel
                                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                        htmlFor="grid-role"
                                        required
                                    >
                                        Role
                                    </InputLabel>
                                    <select
                                        id="role"
                                        value={data.role}
                                        className="mt-1 block w-full text-gray-600 placeholder:text-xs border-gray-300 rounded-md "
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                    >
                                        <option value="" className="text-sm">
                                            Select
                                        </option>
                                        <option
                                            value="enforcer"
                                            className="text-sm"
                                        >
                                            Enforcer
                                        </option>
                                        <option
                                            value="collector"
                                            className="text-sm"
                                        >
                                            Collector
                                        </option>
                                    </select>
                                    <InputError
                                        message={errors.role}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-x-6 mt-2 justify-end">
                                <PrimaryButton
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded w-1/5 flex justify-center"
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
