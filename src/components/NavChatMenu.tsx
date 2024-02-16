import { useNavigate } from 'react-router-dom'
import DropdownSelect from './DropDownSelect'
import { BrandHipchat } from 'tabler-icons-react'

const NavChatMenu = () => {
    const navigate = useNavigate()
    return (
        <div>
            <DropdownSelect
                button={
                    <button className="btn btn-square btn-ghost">
                        <BrandHipchat className='h-5 w-5' />
                    </button>
                }
                options={[
                    { text: "Enquiry", value: "enquiry", handleClick: () => navigate("/chat/enquiry"), icon: <div className='mr-1'>🤔</div> },
                ]}
            />
        </div>
    )
}

export default NavChatMenu