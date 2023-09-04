import React from 'react';
import { AppUI } from './AppUI';
// import { ToDoProvider } from '../ToDoContext';

// Vamos a compartir el valor del State no usando el React Context, usaremos la 'Composición de Componentes' para hacer una 'Colocación del State' directa al Componente que los consume
function App() {
  const [state, setState] = React.useState('Estado compartido sin Context');                      // Este State será mandado directo al Componente que lo va a consumir (ToDoItem)

  return(                                                                                         // En nuestro Componente principal App vamos a colocar y 'Componer' los demás Componentes para que podamos pasar un State sin hacer 'prop drilling' o usar Context (Context es mejor cuando hay varios niveles en el arbol de Componentes)
    <>
      <ToDoHeader>
        <ToDoCounter />
        <ToDoSearch />
      </ToDoHeader>
      
      <ToDoList>
        <ToDoItem state={state}/>                                             {/* Mandamos el State directo al Componente que lo va a recibir como props normales */}
      </ToDoList>
    </>
  );
}

function ToDoHeader({ children }) {                                           // Este Componente Padre va a devolver dentro de un <header> normal los otro Componentes como la propiedad 'children'  (Todo lo que este adentro de la etiqueta <ToDoHeader>)
  return(
    <header>
      {children}
    </header>
  );
}

function ToDoList({ children }) {                                             // Aplicamos la misma lógica al Componente <ToDoList> que retorna sus Componentes hijos dentro de un <section>
  return(
    <section className='ToDoList-container'>
      {children}
    </section>
  );
}

function ToDoCounter() {                                                      // Los siguentes Componentes son simples y pueden recibir y consumir un State de mánera directa
  return <p>ToDoCounter</p>;
}
function ToDoSearch() {
  return <p>ToDoSearch</p>;
}
function ToDoItem({ state }) {                                                // Recibimos el valor actual de State en forma de un 'prop destructurado'
  return <p>ToDoItem: {state}</p>;                                            // Consumimos el State de manera habitual, este es enviado del Componente principal <App>
}


// function App() {                                                            // Esto es un Componente de React, por convención se escriben con mayuscula
//   return(                                                                   // Agregamos el 'React Context' al Componente 'AppUI' para poder pasar estados y props con mayor facilidad
//     <ToDoProvider>                                                          
//       <AppUI />
//     </ToDoProvider>
//   )
// }

export default App;                                                         // Forma de exportar un Component por defecto