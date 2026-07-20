import { MdDashboard } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import SidebarItem from "./SidebarItem";
import ApplicationLogo from "../ApplicationLogo";
import { FaUsers } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";

const Sidebar = ({ isOpen, onClose }) => {
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
            subItems: [
                { id: "2a", name: "Full Reports", link: "/admin/full-report" },
                {
                    id: "2b",
                    name: "Target Reports",
                    link: "/admin/target-reports",
                },
            ],
        },

        {
            id: 4,
            name: "Target",
            icon: <FiTarget size={20} />,
            link: "/admin/targets",
        },
        {
            id: 5,
            name: "Users",
            icon: <FaUsers size={20} />,
            link: "/admin/users",
        },
    ];

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}
            <main
                className={`bg-white fixed w-72 max-w-[80%] h-full top-0 shadow-md rounded-r-2xl lg:rounded-2xl pt-8 z-50 overflow-y-auto transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <div className="flex flex-col">
                    <div className="flex justify-center pb-6 mb-4 border-b border-gray-100">
                        <ApplicationLogo className="text-2xl font-bold text-blue-600" />
                    </div>
                    {sidebarItem.map((item) => (
                        <SidebarItem
                            key={item.id}
                            item={item}
                            onNavigate={onClose}
                        />
                    ))}
                </div>
            </main>
        </>
    );
};

export default Sidebar;
