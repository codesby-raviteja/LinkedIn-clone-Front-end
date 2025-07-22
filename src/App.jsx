import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
