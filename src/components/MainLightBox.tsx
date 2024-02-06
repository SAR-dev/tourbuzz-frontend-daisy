import { useImageModalStore } from "@src/stores/imageModalStore"
import { Lightbox } from "react-modal-image"

const MainLightBox = () => {
    const { url, closeModal } = useImageModalStore()

    return (
        <div>
            {url && (
                <Lightbox
                    medium={url}
                    large={url}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
                    // @ts-expect-error
                    onClose={closeModal}
                />
            )}
        </div>
    )
}

export default MainLightBox;