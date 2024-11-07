import { Link, usePage } from "@inertiajs/react";
import { RiArrowRightSLine } from "react-icons/ri";

const SidebarItem = ({ item }) => {
    const { url } = usePage();

    const isActive = url === item.link;

    return (
        <Link href={item.link} className="w-full">
            <div
                className={`flex justify-between hover:bg-blue-500 text-gray-900 hover:text-white mb-2 w-full p-3 py-4 gap-2 items-center cursor-pointer ease-in-out
        ${isActive ? "blu text-white" : ""}
        `}
            >
                <div className="flex">
                    <div
                        className={`px-3 pl-4 ${
                            isActive ? "" : "text-blue-400"
                        }`}
                    >
                        {item.icon}
                    </div>
                    <div className="">{item.name}</div>
                </div>
                <RiArrowRightSLine className="mr-2" />
            </div>
        </Link>
    );
};

export default SidebarItem;
