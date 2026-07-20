import { forwardRef } from "react";

export default forwardRef(function SelectField(
    { className = "", children, ...props },
    ref
) {
    return (
        <select
            {...props}
            ref={ref}
            className={
                "border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm text-gray-700 " +
                className
            }
        >
            {children}
        </select>
    );
});
