import React, { useEffect, useState } from "react";
import TextInput from "../TextInput";
import { CiSearch } from "react-icons/ci";
import { FaEllipsisVertical } from "react-icons/fa6";

const UsersTable = ({ users }) => {
    const [search, setSearch] = useState("");

    const [filteredData, setFilteredData] = useState(users);

    useEffect(() => {
        setFilteredData(
            users
                .filter(
                    (user) =>
                        user.first_name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        user.last_name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        user.phone_number
                            .toLowerCase()
                            .includes(search.toLowerCase())
                )
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        );
    }, [search, users]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <main>
            <div className="flex flex-col px-5 ">
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
                            <th className="py-4 pl-2">First Name</th>
                            <th>Last Name</th>
                            <th>Target</th>
                            <th>Control Number Target</th>
                            <th>Mtaa</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Role</th>
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
                                    {user.first_name}
                                </td>
                                <td className="text-center border-r-2 border-gray-200 p-3">
                                    {user.last_name}
                                </td>
                                <td className="text-center border-r-2 border-gray-200 p-3">
                                    {user.target === null ? "N/A" : user.target}
                                </td>
                                <td className="text-center border-r-2 border-gray-200 p-3">
                                    {user.target === null
                                        ? "N/A"
                                        : user.control_number_target}
                                </td>
                                <td className="text-center border-r-2 border-gray-200 p-3">
                                    {user.street === null ? "N/A" : user.street}
                                </td>
                                <td className="text-center border-r-2 border-gray-200 p-3">
                                    {user.phone_number}
                                </td>
                                <td className="text-center border-r-2 border-gray-200">
                                    {user.email}
                                </td>
                                <td className="text-center border-r-2 border-gray-200">
                                    {user.role}
                                </td>

                                <td className="flex justify-center mt-4 text-gray-500 border-r-2 border-gray-200 ">
                                    <FaEllipsisVertical />
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

export default UsersTable;
