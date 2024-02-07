import { Toaster } from 'react-hot-toast';

const MainToaster = () => {
    return (
        <Toaster
            position="bottom-left"
            reverseOrder={false}
            toastOptions={{
                duration: 5000,
                success: {
                    className: "bg-base-100 text-success"
                },
                error: {
                    className: "bg-base-100 text-error"
                },
                loading: {
                    className: "bg-base-100 text-base-content"
                }
            }}
        />
    )
}

export default MainToaster