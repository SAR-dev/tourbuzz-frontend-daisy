import { Link } from "react-router-dom";
import SignInButton from "./SignInButton";
import ThemeSwitcher from "./ThemeSwitcher";
import CartButton from "./CartButton";
import { NavbarType } from "@src/enums/NavbarType";

const NavBar = ({ type = NavbarType.MIX }: { type?: NavbarType }) => {
    return (
        <div className="backdrop-blur-sm bg-base-100/80 border-b border-base-300/50 sticky top-0 z-10">
            <div className="container mx-auto px-10">
                <nav className="navbar h-16">
                    <div className="navbar-start">
                        <Link to="/" className="text-xl font-semibold">🤖 TourBuzz</Link>
                    </div>
                    <div className="navbar-center flex">
                        {type === NavbarType.TOUR && (
                            <ul className="menu menu-horizontal px-1 gap-1 font-semibold">
                                <li className="active:bg-base-300"><Link to="/tours">Tours</Link></li>
                                <li className="active:bg-base-300"><Link to="/organizers">Organizers</Link></li>
                                <li className="active:bg-base-300"><Link to="/hotels" >Hotels</Link></li>
                                <li className="active:bg-base-300"><Link to="/places">Places</Link></li>
                                <li className="active:bg-base-300"><Link to="/articles">Articles</Link></li>
                            </ul>
                        )}
                        {type === NavbarType.SHOP && (
                            <ul className="menu menu-horizontal px-1 gap-1 font-semibold">
                                <label className="input h-10 input-bordered flex items-center gap-2">
                                    <input type="text" className="grow w-72 bg-transparent" placeholder="Search products..." />
                                    <kbd className="kbd kbd-sm">⌘</kbd>
                                    <kbd className="kbd kbd-sm">K</kbd>
                                </label>
                            </ul>
                        )}
                        {type === NavbarType.MIX && (
                            <ul className="flex px-1 gap-1 font-semibold">
                                <li className="btn btn-sm h-10 btn-ghost text-yellow-200 bg-red-500 hover:text-base-content"><Link to="/shop">Shop</Link></li>
                                <li className="btn btn-sm h-10 btn-ghost"><Link to="/tours">Tours</Link></li>
                                <li className="btn btn-sm h-10 btn-ghost"><Link to="/organizers">Organizers</Link></li>
                                <li className="btn btn-sm h-10 btn-ghost"><Link to="/hotels" >Hotels</Link></li>
                                <li className="btn btn-sm h-10 btn-ghost"><Link to="/places">Places</Link></li>
                                <li className="btn btn-sm h-10 btn-ghost"><Link to="/articles">Articles</Link></li>
                            </ul>
                        )}
                    </div>
                    <div className="navbar-end gap-1">
                        <CartButton />
                        <ThemeSwitcher />
                        <SignInButton />
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default NavBar;