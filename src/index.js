// Este es el Entry Point de la aplicación, va a mostrar los componentes en el div 'root'
import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';                                            // Importamos el Componente 'App' del archivo 'App.js'
import './index.css';

function App(props){
  return (
    <h1>¡{props.saludo}, {props.nombre}!</h1>
  );
}

function withWhatever(WrappedComponent) {
  return function ComponenteDeVerdad(props) {
    return(
      <>
        <WrappedComponent {...props}/>                                {/* Destrucuramos las props del Componente que es enviado en como parámetro */}
        <p>Estamos acompañando al WrappedComponent</p>
      </>
    )
  }
}
  
const AppWithWhatever = withWhatever(App);                             // Ejecutamos la HOC y nos devuelve un Componente

const root = ReactDOM.createRoot(document.getElementById('root'));     // Creamos un Root para React
// root.render(<App />);                                               // Renderizamos el Componente 'App' dentro del 'root' que creamos

root.render(<AppWithWhatever saludo="Buenas Tarde" nombre="Fernando"

/>)
