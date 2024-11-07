import { Link, usePage } from "@inertiajs/react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useState, useEffect } from "react";

const SidebarItem = ({ item }) => {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);

    // Check if the current URL matches the main link or any sub-item link to keep the dropdown open
    const isActive =
        url === item.link ||
        (item.subItems &&
            item.subItems.some((subItem) => url === subItem.link));

    // Set dropdown open state based on whether the current URL is in sub-items
    useEffect(() => {
        if (item.subItems) {
            setIsOpen(isActive);
        }
    }, [url, item.subItems, isActive]);

    const toggleDropdown = () => {
        // Only allow manual toggle if not currently active on any sub-item
        if (!isActive) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className="w-full">
            {item.subItems ? (
                // Main item with dropdown functionality
                <div
                    onClick={toggleDropdown}
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
                        <div>{item.name}</div>
                    </div>
                    {isOpen ? (
                        <RiArrowUpSLine className="mr-2" />
                    ) : (
                        <RiArrowDownSLine className="mr-2" />
                    )}
                </div>
            ) : (
                // Regular item without dropdown
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
                            <div>{item.name}</div>
                        </div>
                    </div>
                </Link>
            )}

            {/* Render dropdown links if item has subItems and is open */}
            {isOpen && item.subItems && (
                <div className="pl-8">
                    {item.subItems.map((subItem) => (
                        <Link
                            key={subItem.id}
                            href={subItem.link}
                            className="block py-2 text-gray-700 hover:text-blue-500"
                        >
                            {subItem.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SidebarItem;
