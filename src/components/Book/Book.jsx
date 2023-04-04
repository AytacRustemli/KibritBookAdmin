import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, FILE_PATH } from '../../api/config';

const Book = () => {
  const navigate = useNavigate();
  const [Name, setName] = useState("")
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
  // const [author, setAuthor] = useState("");
  // const [publisher, setPublisher] = useState("")
  // const [genre, setGenre] = useState("")
  // const [language, setLanguage] = useState("")
  const [APIData, setAPIData] = useState([]);

  const getBooks = async () => {
    axios.get(BASE_URL + "Book/bookList").then((response) => {
      setAPIData(response.data.message);
    });
  };

  const setData = (data) => {
    let { id, name, description, price,salePrice,isStock,isTranslate,isSale,translator,bookCover,paperType, size, author, publisher, genre, language,bookPictures } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("Name", name);
    localStorage.setItem("Description", description);
    localStorage.setItem("Price", price);
    localStorage.setItem("SalePrice", salePrice);
    localStorage.setItem("IsStock", isStock);
    localStorage.setItem("IsTranslate", isTranslate);
    localStorage.setItem("IsSale", isSale);
    localStorage.setItem("Translator", translator);
    localStorage.setItem("BookCover", bookCover);
    localStorage.setItem("PaperType", paperType);
    localStorage.setItem("Size", size);
    localStorage.setItem("Author", author);
    localStorage.setItem("Publisher", publisher);
    localStorage.setItem("Genre", genre);
    localStorage.setItem("Language", language);
    localStorage.setItem("BookPictures", bookPictures);
  };


  const onDelete = (id) => {
    fetch(`${BASE_URL}book/removebook/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Name,
        description: description,
        price: price,
        salePrice : salePrice,
        quantity : quantity,
        isStock : isStock,
        isTranslate : isTranslate,
        isSale : isSale,
        translator: translator,
        bookCover: bookCover,
        paperType : paperType,
        size : size,
        bookPictures: bookPictures,
        // author : author, 
        // publisher: publisher,
        // genre: genre,
        // language: language

      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        navigate('/book')
      });
  };

  getBooks();
  

  return (
    <div><div className='container'>
      <div className="row">
        <div className="col-lg-4 my-4">
          <Link to="/book/create">
            <button className='btn btn-outline-success'>Create</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {
          APIData &&
          APIData.map((product) => (
            <div key={product.id} className="col-lg-3 my-2">
              <div className="card">
                <div className="card-body text-center">
                  <img className='img-fluid' style={{ height: 200 }} src={`${FILE_PATH}${product.bookCover}`} alt="" />
                  <h5>{product.name}</h5>
                </div>
                <div className="card-footer">
                  <div className="row text-center">
                    <div className="col-lg-6">
                      <button className='btn btn-outline-danger w-100' onClick={() => onDelete(product.id)}>Delete</button>
                    </div>
                    <div className="col-lg-6">
                      <Link to={`/book/update/${product.id}`}>
                        <button className='btn btn-outline-warning w-100' onClick={() => setData(product)}>Edit</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }

      </div>
    </div></div>
  )
}

export default Book