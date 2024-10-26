import { useState } from "react";
import TextInput from "../TextInput";
import { CiSearch } from "react-icons/ci";
import PrimaryButton from "../PrimaryButton";

const ReportTable = ({ reports }) => {
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
        <main>
            <div className="flex flex-col px-5 ">
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex justify-end items-center mt-5 lg:mt-0 px-5 lg:px-2 border border-gray-500 rounded-lg w-full lg:w-64">
                        <CiSearch size={25} />
                        <TextInput
                            type="date"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                            placeholder="Search userss..."
                            className=" border-0 bg-transparent placeholder:text-gray-600 w-full outline-none focus:ring-0"
                        />
                    </div>
                    <PrimaryButton className="py-3" onClick={handleSearch}>
                        Search
                    </PrimaryButton>
                    <PrimaryButton
                        className="py-3 bg-gray-800 hover:bg-gray-800 "
                        onClick={handleClear}
                    >
                        Clear
                    </PrimaryButton>
                </div>
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-blue-700 text-white">
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Full Name</th>
                            <th className="border p-2">Role</th>
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
                                    {report.user.first_name}{" "}
                                    {report.user.last_name}
                                </td>
                                <td className="border p-3 text-center">
                                    {report.user.role}
                                </td>
                                <td className="border p-3 text-center">
                                    {report.daily_sales}
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
                                                total +
                                                parseFloat(control.amount),
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
                {filteredReports.length === 0 && (
                    <h1 className="mt-10 font-semibold text-center">
                        No Reports Found
                    </h1>
                )}
            </div>
        </main>
    );
};

export default ReportTable;
