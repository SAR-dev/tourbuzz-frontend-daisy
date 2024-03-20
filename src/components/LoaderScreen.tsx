import NavLayout from "@src/layouts/NavLayout"

const LoaderScreen = () => {
    return (
        <NavLayout>
            <div className="fixed z-10 top-0 left-0 w-full h-screen bg-base-300/50 flex justify-center items-center">
                <div className="loader h-20 w-20" />
            </div>
        </NavLayout>
    )
}

export default LoaderScreen