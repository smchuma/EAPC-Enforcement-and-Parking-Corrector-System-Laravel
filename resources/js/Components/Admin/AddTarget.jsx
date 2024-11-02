import { useForm } from "@inertiajs/react";
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

const AddTarget = ({ user, open, setOpen }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        target: user.target || "",
        control_number_target: user.control_number_target || "",
        street: user.street || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.add_target", user.id, { preserveScroll: true }), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
            onError: (errors) => {
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
                        Add Target
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="border-b-2 pb-4">
                            ADD TARGET
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                        <form
                            onSubmit={handleSubmit}
                            className="rounded px-8 pt-2 pb-8 mb-4 flex flex-col my-2"
                        >
                            <div>
                                {/* Street Field */}
                                <div className="mb-4">
                                    <InputLabel
                                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                        htmlFor="grid-street"
                                        required
                                    >
                                        Street
                                    </InputLabel>
                                    <TextInput
                                        className="placeholder:text-sm appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4"
                                        id="grid-street"
                                        type="text"
                                        value={data.street}
                                        onChange={(e) =>
                                            setData("street", e.target.value)
                                        }
                                        placeholder="Enter the Street"
                                    />
                                    <InputError
                                        message={errors.street}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Target field for collectors */}
                                {user.role === "collector" && (
                                    <div className="mb-4">
                                        <InputLabel
                                            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                            htmlFor="grid-target"
                                            required
                                        >
                                            Target
                                        </InputLabel>
                                        <TextInput
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 placeholder:text-sm"
                                            id="grid-target"
                                            type="number"
                                            placeholder="Enter the Target"
                                            value={data.target}
                                            onChange={(e) =>
                                                setData(
                                                    "target",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.target}
                                            className="mt-2"
                                        />
                                    </div>
                                )}

                                {/* Control Number Target field for both collectors and enforcers */}
                                {(user.role === "collector" ||
                                    user.role === "enforcer") && (
                                    <div className="mb-4">
                                        <InputLabel
                                            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                            htmlFor="grid-control_number_target"
                                            required
                                        >
                                            Control Number Target
                                        </InputLabel>
                                        <TextInput
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 placeholder:text-sm"
                                            id="grid-control_number_target"
                                            type="number"
                                            placeholder="Enter the Control Number Target"
                                            value={data.control_number_target}
                                            onChange={(e) =>
                                                setData(
                                                    "control_number_target",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={
                                                errors.control_number_target
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                )}

                                {/* Submit Button */}
                                <div className="flex justify-end mt-10">
                                    <PrimaryButton
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-4 rounded w-1/5 flex justify-center"
                                    >
                                        {processing ? "Adding..." : "ADD"}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddTarget;
