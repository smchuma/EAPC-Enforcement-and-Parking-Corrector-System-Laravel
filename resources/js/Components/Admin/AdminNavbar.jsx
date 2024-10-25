import { IoMdNotificationsOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="flex justify-between lg:justify-end items-center fixed w-full lg:w-[calc(100%-20rem)] top-0 mt-5 px-8 lg:px-12 z-50 ">
            <GiHamburgerMenu size={24} className="visible lg:invisible" />
            <div className="flex justify-between items-center cursor-pointer">
                <div className="bg-white shadow-md mr-2 p-2 rounded-full">
                    <IoMdNotificationsOutline size={24} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
