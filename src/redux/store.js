import { applyMiddleware, combineReducers, createStore } from 'redux'
import { BookReducer } from './Reducers/BookReducer'
import { LanguageReducer } from './Reducers/LanguageReducer'
import { UploadReducer } from './Reducers/UploadReducer'



const {default: thunk} = require('redux-thunk')
const reducer = combineReducers({
  language: LanguageReducer,
  book : BookReducer,
  upload : UploadReducer
})


const initialState = {
  language : [],
  book : [],
  upload : []
}

const middleware = [thunk]


const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store;