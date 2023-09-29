import { useState } from "react";
import useShowToast from "./useShowToast";

const userPreviewImg = () => {
    const [imgUrl, setImgUrl] = useState(null);
    const showToast = useShowToast();
    const handleImageChange = (e) => {

        const file = e.target.files[0];
        console.log('file log ', file);
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();

            console.log('reader log', reader);
            reader.onloadend = () => {
                setImgUrl(reader.result);
            };
            //  The readAsDataURL method is used to read the contents of the specified Blob or File. When the read 
            // operation is finished, the readyState becomes DONE, and the loadend is triggered. At that time, 
            // the result attribute contains the data as a data: URL representing the file's data as
            //  a base64 encoded string.
            reader.readAsDataURL(file);
        } else {
            showToast("Invalid file type", " Please select an image file", "error");
            setImgUrl(null);
        }
    };
    return { handleImageChange, imgUrl, setImgUrl };
};

export default userPreviewImg;