import React, {useState, useEffect} from 'react'

import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {

  //states
  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([])

  useEffect(() => {
    const consultarAPI = async () => {
      if(busqueda === "") return;

      const imagenesPorPagina=30;
      //Key privada de pixabay
      const key ="19901694-ed3a53ae97a3d543183ad9483";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);
    }
    consultarAPI();
  }, [busqueda])

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imágenes</p>
        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />
      </div>
    </div>
  );
}

export default App;
