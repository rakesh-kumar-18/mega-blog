import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

type Props = {
    children: string | JSX.Element | JSX.Element[];
    authentication: boolean;
};

function AuthLayout({ children, authentication = true }: Props) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useAppSelector(state => state.auth.status);

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login");
        } else if (!authentication && authStatus !== authentication) {
            navigate("/login");
        }
        setLoader(false);
    }, [authStatus, authentication, navigate]);

    return loader ? <h1>Loading...</h1> : <div>{children}</div>;
}

export default AuthLayout;