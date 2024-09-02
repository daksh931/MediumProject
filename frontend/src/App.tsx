import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './assets/userRoutes/Home'
import Navbar from './assets/userRoutes/Navbar'
import SignUp from './assets/userRoutes/SignUp'
import Login from './assets/userRoutes/Login'
import Blogs from './assets/userRoutes/Blogs'
import CreateBlog from './assets/blogRoutes/CreateBlog'
import BlogPage from './assets/userRoutes/BlogPage'

function App() {

  return (
    <>
    <Navbar />
  <Routes>
    <Route path="/" element={< Home/>}/>
    <Route path="/blogs" element={< Blogs/>}/>
    <Route path="/login" element={< Login/>}/>
    <Route path="/signup" element={< SignUp/>}/>
    <Route path="/addblog" element={< CreateBlog/>}/>
    <Route path="/blog/:id" element={< BlogPage/>}/>
  </Routes>
    </>
  )
}

export default App
