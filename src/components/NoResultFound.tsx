import NoResultSvg from "@src/icons/NoResultSvg"

function NoResultFound({ 
    title = "No Results Found",
    subtitle = "Currently there are no data. Please come back later."
}: { 
    title?: string,
    subtitle?: string 
}) {
    return (
        <div className="flex items-start border border-base-300 card flex-row gap-5 p-5">
            <NoResultSvg className='h-40' />
            <div>
                <div className='text-2xl text-base-content/50 text-2xl font-medium'>{title}</div>
                <div className="text-base-content/50">{subtitle}</div>
            </div>
        </div>
    )
}

export default NoResultFound