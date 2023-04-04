import { CREATE_BOOK, GET_BOOK } from "../Constats/BookConstants";

export const BookReducer = (state = { book: [] }, action) => {
    switch (action.type) {
        case GET_BOOK:
            return {
                ...state,
                book: action.payload
            }
        case CREATE_BOOK:
            return {
                ...state,
                book: action.payload
            }
        default:
            return state;
    }
}