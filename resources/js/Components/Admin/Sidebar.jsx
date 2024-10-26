import { MdDashboard } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import SidebarItem from "./SidebarItem";
import ApplicationLogo from "../ApplicationLogo";
import { FaUsers } from "react-icons/fa";

const Sidebar = () => {
    const sidebarItem = [
        {
            id: 1,
            name: "Dashboard",
            icon: <MdDashboard size={20} />,
            link: "/admin/dashboard",
        },
        {
            id: 2,
            name: "Reports",
            icon: <BiSolidReport size={20} />,
            link: "/admin/reports",
        },

        {
            id: 3,
            name: "Users",
            icon: <FaUsers size={20} />,
            link: "/admin/users",
        },
    ];

    return (
        <main className="bg-white invisible lg:visible fixed w-72 h-full top-0 shadow-md rounded-2xl pt-10">
            <div className="flex justify-center items-center flex-col">
                <ApplicationLogo className="mb-10 text-2xl lobster-regular text-gray-500 " />
                {sidebarItem.map((item) => (
                    <SidebarItem key={item.id} item={item} />
                ))}
            </div>
        </main>
    );
};

export default Sidebar;