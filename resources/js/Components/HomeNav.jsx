import { IoMdNotificationsOutline } from "react-icons/io";
import ApplicationLogo from "./ApplicationLogo";
import ProfileAvatar from "./ProfileAvatar";
import NavLinks from "./NavLinks";

const HomeNav = () => {
    return (
        <nav className="flex flex-wrap items-center gap-y-2 px-3 sm:px-5 bg-gray-50 rounded-lg py-3 sm:py-5 fixed w-full md:w-[80%] top-0 shadow-lg z-[50] ">
            <ApplicationLogo className="order-1 text-lg sm:text-xl lobster-regular text-blue-600 font-semibold shrink-0" />

            <div className="order-3 sm:order-2 w-full sm:w-auto">
                <NavLinks />
            </div>

            <div className="order-2 sm:order-3 ml-auto flex items-center cursor-pointer shrink-0">
                <div className="bg-white shadow-md mr-2 p-2 rounded-full">
                    <IoMdNotificationsOutline size={20} />
                </div>
                <ProfileAvatar />
            </div>
        </nav>
    );
};

export default HomeNav;
