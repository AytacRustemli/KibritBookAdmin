import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL, FILE_PATH } from '../../api/config';
import axios from 'axios';
import { Button, FormLabel, MenuItem, Switch, TextField } from '@mui/material';

const UpdateBook = () => {
  const [Name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isStock, setIsStock] = useState(false);
  const [isTranslate, setIsTranslate] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const [translator, setTranslator] = useState("");
  const [bookCover, setBookCover] = useState("");
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
  const [productList, setProductList] = useState([])
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async() =>{
    let data = await fetch(`${BASE_URL}book/getbyid/${id}`).
    then(res => res.json()).
    then(data => setProductList(data.message))
}

  const getAuthor = async () => {
    axios.get(BASE_URL + "author/getall").then((response) => {
      setAPIData2(response.data);
    });
  };

  const getPublisher = async () => {
    axios.get(BASE_URL + "publisher/getall").then((response) => {
      setAPIData(response.data);
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

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
};

const handlePublisherChange = (event) => {
    setPublisher(event.target.value);
};

const handleGenreChange = (event) => {
  setGenre(event.target.value);
};

const handlelanguageChange = (event) => {
  setLanguage(event.target.value);
};

  const updateProduct = async () => {
    fetch(`${BASE_URL}book/updatebook/${id}`, {
        method: "PUT",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
        })
    }).then(res => res.json()).then(res => {
        console.log(res)
        navigate("/book")
    })
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
    let imageList = {
      photoUrl: ""
    }
    for (let i = 0; i < event.target.files.length; i++) {
      let formData = new FormData();
      formData.append("Image", event.target.files[i])
      let res = await axios.post(`${BASE_URL}Book/uploadimages`, formData)
      imageList = {
        photoUrl: res.data.message
      }
      myImageList.push(imageList)
    }
    setBookPictures(myImageList);
  }

  useEffect(() => {
    getAuthor();
    getPublisher();
    getGenre();
    getLanguage();
    getData();
}, [])

  

  return (
    <div className='container  my-5'>
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <div className="col-lg-12">
              <TextField defaultValue={productList.Name} fullWidth id="outlined-basic" onChange={(e) => setName(e.target.value)} label="Name" variant="outlined" />
            </div>
            <div className="col-lg-12 my-3">
              <TextField defaultValue={productList.translator} fullWidth id="outlined-basic" onChange={(e) => setTranslator(e.target.value)} label="Translator" variant="outlined" />
            </div>
            <div className="col-lg-12 my-2">
              <TextField defaultValue={productList.paperType} fullWidth id="outlined-basic" onChange={(e) => setPaperType(e.target.value)} label="Paper type" variant="outlined" />
            </div>
            <div className="col-lg-12 my-2">
              <TextField defaultValue={productList.size} fullWidth id="outlined-basic" onChange={(e) => setSize(e.target.value)} label="Size" variant="outlined" />
            </div>
            {/* <div className="col-lg-12 my-2">
              <TextField defaultValue={productList.quantity} fullWidth id="outlined-basic" onChange={(e) => setQuantity(e.target.value)} label="Quantity" variant="outlined" />
            </div> */}
            <div className="col-lg-4 my-2">
              <TextField fullWidth id="outlined-basic" defaultValue={productList.price} onChange={(e) => setPrice(e)} label="Price" variant="outlined" />
            </div>

            <div className="col-lg-4 my-2">
              <TextField fullWidth id="outlined-basic" defaultValue={productList.salePrice} onChange={(e) => setSalePrice(e.target.value)} label="SalePrice    ₼" variant="outlined" />
            </div>
            <div className="col-lg-4 my-2">
              <TextField fullWidth
                id="outlined-select-currency"
                select
                label="Author"
                value={author}
                onChange={handleAuthorChange}
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
                onChange={handlePublisherChange}
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
                onChange={handleGenreChange}
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
                onChange={handlelanguageChange}
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
                defaultValue={productList.description}
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
                <Switch defaultValue={productList.isStock} onChange={(e) => setIsStock(!isStock)} />
              </FormLabel>
            </div>
            <div className="col-lg-4">
              <FormLabel component="legend"> Sale <br></br>
                <Switch defaultValue={productList.isSale} onChange={(e) => setIsSale(!isSale)} />
              </FormLabel>
            </div>
            <div className="col-lg-4">
              <FormLabel component="legend"> Translate
                <Switch defaultValue={productList.isTranslate} onChange={(e) => setIsTranslate(!isTranslate)} />
              </FormLabel>
            </div>
          </div>
        </div>

        <div className="col-lg-6 my-2">
          
            <Button
              variant="contained"
              component="label"
              color='success'
              onClick={() => updateProduct()}
            >
              Update
            </Button>
          
        </div>
      </div>
    </div>
  )
}

export default UpdateBook