import { CREATE_BOOK, GET_BOOK } from "../Constats/BookConstants";
import {BASE_URL} from "../../api/config"

export const getBookAction  = () => async (dispatch,getState) =>{
    let book = await (await fetch(`${BASE_URL}Book/bookList`)).json()
    dispatch({
        type: GET_BOOK,
        payload: book.message
    })
}

export const createBookAction = (Name,description,price,salePrice,isStock,isTranslate,isSale,translator,bookCover,paperType, size, author, publisher, genre, language,bookPictures) => async (dispatch, getState) =>{
    let newProduct = await fetch(`${BASE_URL}Book/add`,{
        method: "post",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: Name,
            description:description,
            price: price,
            salePrice : salePrice,
            isStock: isStock,
            isTranslate: isTranslate,
            isSale: isSale,
            translator:translator,
            bookCover:bookCover,
            paperType : paperType,
            size : size,
            author :author,
            publisher :publisher,
            genre :genre,
            language : language,
            bookPictures : [{
                photoUrl: "ajdahdkashdkl"
            }]
        })
    }).then(res => res.json())

    dispatch({
        type: CREATE_BOOK,
        payload: newProduct
    })
}