import Footer from '@src/components/Footer'
import NavBar from '@src/components/NavBar'
import { ReactNode } from 'react';

const NavLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section>
            <NavBar />
            {children}
            <Footer />
        </section>
    )
}

export default NavLayout