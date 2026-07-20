import { useState } from "react";
import { FaMoneyBillWave, FaHashtag, FaArrowLeft } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { IoMdAddCircleOutline } from "react-icons/io";
import MauzoForm from "./MauzoForm";
import ControlNumberForm from "./ControlNumberForm";

const STEP_TITLES = {
    choose: "Ripoti",
    mauzo: "Jaza Mauzo",
    control_number: "Jaza Control Number",
};

const SalesForm = ({ auth, supervisors = [] }) => {
    const role = auth.user.role;

    const [open, setOpen] = useState(false);
    const [step, setStep] = useState("choose");

    const handleOpenChange = (isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
            setStep("choose");
        }
    };

    const closeDialog = () => handleOpenChange(false);

    return (
        <div>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogTrigger>
                    <div className="flex bg-blue-600 px-4 py-2 text-white rounded-lg gap-x-2 items-center font-medium text-sm hover:bg-blue-700 transition-colors">
                        <IoMdAddCircleOutline size={18} />
                        Jaza Ripoti
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <div className="flex items-center gap-2">
                            {step !== "choose" && (
                                <button
                                    type="button"
                                    onClick={() => setStep("choose")}
                                    className="text-gray-400 hover:text-gray-600"
                                    aria-label="Rudi Nyuma"
                                >
                                    <FaArrowLeft size={14} />
                                </button>
                            )}
                            <DialogTitle className="border-b border-gray-200 pb-4 flex-1">
                                {STEP_TITLES[step]}
                            </DialogTitle>
                        </div>
                        <DialogDescription>
                            {step === "choose"
                                ? "Chagua unachotaka kujaza"
                                : ""}
                        </DialogDescription>
                    </DialogHeader>

                    {step === "choose" && (
                        <div className="flex flex-col gap-3 pb-2">
                            {role === "collector" && (
                                <button
                                    type="button"
                                    onClick={() => setStep("mauzo")}
                                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                                >
                                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                                        <FaMoneyBillWave size={18} />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">
                                            Jaza Mauzo
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Ingiza mauzo yako ya siku
                                        </div>
                                    </div>
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setStep("control_number")}
                                className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                            >
                                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                                    <FaHashtag size={18} />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-800">
                                        Jaza Control Number
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Ingiza control number na kiasi
                                    </div>
                                </div>
                            </button>
                        </div>
                    )}

                    {step === "mauzo" && (
                        <MauzoForm
                            supervisors={supervisors}
                            onDone={closeDialog}
                        />
                    )}

                    {step === "control_number" && (
                        <ControlNumberForm
                            supervisors={supervisors}
                            onDone={closeDialog}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SalesForm;
