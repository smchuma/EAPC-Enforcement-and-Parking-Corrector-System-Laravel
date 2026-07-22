import { Component } from "react";

// Catches JS errors thrown while rendering the React tree (e.g. a bug in a
// component) so the user sees a friendly message instead of a blank white
// page. Does NOT catch errors from event handlers, async code, or backend
// requests - those are handled separately (toasts, Inertia error pages).
export default class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Unhandled UI error:", error, info);
    }

    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        return (
            <div className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-[linear-gradient(135deg,#eff6ff_0%,#f8fafc_45%,#e0e7ff_100%)]">
                <div className="w-full max-w-md">
                    <div className="bg-white w-full flex items-center justify-center flex-col py-10 px-6 sm:px-10 shadow-xl shadow-gray-200/70 border border-gray-100 rounded-2xl text-center">
                        <h1 className="text-lg font-semibold text-gray-800 mb-2">
                            Something Went Wrong
                        </h1>
                        <p className="text-sm text-gray-500 mb-8">
                            An unexpected error occurred. Try reloading the
                            page - if it keeps happening, let an admin know.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg font-semibold text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
