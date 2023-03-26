import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import { BASE_URL, FILE_PATH } from '../../api/config';

const UpdateSlider = () => {
    const [photoUrl, setPhoto] = useState("");
    const [id, setID] = useState(null);
    const navigate = useNavigate();
  
    const updateAPIData = async () => {
      fetch(`${BASE_URL}slider/update/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          photoUrl: photoUrl,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          navigate("/slider");
        });
    }
  
    const fileUploadHandler = async (event) => {
      const formData = new FormData();
      formData.append('Image', event.target.files[0])
      try {
        const res = await axios.post(`${BASE_URL}Book/uploadcover`, formData);
        setPhoto(res.data.message)
      } catch (ex) {
        console.log(ex);
      }
    }

    useEffect(() => {
      setID(localStorage.getItem('ID'))
      setPhoto(localStorage.getItem('photoUrl'));
    }, []);
  
    return (
      <div>
        <Form id="create-form">
        <Form.Field>
          <div className='fileUpload'>
            <input
              type="file"
              placeholder="Photo"
              id='upload_image'
              className='upload-images'
              onChange={fileUploadHandler}

            />
            <p>Şəkili yenilə</p>
            <label class="file-input__label" for="upload_image">
              <span>Upload file</span></label>
          </div>
          <div>
            {photoUrl && <img src={`${FILE_PATH}${photoUrl}`} width="400px" className='mt-3' alt="preview" />}
          </div>
        </Form.Field>
          <button type="submit" className='btn btn-outline-warning my-2' onClick={updateAPIData}>Update</button>
        </Form>
      </div>
    )
}

export default UpdateSlider