import Footer from '@src/components/Footer'
import NavBar from '@src/components/NavBar'
import { NavbarType } from '@src/enums/NavbarType';
import { ReactNode } from 'react';
import { ScrollRestoration } from 'react-router-dom';

const NavLayout = ({ type, children }: { type?: NavbarType, children: ReactNode }) => {
    return (
        <section>
            <NavBar type={type} />
            <div className="min-h-screen">
                {children}
            </div>
            <ScrollRestoration />
            <Footer />
        </section>
    )
}

export default NavLayout