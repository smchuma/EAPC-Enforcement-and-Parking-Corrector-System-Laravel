// Client-side pagination footer for lists that are computed/filtered in the
// browser (aggregated or grouped data with no Laravel paginator behind it).
const Pagination = ({ page, totalPages, total, perPage, onPageChange }) => {
    if (totalPages <= 1) return null;

    const from = (page - 1) * perPage + 1;
    const to = Math.min(page * perPage, total);

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
            <p className="text-sm text-gray-500">
                Showing {from}-{to} of {total}
            </p>
            <div className="flex items-center gap-1 flex-wrap">
                <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    className={`px-3 py-1.5 rounded-md text-sm border transition-colors bg-white text-gray-600 border-gray-200 hover:bg-gray-50 ${
                        page === 1
                            ? "opacity-40 cursor-not-allowed"
                            : "cursor-pointer"
                    }`}
                >
                    Previous
                </button>
                {pages.map((p) => (
                    <button
                        key={p}
                        type="button"
                        onClick={() => onPageChange(p)}
                        className={`px-3 py-1.5 rounded-md text-sm border transition-colors cursor-pointer ${
                            p === page
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                        {p}
                    </button>
                ))}
                <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className={`px-3 py-1.5 rounded-md text-sm border transition-colors bg-white text-gray-600 border-gray-200 hover:bg-gray-50 ${
                        page === totalPages
                            ? "opacity-40 cursor-not-allowed"
                            : "cursor-pointer"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
