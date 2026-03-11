import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import MainLayout from './layouts/MainLayout';
import Generos from "./Pages/generoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>
          <Route path="generos" element={<Generos />} />


        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
