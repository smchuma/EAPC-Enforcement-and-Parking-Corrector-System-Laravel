import { Link, usePage } from "@inertiajs/react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useState, useEffect } from "react";

const SidebarItem = ({ item, onNavigate }) => {
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
        <div className="w-full px-3 mb-1">
            {item.subItems ? (
                // Main item with dropdown functionality
                <div
                    onClick={toggleDropdown}
                    className={`flex justify-between items-center gap-2 w-full rounded-lg px-3 py-3 cursor-pointer transition-colors
                    ${
                        isActive
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <span
                            className={
                                isActive ? "text-white" : "text-blue-500"
                            }
                        >
                            {item.icon}
                        </span>
                        <span className="text-sm font-medium">
                            {item.name}
                        </span>
                    </div>
                    {isOpen ? (
                        <RiArrowUpSLine size={16} />
                    ) : (
                        <RiArrowDownSLine size={16} />
                    )}
                </div>
            ) : (
                // Regular item without dropdown
                <Link
                    href={item.link}
                    className="block w-full"
                    onClick={onNavigate}
                >
                    <div
                        className={`flex items-center gap-3 w-full rounded-lg px-3 py-3 cursor-pointer transition-colors
                        ${
                            isActive
                                ? "bg-blue-600 text-white shadow-sm"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                    >
                        <span
                            className={
                                isActive ? "text-white" : "text-blue-500"
                            }
                        >
                            {item.icon}
                        </span>
                        <span className="text-sm font-medium">
                            {item.name}
                        </span>
                    </div>
                </Link>
            )}

            {/* Render dropdown links if item has subItems and is open */}
            {isOpen && item.subItems && (
                <div className="pl-9 mt-1 space-y-1">
                    {item.subItems.map((subItem) => {
                        const isSubActive = url === subItem.link;
                        return (
                            <Link
                                key={subItem.id}
                                href={subItem.link}
                                onClick={onNavigate}
                                className={`block py-2 px-3 rounded-md text-sm transition-colors ${
                                    isSubActive
                                        ? "text-blue-600 font-medium bg-blue-50"
                                        : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                                }`}
                            >
                                {subItem.name}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SidebarItem;
