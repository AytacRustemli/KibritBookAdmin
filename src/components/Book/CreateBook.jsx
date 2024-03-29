import { Button, FormLabel, Switch, TextField, MenuItem } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL, FILE_PATH } from '../../api/config'
import { useDispatch } from 'react-redux'

const CreateBook = () => {
  const [Name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isStock, setIsStock] = useState(false);
  const [isTranslate, setIsTranslate] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const [translator, setTranslator] = useState("");
  const [bookCover, setBookCover] = useState();
  const [paperType, setPaperType] = useState("");
  const [size, setSize] = useState("");
  const [bookPictures, setBookPictures] = useState([]);
  const [author, setAuthor] = useState();
  const [publisher, setPublisher] = useState();
  const [genre, setGenre] = useState();
  const [language, setLanguage] = useState();
  const [APIData, setAPIData] = useState([]);
  const [APIData2, setAPIData2] = useState([]);
  const [APIData3, setAPIData3] = useState([]);
  const [APIData4, setAPIData4] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPublisher = async () => {
    axios.get(BASE_URL + "publisher/getall").then((response) => {
      setAPIData(response.data);
    });
  };

  const getAuthor = async () => {
    axios.get(BASE_URL + "author/getall").then((response) => {
      setAPIData2(response.data);
    });
  };

  
  const getGenre = async () => {
    axios.get(BASE_URL + "genre/getall").then((response) => {
      setAPIData3(response.data);
    });
  };

  const getLanguage = async () => {
    axios.get(BASE_URL + "language/getall").then((response) => {
      setAPIData4(response.data);
    });
  };


  const createBook = async () => {
    const bookData = {
      name: Name,
      description: description,
      price: price,
      salePrice: salePrice,
      quantity: quantity,
      isStock: isStock,
      isTranslate: isTranslate,
      isSale: isSale,
      translator: translator,
      bookCover: bookCover,
      paperType: paperType,
      size: size,
      bookPictures: bookPictures,
      authorId: author,
      publisherId: publisher,
      genreId: genre,
      languageId: language
    };
    // console.log(bookData);
  
    try {
      const response = await fetch(`${BASE_URL}book/add`, {
        method: "POST",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData)
      });
  
      const data = await response.json();
      console.log(data);
  
    } catch (error) {
      console.log(error);
    }
  }
  
  const fileUploadHandler = async (event) => {
    const formData = new FormData();
    formData.append('Image', event.target.files[0])
    try {
      const res = await axios.post(`${BASE_URL}Book/uploadcover`, formData);
      setBookCover(res.data.message)
    } catch (ex) {
      console.log(ex);
    }
  }
  
  const multiplePicture = async (event) => {
    let myImageList = []
    for (let i = 0; i < event.target.files.length; i++) {
      let formData = new FormData();
      formData.append("Image", event.target.files[i])
      try {
        let res = await axios.post(`${BASE_URL}Book/uploadimages`, formData)
        let imageList = {
          photoUrl: res.data.message
        }
        myImageList.push(imageList)
      } catch (ex) {
        console.log(ex);
      }
    }
    setBookPictures(myImageList);
  }
  




  useEffect(() => {
    getAuthor();
    getPublisher();
    getGenre();
    getLanguage()
  }, [dispatch, bookCover])

  return (
    <div className='container  my-5'>
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <div className="col-lg-12">
              <TextField fullWidth id="outlined-basic" onChange={(e) => setName(e.target.value)} label="Name" variant="outlined" />
            </div>
            <div className="col-lg-12 my-3">
              <TextField fullWidth id="outlined-basic" onChange={(e) => setTranslator(e.target.value)} label="Translator" variant="outlined" />
            </div>
            <div className="col-lg-12 my-2">
              <TextField fullWidth id="outlined-basic" onChange={(e) => setPaperType(e.target.value)} label="Paper type" variant="outlined" />
            </div>
            <div className="col-lg-12 my-2">
              <TextField fullWidth id="outlined-basic" onChange={(e) => setSize(e.target.value)} label="Size" variant="outlined" />
            </div>
            <div className="col-lg-12 my-2">
              <TextField fullWidth id="outlined-basic" onChange={(e) => setQuantity(e.target.value)} label="Quantity" variant="outlined" />
            </div>
            <div className="col-lg-4 my-2">
              <TextField fullWidth id="outlined-basic" type='number' onChange={(e) => setPrice(e.target.value)} label="Price" variant="outlined" />
            </div>

            <div className="col-lg-4 my-2">
              <TextField fullWidth id="outlined-basic" onChange={(e) => setSalePrice(e.target.value)} label="SalePrice    ₼" variant="outlined" />
            </div>
            <div className="col-lg-4 my-2">
              <TextField fullWidth
                id="outlined-select-currency"
                select
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              >
                {
                  APIData2 &&
                  APIData2.map((cat) => (
                    <MenuItem value={cat.id} key={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))
                }
              </TextField>
            </div>
            <div className="col-lg-4 my-2">
              <TextField fullWidth
                id="outlined-select-currency"
                select
                label="Publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              >
                {
                  APIData &&
                  APIData.map((cat) => (
                    <MenuItem value={cat.id} key={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))
                }
              </TextField>
            </div>
            <div className="col-lg-4 my-2">
              <TextField fullWidth
                id="outlined-select-currency"
                select
                label="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                {
                  APIData3 &&
                  APIData3.map((cat) => (
                    <MenuItem value={cat.id} key={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))
                }
              </TextField>
            </div>
            <div className="col-lg-4 my-2">
              <TextField fullWidth
                id="outlined-select-currency"
                select
                label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {
                  APIData4 &&
                  APIData4.map((cat) => (
                    <MenuItem value={cat.id} key={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))
                }
              </TextField>
            </div>
            <div className="col-lg-12 my-2">
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-lg-12 my-2">
              <h6>Upload main</h6>
              <Button
                fullWidth
                variant="contained"
                component="label"
              >
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={fileUploadHandler}
                />
              </Button>

              <div className="row">
                <div className="col-lg-3 my-3">
                  <div className="card">
                    <img className='img-fluid' src={`${FILE_PATH}${bookCover}`} alt='' />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <h6>Upload multiple photo</h6>

                  <Button
                    fullWidth
                    variant="contained"
                    component="label"
                    className='mb-2'
                  >
                    Upload File
                    <input
                      type="file"
                      hidden
                      multiple
                      onChange={multiplePicture}
                    />
                  </Button>


                  <div className="row">
                    {
                      bookPictures &&
                      bookPictures.map((picture) => (
                        <div className="col-lg-4">
                          <img className='img-fluid' src={`${FILE_PATH}${picture.photoUrl}`} alt="" />
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="row">
            <div className="col-lg-4">
              <FormLabel component="legend"> Stock <br></br>
                <Switch onChange={(e) => setIsStock(!isStock)} />
              </FormLabel>
            </div>
            <div className="col-lg-4">
              <FormLabel component="legend"> Sale <br></br>
                <Switch onChange={(e) => setIsSale(!isSale)} />
              </FormLabel>
            </div>
            <div className="col-lg-4">
              <FormLabel component="legend"> Translate
                <Switch onChange={(e) => setIsTranslate(!isSale)} />
              </FormLabel>
            </div>
          </div>
        </div>

        <div className="col-lg-6 my-2">
          <Link to={'/book'}>
            <Button
              variant="contained"
              component="label"
              color='success'
              onClick={() => createBook()}
            >
              Create
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CreateBook