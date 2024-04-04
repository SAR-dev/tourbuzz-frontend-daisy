import { useImageModalStore } from "@src/stores/imageModalStore";
import { Img } from "react-image";

const ImageLoader = ({ 
    src = "", 
    modalSrc, 
    className,
    disableZoom
}: { 
    src?: string, 
    modalSrc?: string, 
    className: string,
    disableZoom?: boolean
}) => {
    const { openModal } = useImageModalStore()
    return (
        <Img
            src={src}
            loader={<div className={className + " overflow-hidden bg-base-300"} />}
            unloader={<div className={className + " overflow-hidden bg-base-300"} />}
            className={className}
            style={{cursor: "zoom-in"}}
            onClick={() => disableZoom ?? openModal(modalSrc ?? src)}
        />
    )
}

export default ImageLoader;