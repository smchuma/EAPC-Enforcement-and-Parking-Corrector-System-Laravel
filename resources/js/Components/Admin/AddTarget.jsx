import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
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
                        Edit Target
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="border-b border-gray-200 pb-4">
                            Edit Target
                        </DialogTitle>
                        <DialogDescription>
                            The control number target is set automatically
                            (Collector: 100,000, Enforcement: 150,000). Only
                            change it here if it needs to be different for
                            this person.
                        </DialogDescription>
                        <form
                            onSubmit={handleSubmit}
                            className="rounded pt-2 pb-4 flex flex-col my-2 gap-4"
                        >
                            {/* Street Field */}
                            <div>
                                <InputLabel htmlFor="grid-street" required>
                                    Street
                                </InputLabel>
                                <TextInput
                                    className="block w-full"
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
                                <div>
                                    <InputLabel
                                        htmlFor="grid-target"
                                        required
                                    >
                                        Target
                                    </InputLabel>
                                    <TextInput
                                        className="block w-full"
                                        id="grid-target"
                                        type="number"
                                        placeholder="Enter the Target"
                                        value={data.target}
                                        onChange={(e) =>
                                            setData("target", e.target.value)
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
                                user.role === "enforcement") && (
                                <div>
                                    <InputLabel
                                        htmlFor="grid-control_number_target"
                                        required
                                    >
                                        Control Number Target
                                    </InputLabel>
                                    <TextInput
                                        className="block w-full"
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
                                        message={errors.control_number_target}
                                        className="mt-2"
                                    />
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-end mt-4">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? "Saving..." : "Save"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddTarget;
