import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { AppProvider } from './context'
import ProtectRoute from './components/ProtectRoute'
import Purchases from './pages/Purchases'
const App = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/:userName' element={<ProtectRoute><Home/></ProtectRoute>} />
        <Route path='/:userName/purchases' element={<ProtectRoute><Purchases/></ProtectRoute>}></Route>
      </Routes>
    </AppProvider>
  )
}

export default App