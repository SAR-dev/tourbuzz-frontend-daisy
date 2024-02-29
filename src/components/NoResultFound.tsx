import NoResultSvg from './NoResultSvg'

function NoResultFound() {
    return (
        <div className="flex items-center bg-warning/20 card p-5">
            <NoResultSvg className='h-20' />
            <div className='text-xl text-warning-content/50'>No Results Found</div>
        </div>
    )
}

export default NoResultFound