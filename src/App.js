import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Inicial from './components/pages/Inicial';
import Login from './components/pages/Login';
import Valores from './components/pages/Valores';
import Final from './components/pages/Final';

//Imagens
import ImgDeterminacao from './images/determinacao.png'
import ImgDisponibilidade from './images/disponibilidade.png'
import ImgFranqueza from './images/franqueza.webp'
import ImgHumildade from './images/humildade.png'
import ImgSimplicidade from './images/simplicidade.png'
import ImgDisciplina from './images/disciplina.png'
import ImgAtitudeDeDono from './images/atitudededono.webp'


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Inicial />} />
          <Route path="/login" element={<Login />} />
          <Route path="/determinação" element={<Valores img={ImgDeterminacao} valor="Determinação" proximo="disponibilidade" />} />
          <Route path="/disponibilidade" element={<Valores img={ImgDisponibilidade} valor="Disponibilidade" proximo="franqueza" />} />
          <Route path="/franqueza" element={<Valores img={ImgFranqueza} valor="Franqueza" proximo="humildade" />} />
          <Route path="/humildade" element={<Valores img={ImgHumildade} valor="Humildade" proximo="simplicidade" />} />
          <Route path="/simplicidade" element={<Valores img={ImgSimplicidade} valor="Simplicidade" proximo="disciplina" />} />
          <Route path="/disciplina" element={<Valores img={ImgDisciplina} valor="Disciplina" proximo="atitudeDeDono" />} />
          <Route path="/atitudeDeDono" element={<Valores img={ImgAtitudeDeDono} valor="Atitude de Dono" proximo="final" />} />
          <Route path="/final" element={<Final />} ></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
