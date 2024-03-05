import { Toaster } from 'react-hot-toast';

const MainToaster = () => {
    return (
        <Toaster
            position="bottom-left"
            reverseOrder={false}
            toastOptions={{
                duration: 5000,
                success: {
                    className: "bg-success text-success-content"
                },
                error: {
                    className: "bg-error text-error-content"
                },
                loading: {
                    className: "bg-base-100 text-base-content"
                }
            }}
        />
    )
}

export default MainToaster