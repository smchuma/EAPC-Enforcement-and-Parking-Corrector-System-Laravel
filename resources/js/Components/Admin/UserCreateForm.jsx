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

const UserCreateForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        phone_number: "",
        target: "",
        street: "",
        email: "",
        role: "",
        password: "",
    });

    const [open, setOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("users.store", { preserveScroll: true }), {
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
        <div className="flex justify-end lg:pr-10 pt-10">
            <div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                        <div className="w-full flex justify-center items-center gap-x-1">
                            <IoIosAdd size={20} />

                            <span>Create User</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="">
                        <DialogHeader>
                            <DialogTitle className="border-b-2 pb-4">
                                Create User
                            </DialogTitle>
                            <DialogDescription>
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
                                    <div className="-mx-3 md:flex mb-2">
                                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                            <InputLabel
                                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                                htmlFor="grid-email"
                                                required
                                            >
                                                Email
                                            </InputLabel>
                                            <TextInput
                                                className="placeholder:text-sm appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                                id="grid-email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter the Email"
                                            />
                                            <InputError
                                                message={errors.email}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="md:w-1/2 px-3">
                                            <InputLabel
                                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                                htmlFor="grid-phone_number"
                                                required
                                            >
                                                Phone Number
                                            </InputLabel>
                                            <TextInput
                                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 placeholder:text-sm"
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
                                    <div className="-mx-3 md:flex mb-2">
                                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                            <InputLabel
                                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                                htmlFor="grid-target"
                                                required
                                            >
                                                Target
                                            </InputLabel>
                                            <TextInput
                                                className="placeholder:text-sm appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                                id="grid-target"
                                                type="text"
                                                value={data.target}
                                                onChange={(e) =>
                                                    setData(
                                                        "target",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter the Target"
                                            />
                                            <InputError
                                                message={errors.target}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="md:w-1/2 px-3">
                                            <InputLabel
                                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                                htmlFor="grid-mtaa"
                                                required
                                            >
                                                MTAA
                                            </InputLabel>
                                            <TextInput
                                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 placeholder:text-sm"
                                                id="grid-street"
                                                type="text"
                                                placeholder="Enter Mtaa"
                                                value={data.street}
                                                onChange={(e) =>
                                                    setData(
                                                        "street",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.street}
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
                                                    setData(
                                                        "role",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option
                                                    value=""
                                                    className="text-sm"
                                                >
                                                    Select
                                                </option>
                                                <option
                                                    value="admin"
                                                    className="text-sm"
                                                >
                                                    Admin
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
                                        <div className="md:w-1/2 px-3">
                                            <InputLabel
                                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                                required
                                            >
                                                Password
                                            </InputLabel>
                                            <TextInput
                                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 placeholder:text-sm"
                                                id="grid-password"
                                                type="password"
                                                placeholder="Enter the password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.password}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-x-6 mt-2 justify-end">
                                        <PrimaryButton
                                            type="submit"
                                            className="bg-blue-500 text-white py-2 px-4 rounded w-1/5 flex justify-center"
                                        >
                                            {processing
                                                ? "Creating..."
                                                : "Create"}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default UserCreateForm;
