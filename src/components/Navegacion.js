import React, {Component} from 'react';

class Navegacion extends Component{
    
    mostrarAnterior = () =>{
        const {pagina} = this.props;
        if(pagina === 1) return null;

        return(
            <button type="button" onClick={this.props.paginaAnterior} className="btn btn-info mr-1">Anterior &larr;</button>
        )
    }

    mostrarSiguiente = () =>{
        const {totalPaginas, pagina} = this.props;
        if(totalPaginas === pagina) return null;

        return(
            <button type="button" onClick={this.props.paginaSiguiente} className="btn btn-info mr-1">Siguiente &rarr;</button>
        )
    }
    
    render(){
        return (
                <div className="row py-5">
                    {this.mostrarAnterior()}
                    {this.mostrarSiguiente()}
                </div>
            );
        }
};

export default Navegacion;