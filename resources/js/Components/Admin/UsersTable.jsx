import React, { useEffect, useState } from "react";
import TextInput from "../TextInput";

import { CiSearch } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { GiPencil } from "react-icons/gi";
import { GrNext, GrPrevious } from "react-icons/gr";

const UsersTable = ({ users }) => {
    const [search, setSearch] = useState("");

    const [filteredData, setFilteredData] = useState(users);

    useEffect(() => {
        setFilteredData(
            users.filter(
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
                            <th className="py-4">First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((user) => (
                            <tr
                                key={user.id}
                                className="border-2 border-gray-200"
                            >
                                <td className="text-center border-r-2 border-gray-200 p-3">
                                    {user.first_name}
                                </td>
                                <td className="text-center border-r-2 border-gray-200 p-3">
                                    {user.last_name}
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

                                <td className="text-center border-r-2 border-gray-200 ">
                                    <button>
                                        <GiPencil
                                            className="mr-4"
                                            onClick={() => onRowClick(user)}
                                        />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteClick(user);
                                        }}
                                    >
                                        <FaTrashAlt className="text-red-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* {filteredData.length == 0 && (
                <h1 className="text-center my-5">No User Found</h1>
            )} */}
                {/* <div className="flex justify-between  items-center gap-x-5 mt-5 mb-32">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="cursor-pointer"
                >
                    <GrPrevious />
                </button>
                <span>
                    Page {page} of {users.last_page}
                </span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === users.last_page}
                    className="cursor-pointer"
                >
                    <GrNext />
                </button>
            </div> */}
            </div>
        </main>
    );
};

export default UsersTable;
