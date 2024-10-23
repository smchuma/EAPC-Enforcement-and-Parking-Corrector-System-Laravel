import { Link, usePage } from "@inertiajs/react";

const NavLinks = () => {
    const { url, component } = usePage();
    const navLinks = [
        { name: "Target", path: "/" },
        { name: "Ripoti", path: "/ripoti" },
    ];
    return (
        <div className="ml-10 flex gap-x-2 ham-reverse">
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
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
