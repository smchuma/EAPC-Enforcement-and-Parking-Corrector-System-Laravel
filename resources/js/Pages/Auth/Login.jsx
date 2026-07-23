import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaRegUser, FaLock, FaXmark, FaEye, FaEyeSlash } from "react-icons/fa6";

export default function Login({ status, canResetPassword, error }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        remember: false,
    });
    const [isErrorVisible, setIsErrorVisible] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    const closeError = () => {
        setIsErrorVisible(false);
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="mb-6 text-center">
                <h1 className="text-xl font-semibold text-gray-800">
                    Welcome back
                </h1>
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600 text-center">
                    {status}
                </div>
            )}

            {isErrorVisible && error && (
                <div
                    className="mb-5 flex items-start justify-between gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                    role="alert"
                >
                    <span className="text-sm">{error}</span>
                    <button
                        type="button"
                        onClick={closeError}
                        className="text-red-400 hover:text-red-600 shrink-0"
                        aria-label="Dismiss"
                    >
                        <FaXmark size={16} />
                    </button>
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <div className="relative mt-1">
                        <FaRegUser
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={15}
                        />
                        <TextInput
                            id="username"
                            type="text"
                            name="username"
                            value={data.username}
                            className="block w-full pl-10 focus:border-blue-500 focus:ring-blue-500"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                        />
                    </div>

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <div className="relative mt-1">
                        <FaLock
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={15}
                        />
                        <TextInput
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={data.password}
                            className="block w-full pl-10 pr-10 focus:border-blue-500 focus:ring-blue-500"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <FaEyeSlash size={15} />
                            ) : (
                                <FaEye size={15} />
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-sm shadow-blue-500/30 transition disabled:opacity-50 mt-2"
                >
                    {processing ? "Signing in..." : "Log in"}
                </button>
            </form>
        </GuestLayout>
    );
}
