import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import { BASE_URL, FILE_PATH } from '../../api/config';

const CreateSlider = () => {
  const [photoURL, setPhoto] = useState("");
  const navigate = useNavigate();

  const fileUploadHandler = async (event) => {
    const formData = new FormData();
    formData.append('Image', event.target.files[0])
    try {
      const res = await axios.post(`${BASE_URL}Book/uploadcover`, formData);
      setPhoto(res.data.message)
    }
    catch (ex) {
      console.log(ex);
    }
  }

  const postData = async () => {
    fetch(`${BASE_URL}slider/add`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        photoURL: photoURL,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        navigate('/slider')
      });
  };

  return (
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
          <p>Şəkil yüklə</p>
          <label class="file-input__label" for="upload_image">
            <span>Upload file</span></label>
        </div>
        <div>
          {photoURL && <img src={`${FILE_PATH}${photoURL}`} width="400px" className='mt-3' alt="preview" />}
        </div>
      </Form.Field>
      <button className='btn btn-outline-success my-2' type="submit" onClick={postData}>
        <Link to={'/slider'}>Submit</Link>
      </button>
    </Form>
  )
}

export default CreateSlider