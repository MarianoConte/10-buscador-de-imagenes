import React, { Component } from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';


class App extends Component {

  state={
    termino: '',
    imagenes: [],
    pagina:'',
    cargando: false,
    totalPaginas: ''
  }

  consultarAPI = async() =>{
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=12177011-4e7606d2f3ad3de23635b6443&q=${termino}&per_page=30&page=${pagina}`;
  
    await fetch(url)
    .then(respuesta => { 
      this.setState({
        cargando:true
      });
      return respuesta.json()
      
    })
    .then(resultado => {
      const totalPaginacion = Math.ceil(resultado.totalHits / 30);
      setTimeout(() =>{
        this.setState({
          imagenes: resultado.hits,
          cargando: false,
          totalPaginas: totalPaginacion
          })
      }, 500);
    })
  }


  datosBusqueda = (termino) =>{
    this.setState({
      termino : termino,
      pagina: 1
    }, () =>{
      this.consultarAPI();
    
    })
  }

  paginaAnterior = () =>{
    let pagina = this.state.pagina;
    
    if(pagina === 1) return null;

    pagina -= 1;
    
    this.setState({
      pagina
    }, () =>{
      this.consultarAPI();
      this.scroll();
      }
    );
  }

  paginaSiguiente = () =>{
    let pagina = this.state.pagina;
    
    const {totalPaginas} = this.state;

    if(pagina === totalPaginas) return null;
    
    pagina += 1;
    
    this.setState({
      pagina
    }, () =>{
      this.consultarAPI();
      this.scroll();
    });

  }

  scroll = () =>{
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('auto', 'start');
  }
  
  render() {

    const cargando = this.state.cargando;

    let resultado;
    
    if(cargando){
      resultado = <Spinner />
    }else{
      resultado = <Resultado 
      imagenes={this.state.imagenes}
      paginaAnterior = {this.paginaAnterior}
      paginaSiguiente = {this.paginaSiguiente}
      pagina = {this.state.pagina}
      totalPaginas = {this.state.totalPaginas}
    />
    }

    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Buscador 
          datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          {resultado}
        </div>
      </div>
    );
  }
}

export default App;
