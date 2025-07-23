import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Network from "./Pages/Network";
import Body from "./Pages/Home";
import MainFeed from "./Pages/MainFeed";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<MainFeed />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/network" element={<Network />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
