import { IoMdNotificationsOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import ProfileAvatar from "../ProfileAvatar";
import { usePage } from "@inertiajs/react";

const AdminNavbar = () => {
    const title = usePage().component;
    const pageTitle = title.split("/")[1];

    return (
        <nav className="bg-gray-100 shadow-md flex justify-between px-3 items-center py-3 fixed top-0 w-full lg:w-[calc(100%-18rem)] z-[50]">
            <div className="flex gap-x-2">
                <GiHamburgerMenu size={24} className="ham" />
                <h1>{pageTitle}</h1>
            </div>
            <div className="flex justify-between items-center cursor-pointer">
                <div className="bg-white shadow-md mr-2 p-2 rounded-full">
                    <IoMdNotificationsOutline size={20} />
                </div>
                <ProfileAvatar />
            </div>
        </nav>
    );
};

export default AdminNavbar;
