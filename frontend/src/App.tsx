import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup }  from './pages/signup'
import { Signin } from './pages/signin'
import { Blog } from './pages/blog'
import { Blogs } from './pages/blogs'
import { Publish } from './pages/publish'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path='/Signup' element={<Signup />} />
          <Route path='/' element={<Signup />} />
          <Route path='/Signin' element={<Signin />} />
          <Route path='/Blog/:id' element={<Blog />} />
          <Route path='/Blogs' element={<Blogs />} />
          <Route path='/publish' element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
