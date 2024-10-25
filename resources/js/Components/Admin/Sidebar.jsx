import { MdDashboard } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import SidebarItem from "./SidebarItem";
import ApplicationLogo from "../ApplicationLogo";

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
            name: "Report",
            icon: <BiSolidReport size={20} />,
            link: "/admin/report",
        },
        {
            id: 3,
            name: "Settings",
            icon: <IoMdSettings size={20} />,
            link: "/admin/settings",
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
