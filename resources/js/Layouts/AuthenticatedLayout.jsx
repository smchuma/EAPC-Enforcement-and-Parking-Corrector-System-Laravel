import { useState } from "react";

import Dropdown from "@/Components/Dropdown";
import HomeNav from "@/Components/HomeNav";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="md:w-[80%] mx-auto">
                <HomeNav />
                <main>{children}</main>
            </div>
        </div>
    );
}
