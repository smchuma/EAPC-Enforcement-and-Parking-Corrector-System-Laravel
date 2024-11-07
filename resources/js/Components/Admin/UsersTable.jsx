import React, { useEffect, useState } from "react";
import TextInput from "../TextInput";
import { CiSearch } from "react-icons/ci";
import { FaEllipsisVertical } from "react-icons/fa6";
import { BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import { useForm } from "@inertiajs/react";
import EditUser from "./EditUser";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UsersTable = ({ users }) => {
    const [search, setSearch] = useState("");

    const [filteredData, setFilteredData] = useState(users.data);
    const { delete: destroy } = useForm();
    const [open, setOpen] = useState(false);

    // delete a user

    const handleDelete = (user) => {
        Swal.fire({
            title: `${user.first_name} ${user.last_name}`,
            text: `Are you sure you want to delete this user`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("admin.destroy_user", user.id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        setFilteredData(
                            filteredData.filter((v) => v.id !== user.id)
                        );
                    },
                });
                Swal.fire("Deleted!", "The user  has been deleted.", "success");
            }
        });
    };

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
                                    {user.phone_number}
                                </td>
                                <td className="text-center border-r-2 border-gray-200">
                                    {user.email}
                                </td>
                                <td className="text-center border-r-2 border-gray-200">
                                    {user.role}
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
                                                <EditUser
                                                    open={open}
                                                    setOpen={setOpen}
                                                    user={user}
                                                />
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuLabel
                                                className="hover:bg-gray-100 cursor-pointer w-full"
                                                onClick={(e) => {
                                                    handleDelete(user);
                                                }}
                                            >
                                                <div className="flex items-center gap-x-2 text-red-600">
                                                    <BsTrash />
                                                    Delete
                                                </div>
                                            </DropdownMenuLabel>
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

export default UsersTable;
