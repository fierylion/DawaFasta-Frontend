import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Loading from './components/Loading'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import About from './pages/About'
//User
import User from './user'
//Company
import Company from './company'
import Home from './pages/Home'
import { useMajorGlobalContext } from './context'
function App() {
  const {remMainNav} = useMajorGlobalContext();
  
  return (
    <Router>
  <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/user/*' element={<User/>} />
        <Route path='/company/*' element={<Company/>}/>
      </Routes>
    </Router>
  )
}

export default App
