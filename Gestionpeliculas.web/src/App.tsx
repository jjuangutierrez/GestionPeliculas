import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import MainLayout from './layouts/MainLayout';
import Generos from "./Pages/generoPage";
import Directores from "./Pages/directorPage";
import Productoras from "./Pages/productoraPage";
import Tipos from "./Pages/tipoPage";
import Medias from "./Pages/mediaPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Medias />} />
          <Route path="generos" element={<Generos />} />
          <Route path="directores" element={<Directores />} />
          <Route path="productoras" element={<Productoras />} />
          <Route path="tipos" element={<Tipos />} />
          <Route path="media" element={<Medias />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App