import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signin from './pages/Signin'
import CreateFC from './pages/CreateFC'
import ViewFC from './pages/ViewFC'
import ViewLargeFC from './pages/ViewLargeFC'
import Config from './pages/Config'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/home';


function App() {

  const theme = createTheme({
    palette: {
      background: {
        default: "#0B1026"
      }
    }
  });
  return (
    <>
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


          </Routes>
        </BrowserRouter>


        <CssBaseline />


      </ThemeProvider>
    </>
  )
}

export default App

