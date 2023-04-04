import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Author from '../components/Author/Author'
import CreateAuthor from '../components/Author/CreateAuthor'
import UpdateAuthor from '../components/Author/UpdateAuthor'
import Book from '../components/Book/Book'
import CreateGenre from '../components/Genre/CreateGenre'
import Genre from '../components/Genre/Genre'
import UpdateGenre from '../components/Genre/UpdateGenre'
import CreateLanguage from '../components/Language/CreateLanguage'
import Language from '../components/Language/Language'
import UpdateLanguage from '../components/Language/UpdateLanguage'
import CreatePublisher from '../components/Publisher/CreatePublisher'
import Publisher from '../components/Publisher/Publisher'
import UpdatePublisher from '../components/Publisher/UpdatePublisher'
import CreateSlider from '../components/Slider/CreateSlider'
import Slider from '../components/Slider/Slider'
import UpdateSlider from '../components/Slider/UpdateSlider'
import CreateBook from '../components/Book/CreateBook'
import UpdateBook from '../components/Book/UpdateBook'

const MyRouter = () => {
  return (
    <Routes>
      <Route path='/language' element={<Language />}/>
      <Route path='/language/create' element={<CreateLanguage />}/>
      <Route path='/language/update/:id' element={<UpdateLanguage />}/>
      <Route path='/genre' element={<Genre />}/>
      <Route path='/genre/create' element={<CreateGenre />}/>
      <Route path='/genre/update/:id' element={<UpdateGenre />}/>
      <Route path='/author' element={<Author />}/>
      <Route path='/author/create' element={<CreateAuthor />}/>
      <Route path='/author/update/:id' element={<UpdateAuthor />}/>
      <Route path='/publisher' element={<Publisher />}/>
      <Route path='/publisher/create' element={<CreatePublisher />}/>
      <Route path='/publisher/update/:id' element={<UpdatePublisher />}/>
      <Route path='/slider' element={<Slider />}/>
      <Route path='/slider/create' element={<CreateSlider />}/>
      <Route path='/slider/update/:id' element={<UpdateSlider />}/>
      <Route path='/book' element={<Book />}/>
      <Route path='/book/create' element={<CreateBook />}/>
      <Route path='/book/update/:id' element={<UpdateBook />}/>
    </Routes>
  )
}

export default MyRouter