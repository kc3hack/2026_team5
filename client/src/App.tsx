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

// ▼ 追加：先ほど作った AuthProvider を読み込む
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
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* ※MUIの仕様上、CssBaselineは上の方に置くのがオススメです */}
        
        {/* ▼ 追加：アプリ全体（BrowserRouter）を AuthProvider で包み込む！ */}
        <AuthProvider>
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
        </AuthProvider>
        
      </ThemeProvider>
    </>
  )
}

export default App