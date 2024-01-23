import ThemeSwitcher from "./ThemeSwitcher";

const NavBar = () => {
    return (
        <nav className="navbar bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">TourBuzz</a>
            </div>
            <div className="navbar-center flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li><a>Item 3</a></li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <ThemeSwitcher />
                <a className="btn">Sign In</a>
            </div>
        </nav>
    )
}

export default NavBar;