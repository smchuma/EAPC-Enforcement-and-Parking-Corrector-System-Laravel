import { Link, usePage } from "@inertiajs/react";

const SidebarItem = ({ item }) => {
    const { url } = usePage();

    const isActive = url === item.link;

    return (
        <Link href={item.link} className="w-full">
            <div
                className={`flex bg-gray-100 hover:bg-blue-500 text-gray-900 hover:text-white mb-2 w-full p-3 gap-2 items-center cursor-pointer ease-in-out
        ${isActive ? "bg-blue-600 text-white" : ""}
        `}
            >
                <div className=" ">{item.icon}</div>
                <div className="">{item.name}</div>
            </div>
        </Link>
    );
};

export default SidebarItem;
