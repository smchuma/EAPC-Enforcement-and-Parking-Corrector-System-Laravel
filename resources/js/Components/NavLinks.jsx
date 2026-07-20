import { Link, usePage } from "@inertiajs/react";

const NavLinks = () => {
    const { url, component } = usePage();
    const navLinks = [
        { name: "Target", path: "/" },
        { name: "Ripoti", path: "/ripoti" },
    ];
    return (
        <div className="pt-2 mt-1 border-t border-gray-200 sm:pt-0 sm:mt-0 sm:border-t-0 sm:ml-10 flex gap-x-1 sm:gap-x-2">
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.path}
                    className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                        url === link.path
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-700 hover:text-blue-500"
                    }`}
                >
                    {link.name}
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;
