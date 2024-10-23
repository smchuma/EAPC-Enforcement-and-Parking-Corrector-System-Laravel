import { IoMdNotificationsOutline } from "react-icons/io";
import ApplicationLogo from "./ApplicationLogo";
import ProfileAvatar from "./ProfileAvatar";
import NavLinks from "./NavLinks";

const HomeNav = () => {
    return (
        <nav className="flex items-center justify-between px-5 bg-gray-50 rounded-lg py-5 fixed w-full md:w-[80%] top-0 shadow-lg z-[50] ">
            <div className="flex items-center">
                <div className="flex gap-x-2 items-center">
                    {/* <SidebarDrawer /> */}
                    <ApplicationLogo className=" text-xl lobster-regular text-blue-500 font-semibold" />
                </div>
                <NavLinks />
            </div>
            <div className="flex justify-between items-center cursor-pointer">
                <div className="bg-white shadow-md mr-2 p-2 rounded-full">
                    <IoMdNotificationsOutline size={24} />
                </div>
                <ProfileAvatar />
            </div>
        </nav>
    );
};

export default HomeNav;
