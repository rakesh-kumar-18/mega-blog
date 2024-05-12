import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<'button'> {
    children: string | JSX.Element | JSX.Element[];
    type?: "button" | "submit" | "reset";
    bgColor?: string;
    textColor?: string;
    className?: string;
}

function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}: Props) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
            {...props}
        >{children}</button>
    );
}

export default Button;