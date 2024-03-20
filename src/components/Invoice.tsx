const Invoice = () => {
    return (
        <div className="relative flex flex-col rounded-xl bg-white border w-[40rem] mx-auto">
            <div className="relative min-h-32 overflow-hidden rounded-t-xl bg-gray-900 text-center">
                <figure className="absolute inset-x-0 bottom-0 -mb-px">
                    <svg
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 1920 100.1"
                    >
                        <path
                            fill="currentColor"
                            className="fill-white"
                            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
                        />
                    </svg>
                </figure>
            </div>
            <div className="relative z-10 -mt-12">
                <span className="mx-auto flex size-[62px] items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm text-4xl">
                    📦
                </span>
            </div>
            <div className="overflow-y-auto p-4 sm:p-7">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Invoice from Preline
                    </h3>
                    <p className="text-sm text-gray-500">Invoice #3682303</p>
                </div>
                <div className="flex justify-between w-full mt-10">
                    <div>
                        <span className="block text-xs uppercase text-gray-500">
                            Amount paid:
                        </span>
                        <span className="block text-sm font-medium text-gray-800">$316.8</span>
                    </div>
                    <div>
                        <span className="block text-xs uppercase text-gray-500">
                            Date paid:
                        </span>
                        <span className="block text-sm font-medium text-gray-800">
                            April 22, 2020
                        </span>
                    </div>
                    <div>
                        <span className="block text-xs uppercase text-gray-500">
                            Payment method:
                        </span>
                        <span className="block text-sm font-medium text-gray-800">
                            🗂️•••• 4242
                        </span>
                    </div>
                </div>
                <div className="mt-10">
                    <h4 className="text-xs font-semibold uppercase text-gray-800">Summary</h4>
                    <ul className="mt-3 flex flex-col border text-sm text-gray-800">
                        <li className="inline-flex items-center gap-x-2 px-4 py-3">
                            <div className="flex w-full items-center justify-between">
                                <span>Ticket Fee</span>
                                <span>$264.00</span>
                            </div>
                        </li>
                        <li className="inline-flex items-center gap-x-2 border-t px-4 py-3">
                            <div className="flex w-full items-center justify-between">
                                <span>Tax fee</span>
                                <span>$52.8</span>
                            </div>
                        </li>
                        <li className="inline-flex items-center gap-x-2 border-t px-4 py-3 bg-gray-50 font-semibold">
                            <div className="flex w-full items-center justify-between">
                                <span>Amount paid</span>
                                <span>$316.8</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="mt-10">
                    <p className="text-sm text-gray-500">
                        If you have any questions, please contact us at
                        <span className="font-medium mx-1">
                            example@site.com
                        </span>
                        or call at <span className="font-medium ml-1">+1 898-34-5492</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Invoice