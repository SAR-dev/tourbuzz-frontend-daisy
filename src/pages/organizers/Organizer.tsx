import NavLayout from "@src/layouts/NavLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ErrorPage from "@src/components/ErrorPage";
import { OrganizerDataType, getOrganizerByUsername } from "@src/api/organizer";
import OrganizerDetails from "@src/components/OrganizerDetails";

const Organizer = () => {
    const { username = "" } = useParams();
    const organizer = useQuery<OrganizerDataType, Error>({
        queryKey: ['organizer', username],
        queryFn: () => getOrganizerByUsername({ username })
    })

    if (organizer.isError) {
        return <ErrorPage error={organizer.error} />
    }

    return (
        <NavLayout>
            {organizer.data && (
                <OrganizerDetails organizer={organizer.data.data} />
            )}
        </NavLayout>
    )
}

export default Organizer;