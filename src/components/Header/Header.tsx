import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

function Header() {
    const authStatus = useAppSelector(state => state.auth.status);
    const navigate = useNavigate();

    const navItems: Array<{
        name: string,
        slug: string,
        active: boolean;
    }> = [
            {
                name: "Home",
                slug: "/",
                active: true
            },
            {
                name: "Login",
                slug: "/login",
                active: !authStatus
            },
            {
                name: "Signup",
                slug: "/signup",
                active: !authStatus
            },
            {
                name: "All Posts",
                slug: "/all-posts",
                active: authStatus
            },
            {
                name: "Add Post",
                slug: "/add-post",
                active: authStatus
            }
        ];

    return (
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map(navItem => navItem.active ? <li key={navItem.name}>
                            <button
                                onClick={() => navigate(navItem.slug)}
                                className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                            >
                                {navItem.name}
                            </button>
                        </li> : null)}
                    </ul>
                    {authStatus && (
                        <li>
                            <LogoutBtn />
                        </li>
                    )}
                </nav>
            </Container>
        </header>
    );
}

export default Header;