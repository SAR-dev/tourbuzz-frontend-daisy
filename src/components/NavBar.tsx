import { Link } from "react-router-dom";
import SignInButton from "./SignInButton";
import ThemeSwitcher from "./ThemeSwitcher";

const NavBar = () => {
    return (
        <div className="backdrop-blur-sm bg-base-100/80 border-b border-base-300/50 sticky top-0 z-10">
            <div className="container mx-auto px-10">
                <nav className="navbar">
                    <div className="navbar-start">
                        <Link to="/" className="text-xl font-semibold">🤖 TourBuzz</Link>
                    </div>
                    <div className="navbar-center flex">
                        <ul className="menu menu-horizontal px-1 gap-1 font-semibold">
                            <li><a>Tours</a></li>
                            <li><a>Organizers</a></li>
                            <li><a>Hotels</a></li>
                            <li><a>Places</a></li>
                            <li><a>Articles</a></li>
                        </ul>
                    </div>
                    <div className="navbar-end gap-1">
                        <ThemeSwitcher />
                        <SignInButton />
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default NavBar;