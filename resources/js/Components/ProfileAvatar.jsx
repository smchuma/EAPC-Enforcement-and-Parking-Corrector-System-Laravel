import { usePage } from "@inertiajs/react";
import Dropdown from "./Dropdown";
import { Avatar, AvatarFallback } from "./ui/avatar";

const ProfileAvatar = () => {
    const { auth } = usePage().props;

    const user = auth?.user;

    const initials = user
        ? `${user.first_name?.[0]?.toUpperCase() || ""}${
              user.last_name?.[0]?.toUpperCase() || ""
          }`
        : "CN";

    return (
        <main>
            <Dropdown>
                <Dropdown.Trigger>
                    <Avatar className="border-[3px] bg-gray-200 flex items-center justify-center">
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Dropdown.Trigger>

                <Dropdown.Content>
                    <Dropdown.Link href={route("profile.edit")}>
                        Profile
                    </Dropdown.Link>
                    <Dropdown.Link
                        href={route("logout")}
                        method="post"
                        as="button"
                    >
                        Log Out
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
        </main>
    );
};

export default ProfileAvatar;
