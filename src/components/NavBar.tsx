import ThemeSwitcher from "./ThemeSwitcher";

const NavBar = () => {
    return (
        <div className="bg-base-100 border-b border-base-300 sticky top-0 z-10">
            <div className="container mx-auto px-5">
                <nav className="navbar">
                    <div className="navbar-start">
                        <div className="text-xl font-semibold">TourBuzz</div>
                    </div>
                    <div className="navbar-center flex">
                        <ul className="menu menu-horizontal px-1 font-semibold">
                            <li><a>Tours</a></li>
                            <li><a>Organizers</a></li>
                            <li><a>Hotels</a></li>
                            <li><a>Places</a></li>
                            <li><a>Articles</a></li>
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <ThemeSwitcher />
                        <a className="btn">Sign In</a>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default NavBar;