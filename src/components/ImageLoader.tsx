import { Img } from "react-image";

const ImageLoader = ({ src, className }: { src: string, className: string }) => {
    return (
        <Img 
            src={src} 
            loader={<div className={className + " overflow-hidden"}><div className="h-fill w-full inline-flex bg-base-300" /></div>} 
            unloader={<div className={className + " overflow-hidden"}><div className="h-fill w-full inline-flex bg-base-300" /></div>} 
            className={className} 
        />
    )
}

export default ImageLoader;