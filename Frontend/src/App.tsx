import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
// import Main from './pages/Main'
import BoardPage from './pages/ฺฺBoardPage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardPage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App