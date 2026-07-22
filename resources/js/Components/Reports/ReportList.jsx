import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import TextInput from "../TextInput";
import PrimaryButton from "../PrimaryButton";
import PaginationLinks from "../PaginationLinks";
import { formatMoney, formatNumber } from "@/lib/formatNumber";

const ReportList = ({ reports, auth }) => {
    const [filteredReports, setFilteredReports] = useState(reports.data);
    const [searchDate, setSearchDate] = useState("");
    const [selectedReport, setSelectedReport] = useState(null);

    useEffect(() => {
        setFilteredReports(reports.data);
    }, [reports]);

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

    const openModal = (report) => setSelectedReport(report);
    const closeModal = () => setSelectedReport(null);

    return (
        <div className="container mx-auto px-3 sm:px-0">
            {/* Single Date Filter Input */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-2 mb-6 mt-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Search Ripoti
                    </label>
                    <div className="flex items-center px-3 border border-gray-300 rounded-lg w-full sm:w-64 bg-white">
                        <CiSearch size={20} className="text-gray-400" />
                        <TextInput
                            type="date"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                            className="border-0 shadow-none bg-transparent w-full outline-none focus:ring-0"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <PrimaryButton onClick={handleSearch}>
                        Search
                    </PrimaryButton>

                    {/* Clear button */}
                    <PrimaryButton
                        className="bg-gray-500 hover:bg-gray-600"
                        onClick={handleClear}
                    >
                        Clear
                    </PrimaryButton>
                </div>
            </div>

            {/* Table - sm and up */}
            <div className="hidden sm:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase tracking-wide">
                            <th className="px-4 py-3 text-left">Date</th>

                            {auth.user.role === "supervisor" && (
                                <th className="px-4 py-3 text-left">
                                    Collector
                                </th>
                            )}
                            {["collector", "supervisor"].includes(
                                auth.user.role
                            ) && (
                                <th className="px-4 py-3 text-right">
                                    Mauzo
                                </th>
                            )}
                            {["collector", "supervisor"].includes(
                                auth.user.role
                            ) && (
                                <th className="px-4 py-3 text-center">
                                    Picture
                                </th>
                            )}

                            <th className="px-4 py-3 text-right">
                                Total Amount (Control Numbers)
                            </th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredReports.map((report) => (
                            <tr
                                key={report.id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                    {new Date(
                                        report.created_at
                                    ).toLocaleDateString()}
                                </td>
                                {auth.user.role === "supervisor" && (
                                    <td className="px-4 py-3 text-gray-800">
                                        {report.user?.first_name}{" "}
                                        {report.user?.last_name}
                                    </td>
                                )}
                                {["collector", "supervisor"].includes(
                                    auth.user.role
                                ) && (
                                    <td className="px-4 py-3 text-right text-gray-600">
                                        {formatNumber(report.daily_sales)}
                                    </td>
                                )}
                                {["collector", "supervisor"].includes(
                                    auth.user.role
                                ) && (
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center">
                                            {report.sales_proof_image ? (
                                                <img
                                                    src={`/storage/${report.sales_proof_image}`}
                                                    alt="Report proof"
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                            ) : (
                                                <p className="text-xs text-gray-400">
                                                    picha haipo
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                )}
                                <td className="px-4 py-3 text-right font-semibold text-gray-900">
                                    {formatMoney(
                                        report.control_number.reduce(
                                            (total, control) =>
                                                total +
                                                parseFloat(control.amount),
                                            0
                                        )
                                    )}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => openModal(report)}
                                        className="text-blue-600 font-medium hover:text-blue-800"
                                    >
                                        Ona Control Number
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cards - below sm, tables don't fit phone screens well */}
            <div className="sm:hidden space-y-3">
                {filteredReports.map((report) => (
                    <div
                        key={report.id}
                        className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
                    >
                        <div className="flex justify-between items-start gap-2 mb-3">
                            <span className="text-xs text-gray-400">
                                {new Date(
                                    report.created_at
                                ).toLocaleDateString()}
                            </span>
                            {auth.user.role === "supervisor" && (
                                <span className="font-medium text-gray-800 text-sm text-right">
                                    {report.user?.first_name}{" "}
                                    {report.user?.last_name}
                                </span>
                            )}
                        </div>

                        {["collector", "supervisor"].includes(
                            auth.user.role
                        ) && (
                            <div className="flex justify-between items-center py-1.5 border-t border-gray-100">
                                <span className="text-sm text-gray-500">
                                    Mauzo
                                </span>
                                <span className="text-sm text-gray-800">
                                    {formatNumber(report.daily_sales)}
                                </span>
                            </div>
                        )}

                        {["collector", "supervisor"].includes(
                            auth.user.role
                        ) && (
                            <div className="flex justify-between items-center py-1.5 border-t border-gray-100">
                                <span className="text-sm text-gray-500">
                                    Picture
                                </span>
                                {report.sales_proof_image ? (
                                    <img
                                        src={`/storage/${report.sales_proof_image}`}
                                        alt="Report proof"
                                        className="w-14 h-14 object-cover rounded-lg"
                                    />
                                ) : (
                                    <span className="text-xs text-gray-400">
                                        picha haipo
                                    </span>
                                )}
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-2 mt-1 border-t border-gray-100">
                            <div>
                                <div className="text-xs text-gray-500">
                                    Total Amount (Control Numbers)
                                </div>
                                <div className="font-semibold text-gray-900">
                                    {formatMoney(
                                        report.control_number.reduce(
                                            (total, control) =>
                                                total +
                                                parseFloat(control.amount),
                                            0
                                        )
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => openModal(report)}
                                className="text-blue-600 text-sm font-medium hover:text-blue-800"
                            >
                                Ona Control Number
                            </button>
                        </div>
                    </div>
                ))}
            </div>
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
                                                    Amount:{" "}
                                                    {formatNumber(
                                                        control.amount
                                                    )}
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

            <PaginationLinks meta={reports} />
        </div>
    );
};

export default ReportList;
