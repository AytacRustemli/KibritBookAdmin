import React, { useEffect, useState } from "react";
import { BASE_URL } from "./../../api/config";
import axios from "axios";

const Book = () => {
  const [data, setData] = useState([]);

  const getBlog = async () => {
    axios.get(BASE_URL + "Book/bookList").then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div>
      {data &&
        data.map((book) => (
          <div key={book.id}>
            <div className="containerr">
              <div className="box">
                <div className="image">
                  <img src={book.photoURL} alt="" />
                </div>
                <div className="text">
                  <span>{book.description}</span>
                  <span className="box1 super">{book.name}</span>
                  <span className="box1 number">{book.price}₼</span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Book;
