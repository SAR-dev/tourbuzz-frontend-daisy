import { EnquiryListDataType, getUserEnquiries } from "@src/api/enquiry";
import EnquiryDetails from "@src/components/EnquiryDetails";
import ErrorPage from "@src/components/ErrorPage";
import NavLayout from "@src/layouts/NavLayout"
import { useAuthStore } from "@src/stores/authStore";
import { useSignInModalStore } from "@src/stores/signInModalStore";
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";

const Enquiry = () => {
    const { isLoggedIn } = useAuthStore()
    const { setIsOpenSignIn, setDisableClose } = useSignInModalStore()

    const enquiries = useQuery<EnquiryListDataType, Error>({
        queryKey: ['enquiries'],
        queryFn: () => getUserEnquiries(),
        enabled: isLoggedIn()
    })

    useEffect(() => {
        if(!isLoggedIn()){
            setDisableClose(true)
            setIsOpenSignIn(true)
        }
    }, [isLoggedIn])

    if(enquiries.isError){
        return <ErrorPage error={enquiries.error} />
    }
    
    return (
        <NavLayout>
            {enquiries.data && (
                <EnquiryDetails enquiries={enquiries.data.data} />
            )}
        </NavLayout>
    )
}

export default Enquiry
