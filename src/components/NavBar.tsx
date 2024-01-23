import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid"
import ThemeSwitcher from "./ThemeSwitcher";

const NavBar = () => {
    return (
        <div className="bg-base-200">
            <div className="container mx-auto px-5">
                <nav className="navbar">
                    <div className="navbar-start">
                        <button className="btn btn-ghost">
                            <Bars3CenterLeftIcon className="h-6 w-6" />
                        </button>
                        <div className="text-xl font-semibold ml-1">TourBuzz</div>
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
            </div>
        </div>
    )
}

export default NavBar;