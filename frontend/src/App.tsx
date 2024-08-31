import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './assets/userRoutes/Home'
import Navbar from './assets/userRoutes/Navbar'
import SignUp from './assets/userRoutes/SignUp'
import Login from './assets/userRoutes/Login'
import Blogs from './assets/userRoutes/Blogs'

function App() {

  return (
    <>
    <Navbar />
  <Routes>
    <Route path="/" element={< Home/>}/>
    <Route path="/blogs" element={< Blogs/>}/>
    <Route path="/login" element={< Login/>}/>
    <Route path="/signup" element={< SignUp/>}/>
  </Routes>
    </>
  )
}

export default App
