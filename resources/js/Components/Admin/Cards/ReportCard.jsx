// Card.js
import { Link } from "@inertiajs/react";
import React from "react";

const ReportCard = ({ title, link }) => {
    return (
        <Link
            href={link}
            className="block p-5 border rounded-lg shadow-md hover:shadow-md hover:bg-gray-50 transition"
        >
            <h2 className="text-sm">{title}</h2>
        </Link>
    );
};

export default ReportCard;
