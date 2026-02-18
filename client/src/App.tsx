import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signin from './pages/Signin'
import CreateFC from './pages/CreateFC'
import ViewFC from './pages/ViewFC'
import ViewLargeFC from './pages/ViewLargeFC'
import Config from './pages/Config'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import  Home  from './pages/home';


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
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path = '/login' element={<Login />} />
      <Route path = '/signin' element={<Signin />} />
      <Route path = '/create' element={<CreateFC />} />
      <Route path = '/view' element={<ViewFC />} />
      <Route path = '/view-details' element={<ViewLargeFC />} />
      <Route path = '/config' element={<Config />} />


    </Routes>
    </BrowserRouter>

    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* ★これを置くと、bodyの色が自動で変わる */}
      
      {/* ここから中身 */}
    </ThemeProvider>
    </>
  )
}

export default App

