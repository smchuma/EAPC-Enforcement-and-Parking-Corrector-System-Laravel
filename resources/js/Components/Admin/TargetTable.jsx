import React, { useEffect, useState } from "react";
import TextInput from "../TextInput";
import { CiSearch } from "react-icons/ci";
import { FaEllipsisVertical } from "react-icons/fa6";
import EditUser from "./EditUser";
import PaginationLinks from "../PaginationLinks";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import AddTarget from "./AddTarget";
import { formatNumber } from "@/lib/formatNumber";

const TargetTable = ({ users }) => {
    const [search, setSearch] = useState("");

    const [filteredData, setFilteredData] = useState(users.data);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setFilteredData(
            users.data
                .filter(
                    (user) =>
                        (user.role === "enforcement" ||
                            user.role === "collector") &&
                        (user.first_name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                            user.last_name
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            user.phone_number
                                .toLowerCase()
                                .includes(search.toLowerCase()))
                )
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        );
    }, [search, users.data]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <main>
            <div className="flex flex-col px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-end items-center mb-4 px-3 border border-gray-300 rounded-lg w-full sm:w-80 bg-white">
                    <CiSearch size={20} className="text-gray-400" />
                    <TextInput
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search userss..."
                        className="border-0 shadow-none bg-transparent placeholder:text-gray-600 w-full outline-none focus:ring-0"
                    />
                </div>
                <div className="hidden sm:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase tracking-wide">
                            <th className="px-4 py-3 text-left">Full Name</th>
                            <th className="px-4 py-3 text-left">Role</th>
                            <th className="px-4 py-3 text-left">Street</th>
                            <th className="px-4 py-3 text-right">Target</th>
                            <th className="px-4 py-3 text-right">
                                Control Number Target
                            </th>
                            <th className="px-4 py-3 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredData.map((user) => (
                            <tr
                                key={user.id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-4 py-3 text-gray-800">
                                    {user.first_name} {user.last_name}
                                </td>
                                <td className="px-4 py-3">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 capitalize">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-600">
                                    {user.street || "N/A"}
                                </td>
                                <td className="px-4 py-3 text-right text-gray-600">
                                    {formatNumber(user.target)}
                                </td>

                                <td className="px-4 py-3 text-right text-gray-600">
                                    {formatNumber(user.control_number_target)}
                                </td>

                                <td className="px-4 py-3 text-gray-500">
                                    <div className="flex justify-center cursor-pointer">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <FaEllipsisVertical />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel
                                                    className="hover:bg-gray-100 cursor-pointer w-full"
                                                    onClick={(e) =>
                                                        setOpen(true)
                                                    }
                                                >
                                                    <AddTarget
                                                        open={open}
                                                        setOpen={setOpen}
                                                        user={user}
                                                    />
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>

                {/* Cards - below sm, tables don't fit phone screens well */}
                <div className="sm:hidden space-y-3">
                    {filteredData.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
                        >
                            <div className="flex justify-between items-start gap-2 mb-2">
                                <span className="font-medium text-gray-800">
                                    {user.first_name} {user.last_name}
                                </span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 capitalize shrink-0">
                                    {user.role}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-1.5 border-t border-gray-100">
                                <span className="text-sm text-gray-500">
                                    Street
                                </span>
                                <span className="text-sm text-gray-800">
                                    {user.street || "N/A"}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-1.5 border-t border-gray-100">
                                <span className="text-sm text-gray-500">
                                    Target
                                </span>
                                <span className="text-sm text-gray-800">
                                    {formatNumber(user.target)}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-1.5 border-t border-gray-100">
                                <span className="text-sm text-gray-500">
                                    Control Number Target
                                </span>
                                <span className="text-sm text-gray-800">
                                    {formatNumber(user.control_number_target)}
                                </span>
                            </div>

                            <div className="flex justify-end items-center pt-2 mt-1 border-t border-gray-100">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                            <FaEllipsisVertical />
                                            Actions
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel
                                            className="hover:bg-gray-100 cursor-pointer w-full"
                                            onClick={(e) => setOpen(true)}
                                        >
                                            <AddTarget
                                                open={open}
                                                setOpen={setOpen}
                                                user={user}
                                            />
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </div>
                {filteredData.length == 0 && (
                    <h1 className="text-center my-5">No User Found</h1>
                )}

                <PaginationLinks meta={users} />
            </div>
        </main>
    );
};

export default TargetTable;
