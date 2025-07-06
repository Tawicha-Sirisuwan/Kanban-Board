import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import BoardDetail from './pages/BoardDetail'
import BoardPage from './pages/BoardPage'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardPage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/board/:boardId" element={<BoardDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App