import Footer from '@src/components/Footer'
import NavBar from '@src/components/NavBar'
import { ReactNode } from 'react';
import { ScrollRestoration } from 'react-router-dom';

const NavLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section>
            <NavBar />
            {children}
            <ScrollRestoration />
            <Footer />
        </section>
    )
}

export default NavLayout