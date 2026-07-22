import { router } from "@inertiajs/react";

// Footer for server-paginated (Laravel paginator) lists: renders Prev/page-number/Next
// buttons from the paginator's `links` array and navigates via a partial Inertia reload.
const PaginationLinks = ({ meta }) => {
    if (!meta || meta.last_page <= 1) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
            <p className="text-sm text-gray-500">
                Showing {meta.from ?? 0}-{meta.to ?? 0} of {meta.total}
            </p>
            <div className="flex items-center gap-1 flex-wrap">
                {meta.links.map((link, i) => (
                    <button
                        key={i}
                        type="button"
                        disabled={!link.url}
                        onClick={() =>
                            link.url &&
                            router.get(
                                link.url,
                                {},
                                { preserveScroll: true, preserveState: true }
                            )
                        }
                        className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
                            link.active
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        } ${
                            !link.url
                                ? "opacity-40 cursor-not-allowed"
                                : "cursor-pointer"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
};

export default PaginationLinks;
