import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import { BASE_URL, FILE_PATH } from '../../api/config';

const UpdatePublisher = () => {
  const [Name, setName] = useState("");
  const [photoURL, setPhoto] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [id, setID] = useState(null);
  const navigate = useNavigate();

  const updateAPIData = async () => {
    fetch(`${BASE_URL}publisher/update/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Name,
        photoURL: photoURL,
        publishDate: publishDate
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        navigate("/publisher");
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
    setName(localStorage.getItem('Name'));
    setPhoto(localStorage.getItem('PhotoURL'));
    setPublishDate(localStorage.getItem('publishDate'));
  }, []);

  return (
    <div>
      <Form id="create-form">
        <TextField value={Name} fullWidth id="outlined-basic" label="Name" className='mb-4' variant="outlined" onChange={(e) => setName(e.target.value)} />
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
            {photoURL && <img src={`${FILE_PATH}${photoURL}`} width="400px" className='mt-3' alt="preview" />}
          </div>
        </Form.Field>
        <Form.Field>
          <div className='data'>
            <p>Yayın tarixini yenilə</p>
            <input
              placeholder="publishDate"
              type="date"
              className='datetime'
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
            />
          </div>
        </Form.Field>
        <button type="submit" className='btn btn-outline-warning my-2' onClick={updateAPIData}>Update</button>
      </Form>
    </div>
  )
}

export default UpdatePublisher