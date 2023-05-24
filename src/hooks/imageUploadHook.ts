import axios, { AxiosResponse } from "axios";
import { ChangeEvent, useRef, useState } from "react";
import { FILE_UPLOAD_URL, multipartHeader } from "src/constants/api";

const useImageUploadHook = () => {
    
    const imageRef = useRef<HTMLInputElement | null>(null);
    const [boardImgUrl, setBoardImgUrl] = useState<string>('');
    
    const onImageUploadChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files) return;
        const data = new FormData();
        data.append('file', event.target.files[0]);
    
        axios.post(FILE_UPLOAD_URL, data, multipartHeader())
            .then((response) => imageUploadResponseHandler(response))
            .catch((error) => imageUploadErrorHandler(error));
    }

    const onImageUploadButtonHandler = () => {
        if(!imageRef.current) return;
        imageRef.current.click();
    }
    
    const imageUploadResponseHandler = (response : AxiosResponse<any, any>) => {
        const imageUrl = response.data as string;
        if(!imageUrl) return;
        setBoardImgUrl(imageUrl);
        console.log(imageUrl);
    }
    
    const imageUploadErrorHandler = (error: any) => console.log(error.message);
    return { onImageUploadChangeHandler, onImageUploadButtonHandler, setBoardImgUrl, boardImgUrl, imageRef };
}

export default useImageUploadHook;