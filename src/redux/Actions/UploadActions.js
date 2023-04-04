import { BASE_URL } from "../../api/config"
import { UPLOAD_FILES } from "../Constats/UploadConstats"


export const uploadAction = (image) => async (dispatch, getState) =>{
    let file = await fetch(`${BASE_URL}book/uploadphoto`,{
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data',
            'file' : image
        },
        
    }).then(res => res.json())

    dispatch({
        type: UPLOAD_FILES,
        payload: file
    })
}