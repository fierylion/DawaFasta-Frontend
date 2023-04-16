import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectRoute from './components/ProtectRoute'
import Medicine from './pages/Medicine'
import { AppProvider } from './context'
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
      </Routes>
    </AppProvider>
  )
}

export default App
