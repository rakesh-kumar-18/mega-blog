type Props = {
    children: string | JSX.Element | JSX.Element[];
};

function Container({ children }: Props) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4">{children}</div>
    );
}

export default Container;