import classNames from "classnames";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const Title = ({
    children, 
    to,
}: {
    children: ReactNode, 
    to?: string
}) => {
    const navigate = useNavigate()

    return (
        <div 
            className={classNames({
                "text-3xl font-semibold title": true,
                "hover:text-accent cursor-pointer": !!to,      
            })}
            onClick={() => navigate(to ?? "#")}
        >
            {children}
        </div>
    )
}

export default Title;