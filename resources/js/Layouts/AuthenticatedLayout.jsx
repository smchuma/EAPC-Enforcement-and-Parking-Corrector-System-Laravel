import { useState } from "react";

import Dropdown from "@/Components/Dropdown";
import HomeNav from "@/Components/HomeNav";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100">
            <div className="md:w-[80%] mx-auto">
                <HomeNav />
                <main>{children}</main>
            </div>
        </div>
    );
}
