import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import CardComponent from "./pages/CardComponent"
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/:name" element={<CardComponent />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App