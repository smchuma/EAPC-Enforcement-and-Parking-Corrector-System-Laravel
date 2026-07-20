import { IoMdNotificationsOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import ProfileAvatar from "../ProfileAvatar";
import { usePage } from "@inertiajs/react";

const AdminNavbar = ({ onMenuClick }) => {
    const title = usePage().component;
    const pageTitle = title.split("/")[1];

    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm flex justify-between px-4 items-center py-3.5 fixed top-0 w-full lg:w-[calc(100%-18rem)] z-[50]">
            <div className="flex gap-x-3 items-center min-w-0">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden shrink-0 text-gray-600 hover:text-blue-600"
                    aria-label="Open menu"
                >
                    <GiHamburgerMenu size={22} />
                </button>
                <h1 className="truncate font-semibold text-lg text-gray-800">
                    {pageTitle}
                </h1>
            </div>
            <div className="flex justify-between items-center cursor-pointer shrink-0">
                <div className="bg-gray-50 hover:bg-gray-100 transition-colors mr-2 p-2 rounded-full text-gray-600">
                    <IoMdNotificationsOutline size={20} />
                </div>
                <ProfileAvatar />
            </div>
        </nav>
    );
};

export default AdminNavbar;
