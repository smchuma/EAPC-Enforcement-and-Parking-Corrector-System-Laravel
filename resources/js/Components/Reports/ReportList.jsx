import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { router } from "@inertiajs/react";
import TextInput from "../TextInput";
import PrimaryButton from "../PrimaryButton";

const ReportList = ({ reports }) => {
    const [filteredReports, setFilteredReports] = useState(reports.data);
    const [searchDate, setSearchDate] = useState("");
    const [selectedReport, setSelectedReport] = useState(null);
    const [page, setPage] = useState(reports.current_page);

    const handleSearch = () => {
        if (searchDate) {
            const filteredDate = reports.data.filter(
                (report) =>
                    new Date(report.created_at).toISOString().slice(0, 10) ===
                    searchDate
            );

            setFilteredReports(filteredDate);
        }
    };

    const handleClear = () => {
        setSearchDate("");
        setFilteredReports(reports.data);
    };

    const handlePageChange = (newPage) => {
        if (url) {
            router.get(
                url,
                {},
                {
                    replace: true,
                    preserveScroll: true,
                    preserveState: true,
                }
            );
        }
    };

    const openModal = (report) => setSelectedReport(report);
    const closeModal = () => setSelectedReport(null);

    return (
        <div className="container mx-auto">
            {/* Single Date Filter Input */}
            <div className="flex space-x-4 mb-6 mt-5">
                <div className="flex justify-center items-center gap-x-3">
                    <label className="block font-medium mb-1">
                        Search Ripoti
                    </label>
                    <TextInput
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="self-end flex space-x-2">
                    <PrimaryButton
                        onClick={handleSearch}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Search
                    </PrimaryButton>

                    {/* Clear button */}
                    <PrimaryButton
                        onClick={handleClear}
                        className="border-2 bg-gray-600 text-black py-2 px-4 rounded hover:bg-gray-400"
                    >
                        Clear
                    </PrimaryButton>
                </div>
            </div>

            {/* Table */}
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Mauzo</th>
                        <th className="border p-2">Picture</th>
                        <th className="border p-2">
                            Total Amount (Control Numbers)
                        </th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports.map((report) => (
                        <tr
                            key={report.id}
                            className="bg-gray-50 hover:bg-gray-100"
                        >
                            <td className="border p-3 text-center">
                                {new Date(
                                    report.created_at
                                ).toLocaleDateString()}
                            </td>
                            <td className="border p-3 text-center">
                                {report.daily_sales} TSH
                            </td>
                            <td className="border p-3 flex justify-center">
                                {report.sales_proof_image ? (
                                    <img
                                        src={`/storage/${report.sales_proof_image}`}
                                        alt="Report proof"
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                ) : (
                                    <p className="text-xs font-semibold">
                                        picha haipo
                                    </p>
                                )}
                            </td>
                            <td className="border p-3 text-center">
                                {report.control_number
                                    .reduce(
                                        (total, control) =>
                                            total + parseFloat(control.amount),
                                        0
                                    )
                                    .toFixed(2)}{" "}
                                TSH
                            </td>
                            <td className="border p-3">
                                <button
                                    onClick={() => openModal(report)}
                                    className="text-blue-600 underline hover:text-blue-800"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal for Control Numbers Details */}
            {selectedReport && (
                <Dialog
                    open={Boolean(selectedReport)}
                    onOpenChange={closeModal}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Control Numbers Details</DialogTitle>
                            <DialogDescription>
                                <div className="space-y-4">
                                    {selectedReport.control_number.map(
                                        (control) => (
                                            <div
                                                key={control.id}
                                                className="flex justify-between border-b border-gray-300 py-2"
                                            >
                                                <span>
                                                    Control Number:{" "}
                                                    {control.control_number}
                                                </span>
                                                <span>
                                                    Amount: {control.amount}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="mt-6">
                                    <button
                                        onClick={closeModal}
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                    >
                                        Close
                                    </button>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
            {filteredReports.length === 0 && (
                <h1 className="mt-10 font-semibold text-center">
                    Hauna ripoti yoyote
                </h1>
            )}
            <div className="flex justify-between  items-center gap-x-5 mt-5 mb-32">
                <button
                    onClick={() => handlePageChange(reports.prev_page_url)}
                    disabled={page === 1}
                    className="cursor-pointer"
                >
                    <GrPrevious />
                </button>
                <span>
                    Page {page} of {reports.last_page}
                </span>
                <button
                    onClick={() => handlePageChange(reports.next_page_url)}
                    disabled={page === reports.last_page}
                    className="cursor-pointer"
                >
                    <GrNext />
                </button>
            </div>
        </div>
    );
};

export default ReportList;
