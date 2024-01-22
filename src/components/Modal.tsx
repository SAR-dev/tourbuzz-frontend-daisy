import classNames from "classnames";
import { ReactNode } from "react";

interface ModalType {
    title: string;
    opened: boolean;
    handleClose: () => void;
    width: string;
    height?: string;
    children: ReactNode;
}

const Modal = ({ height = "auto", ...props }: ModalType) => {
    return (
        <dialog className={classNames({
            "modal": true,
            "modal-open": props.open
        })}>
            <div
                className="modal-box w-fit card"
                style={{
                    maxWidth: props.width,
                    width: props.width,
                    height: height,
                }}
            >
                <div className="font-bold text-lg">
                    {props.title}
                </div>
                <div className="py-4 h-fill">
                    {props.children}
                </div>
            </div>
        </dialog>
    )
}

export default Modal