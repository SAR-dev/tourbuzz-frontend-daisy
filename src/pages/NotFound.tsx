import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import NavLayout from '@src/layouts/NavLayout'
import { Link, useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()
    return (
        <NavLayout>
            <div className="container flex items-center px-10 h-[30rem] mx-auto">
                <div>
                    <p className="text-sm font-medium text-info">404 error</p>
                    <h1 className="mt-3 font-semibold text-3xl">Page Not Found</h1>
                    <p className="mt-4 text-base-content/75">
                        Sorry, We are facing problem showing this page. Please try again later.
                    </p>
                    <div className="flex items-center mt-6 gap-x-3">
                        <button onClick={() => navigate(-1)} className="btn btn-outline border-base-300">
                            <ArrowLeftIcon className='h-5 w-5' />
                            Go back
                        </button>
                        <Link to="/" className="btn btn-info">
                            Take me home
                        </Link>
                    </div>
                </div>
            </div>
        </NavLayout>
    )
}

export default NotFound