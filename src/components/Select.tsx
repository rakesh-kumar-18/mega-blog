import { ComponentPropsWithoutRef, forwardRef, Ref, useId } from "react";

interface Props extends ComponentPropsWithoutRef<'select'> {
    label: string;
    options: Array<string>;
    className: string;
}

const Select = forwardRef(function Select(
    { label, options = [], className = "", ...props }: Props,
    ref: Ref<HTMLSelectElement>
) {
    const id = useId();

    return (
        <div className="w-full">
            {label && <label htmlFor={id}></label>}
            <select
                id={id}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                {...props}
                ref={ref}
            >
                {options?.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
        </div>
    );
});

export default Select;