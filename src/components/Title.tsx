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
        <div className="w-full">
            <div
                className={classNames({
                    "text-3xl font-semibold title inline-flex": true,
                    "hover:text-primary cursor-pointer translate-x-0 hover:translate-x-1 duration-100": !!to,
                })}
                onClick={() => navigate(to ?? "#")}
            >
                {children}
            </div>
        </div>
    )
}

export default Title;