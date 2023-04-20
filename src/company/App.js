import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectRoute from './components/ProtectRoute'
import Medicine from './pages/Medicine'
import { AppProvider } from './context'
import Orders from './pages/Orders'
const App = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/:company/create'
          element={
            <ProtectRoute>
              <Medicine />
            </ProtectRoute>
          }
        />
        <Route
          path='/:company'
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
        <Route
          path='/:company/medicine/:MedID/orders'
          element={
            <ProtectRoute>
              <Orders />
            </ProtectRoute>
          }
        />
      </Routes>
    </AppProvider>
  )
}

export default App
