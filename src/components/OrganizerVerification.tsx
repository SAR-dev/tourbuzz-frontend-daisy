import { constants } from '@src/stores/constantStore'
import { OrganizerType } from '@src/types/base'
import { ReactNode } from 'react';

const OrganizerVerification = ({children, organizer}:{children: ReactNode, organizer: OrganizerType}) => {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
                {children}
            </div>
            <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 border border-base-300 w-96">
                <div tabIndex={0} className="card-body">
                    <h2 className="card-title">{organizer.verification}</h2>
                    <p className="text-sm">{constants.ORGANIZER_LEVEL[organizer.verification as keyof typeof constants.ORGANIZER_LEVEL]}</p>
                </div>
            </div>
        </div>
    )
}

export default OrganizerVerification