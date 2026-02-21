import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signin from './pages/Signin'
import CreateFC from './pages/CreateFC'
import ViewFC from './pages/ViewFC'
import ViewLargeFC from './pages/ViewLargeFC'
import Config from './pages/Ranking'
import Profile from './pages/Profile'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/home';
import { AuthProvider } from './contexts/AuthContext';


function App() {

  const theme = createTheme({
    palette: {
      background: {
        default: "#0B1026"
      }
    }
  });
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/create' element={<CreateFC />} />
            <Route path='/view' element={<ViewFC />} />
            <Route path='/view-details/:id' element={<ViewLargeFC />} />
            <Route path='/config' element={<Config />} />
            <Route path='/profile' element={<Profile />} />

          </Routes>
        </BrowserRouter>


        <CssBaseline />


      </ThemeProvider>
    </AuthProvider>
  )
}

export default App

