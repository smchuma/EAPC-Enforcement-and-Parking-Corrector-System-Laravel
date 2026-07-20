import { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaDownload } from "react-icons/fa";
import TextInput from "../TextInput";
import SelectField from "../SelectField";
import PrimaryButton from "../PrimaryButton";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

const ReportSummaryTable = ({ reports, pdfRoute, csvRoute }) => {
    const [searchDate, setSearchDate] = useState("");
    const [selectedPerson, setSelectedPerson] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const people = useMemo(
        () => [...new Set(reports.map((row) => row.name))].sort(),
        [reports]
    );

    const filteredReports = useMemo(
        () =>
            reports.filter((row) => {
                const matchesDate = !searchDate || row.date === searchDate;
                const matchesPerson =
                    !selectedPerson || row.name === selectedPerson;
                return matchesDate && matchesPerson;
            }),
        [reports, searchDate, selectedPerson]
    );

    const handleClear = () => {
        setSearchDate("");
        setSelectedPerson("");
    };

    const openModal = (row) => setSelectedRow(row);
    const closeModal = () => setSelectedRow(null);

    const money = (value) =>
        (value || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return (
        <div>
            <div className="flex flex-col px-4 sm:px-6 lg:px-8 py-6">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                    <div className="flex justify-end items-center px-3 border border-gray-300 rounded-lg w-full sm:w-56 bg-white">
                        <CiSearch size={20} className="text-gray-400" />
                        <TextInput
                            type="date"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                            className="border-0 shadow-none bg-transparent w-full outline-none focus:ring-0"
                        />
                    </div>
                    <SelectField
                        value={selectedPerson}
                        onChange={(e) => setSelectedPerson(e.target.value)}
                        className="w-full sm:w-56"
                    >
                        <option value="">Watu wote</option>
                        {people.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </SelectField>
                    <PrimaryButton
                        className="bg-gray-500 hover:bg-gray-600"
                        onClick={handleClear}
                    >
                        Clear
                    </PrimaryButton>
                </div>

                {/* Date range + downloads */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <TextInput
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="text-sm"
                        />
                        <span className="text-gray-400 text-sm shrink-0">
                            hadi
                        </span>
                        <TextInput
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="text-sm"
                        />
                    </div>
                    <div className="flex gap-2">
                        {fromDate && toDate ? (
                            <>
                                <a
                                    href={route(pdfRoute, {
                                        from: fromDate,
                                        to: toDate,
                                    })}
                                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 rounded-lg font-semibold text-sm text-white hover:bg-blue-700 transition-colors"
                                >
                                    <FaDownload size={13} />
                                    Pakua PDF
                                </a>
                                <a
                                    href={route(csvRoute, {
                                        from: fromDate,
                                        to: toDate,
                                    })}
                                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-700 rounded-lg font-semibold text-sm text-white hover:bg-gray-800 transition-colors"
                                >
                                    <FaDownload size={13} />
                                    Pakua CSV
                                </a>
                            </>
                        ) : (
                            <span
                                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-200 rounded-lg font-semibold text-sm text-gray-400 cursor-not-allowed"
                                title="Chagua tarehe (from na to) kwanza"
                            >
                                <FaDownload size={13} />
                                Pakua PDF/CSV
                            </span>
                        )}
                    </div>
                </div>

                {/* Table - sm and up */}
                <div className="hidden sm:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase tracking-wide">
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Role</th>
                                <th className="px-4 py-3 text-right">
                                    Mauzo Total
                                </th>
                                <th className="px-4 py-3 text-center">
                                    Control Numbers
                                </th>
                                <th className="px-4 py-3 text-right">
                                    Control Number Total
                                </th>
                                <th className="px-4 py-3 text-right">
                                    Grand Total
                                </th>
                                <th className="px-4 py-3 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredReports.map((row) => (
                                <tr
                                    key={`${row.user_id}-${row.date}`}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                        {row.date}
                                    </td>
                                    <td className="px-4 py-3 text-gray-800">
                                        {row.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 capitalize">
                                            {row.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-600">
                                        {money(row.daily_sales)}
                                    </td>
                                    <td className="px-4 py-3 text-center text-gray-600">
                                        {row.control_number_count}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-600">
                                        {money(row.control_number_total)}
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold text-gray-900 whitespace-nowrap">
                                        {money(row.grand_total)} TSH
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => openModal(row)}
                                            className="text-blue-600 font-medium hover:text-blue-800"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Cards - below sm */}
                <div className="sm:hidden space-y-3">
                    {filteredReports.map((row) => (
                        <div
                            key={`${row.user_id}-${row.date}`}
                            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
                        >
                            <div className="flex justify-between items-start gap-2 mb-3">
                                <span className="text-xs text-gray-400">
                                    {row.date}
                                </span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 capitalize">
                                    {row.role}
                                </span>
                            </div>

                            <div className="font-medium text-gray-800 mb-2">
                                {row.name}
                            </div>

                            <div className="flex justify-between items-center py-1.5 border-t border-gray-100">
                                <span className="text-sm text-gray-500">
                                    Mauzo Total
                                </span>
                                <span className="text-sm text-gray-800">
                                    {money(row.daily_sales)}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-1.5 border-t border-gray-100">
                                <span className="text-sm text-gray-500">
                                    Control Numbers
                                </span>
                                <span className="text-sm text-gray-800">
                                    {row.control_number_count} (
                                    {money(row.control_number_total)})
                                </span>
                            </div>

                            <div className="flex justify-between items-center pt-2 mt-1 border-t border-gray-100">
                                <div>
                                    <div className="text-xs text-gray-500">
                                        Grand Total
                                    </div>
                                    <div className="font-semibold text-gray-900">
                                        {money(row.grand_total)} TSH
                                    </div>
                                </div>
                                <button
                                    onClick={() => openModal(row)}
                                    className="text-blue-600 text-sm font-medium hover:text-blue-800"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredReports.length === 0 && (
                    <h1 className="mt-10 font-semibold text-center">
                        No Reports Found
                    </h1>
                )}

                {selectedRow && (
                    <Dialog
                        open={Boolean(selectedRow)}
                        onOpenChange={closeModal}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="border-b border-gray-200 pb-4">
                                    {selectedRow.name} &mdash;{" "}
                                    {selectedRow.date}
                                </DialogTitle>
                                <DialogDescription>
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-2">
                                                Mauzo Submissions
                                            </h3>
                                            {selectedRow.daily_sales_entries
                                                .length > 0 ? (
                                                <div className="space-y-2">
                                                    {selectedRow.daily_sales_entries.map(
                                                        (entry, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center justify-between border-b border-gray-100 py-2"
                                                            >
                                                                <span className="text-sm text-gray-600">
                                                                    {
                                                                        entry.time
                                                                    }
                                                                </span>
                                                                <span className="text-sm text-gray-800">
                                                                    {money(
                                                                        entry.amount
                                                                    )}{" "}
                                                                    TSH
                                                                </span>
                                                                {entry.image ? (
                                                                    <img
                                                                        src={`/storage/${entry.image}`}
                                                                        alt="Sales proof"
                                                                        className="w-10 h-10 object-cover rounded"
                                                                    />
                                                                ) : (
                                                                    <span className="text-xs text-gray-400">
                                                                        picha
                                                                        haipo
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-400">
                                                    Hakuna mauzo yaliyowasilishwa
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-2">
                                                Control Numbers
                                            </h3>
                                            {selectedRow.control_numbers
                                                .length > 0 ? (
                                                <div className="space-y-2">
                                                    {selectedRow.control_numbers.map(
                                                        (control, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex justify-between border-b border-gray-100 py-2"
                                                            >
                                                                <span className="text-sm text-gray-600">
                                                                    {
                                                                        control.control_number
                                                                    }
                                                                </span>
                                                                <span className="text-sm text-gray-800">
                                                                    {money(
                                                                        control.amount
                                                                    )}{" "}
                                                                    TSH
                                                                </span>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-400">
                                                    Hakuna control number
                                                    zilizowasilishwa
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            onClick={closeModal}
                                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    );
};

export default ReportSummaryTable;
