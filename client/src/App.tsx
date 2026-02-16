import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signin from './pages/Signin'
import CreateFC from './pages/CreateFC'
import ViewFC from './pages/ViewFC'
import ViewLargeFC from './pages/ViewLargeFC'
import Config from './pages/Config'

function App() {
  return (
    <>   
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path = '/login' element={<Login />} />
      <Route path = '/signin' element={<Signin />} />
      <Route path = '/create' element={<CreateFC />} />
      <Route path = '/view' element={<ViewFC />} />
      <Route path = '/view-details' element={<ViewLargeFC />} />
      <Route path = '/config' element={<Config />} />


    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

