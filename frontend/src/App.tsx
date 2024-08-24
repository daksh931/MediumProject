import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './userRoutes/Home'
import Navbar from './userRoutes/Navbar'
import SignUp from './userRoutes/SignUp'
import Login from './userRoutes/Login'

function App() {

  return (
    <>
    <Navbar />
  <Routes>
    <Route path="/" element={< Home/>}/>
    <Route path="/login" element={< Login/>}/>
    <Route path="/signup" element={< SignUp/>}/>
  </Routes>

    </>
  )
}

export default App
