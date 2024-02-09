import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
    return (
        <div className="min-h-screen justify-center items-center flex p-10">
            <div className="card max-w-[30rem] w-full bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Error!</h2>
                    <p className="my-3">{error.message}</p>
                    <div className="card-actions justify-end">
                        <button className="btn" onClick={resetErrorBoundary}>Reset Error</button>
                        <button className="btn btn-primary" onClick={() => window.location.reload()}>Reload</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorFallback