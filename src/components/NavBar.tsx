import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid"

const NavBar = () => {
    return (
        <nav className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <Bars3CenterLeftIcon className="h-6 w-6" />
                    </div>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li><a>Item 3</a></li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost">Sign In</button>
                <a className="btn">Sign In</a>
            </div>
        </nav>
    )
}

export default NavBar;