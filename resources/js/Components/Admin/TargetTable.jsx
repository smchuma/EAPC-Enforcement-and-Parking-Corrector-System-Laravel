import React, { useEffect, useState } from "react";
import TextInput from "../TextInput";
import { CiSearch } from "react-icons/ci";
import { FaEllipsisVertical } from "react-icons/fa6";
import EditUser from "./EditUser";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import AddTarget from "./AddTarget";

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
            <div className="flex flex-col px-5 pt-14 ">
                <div className="flex justify-end items-center mt-5 lg:mt-0 mb-4 px-5 lg:px-2 border border-gray-500 rounded-lg w-full lg:w-80">
                    <CiSearch size={25} />
                    <TextInput
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search userss..."
                        className=" border-0 bg-transparent placeholder:text-gray-600 w-full lg:w-80 outline-none focus:ring-0"
                    />
                </div>
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-blue-700 text-white">
                            <th className="py-4 pl-2">Full Name</th>
                            <th className="py-4 pl-2">Role</th>
                            <th>Street</th>
                            <th>Target</th>
                            <th>Control Number Target</th>
                            <th className="pr-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((user) => (
                            <tr
                                key={user.id}
                                className="border-2 border-gray-200"
                            >
                                <td className="text-center border-r-2 border-gray-200 p-4">
                                    {user.first_name} {user.last_name}
                                </td>
                                <td className="text-center border-r-2 border-gray-200 p-3">
                                    {user.role}
                                </td>
                                <td className="text-center border-r-2 border-gray-200 p-3">
                                    {user.street || "N/A"}
                                </td>
                                <td className="text-center border-r-2 border-gray-200 p-3">
                                    {user.target || "N/A"}
                                </td>

                                <td className="text-center border-r-2 border-gray-200">
                                    {user.control_number_target || "N/A"}
                                </td>

                                <td className="flex justify-center mt-4 text-gray-500 border-r-2 border-gray-200 cursor-pointer ">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <FaEllipsisVertical />
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredData.length == 0 && (
                    <h1 className="text-center my-5">No User Found</h1>
                )}
            </div>
        </main>
    );
};

export default TargetTable;
