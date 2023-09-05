import React from 'react'
import './ToDoList.css'

function ToDoList(props) {                                                        // Esto se puede trabajar con 'props' (como es el caso, donde a cada propiedad recibida tenemos que especificar con un 'props.variable') o importaros explicitamen listando el nombre de cada valor o función que se va a consumir
  return(                                                                         // Dentro de este Componente vamos a evaluar cada State y de eso dependera el tipo de Render y los Componentes que vamos a mostrar
    <section className='ToDoList-container'>
      {props.error && props.onError()}                                            {/* Si existe un erro se ejecuta la función 'onError()' la cual su lógica esta definida en el Componente Padre en el Componente App */}
      {props.loading && props.onLoading()}
      {(!props.loading && !props.searchedToDos.length) && props.onEmptyToDos()}   {/* Verificamos si no estamos haciendo 'loading' y si no existe ToDos ya creado, si las 2 son ciertas ejecutamos la Render Prop 'onEmptyToDos' que reenderiza el Componente de <EmptyToDos>*/}

      {props.searchedToDos.map(props.render)}                                     {/* Por cada elemento de nuestro Array 'searchedToDos' vamos a "ejecutar" la propiedad 'render' que adentro contiene una funcion que Reederiza los Componenetes <ToDoItem>*/}

      <ul className='ToDoList'>                                                   {/* Muesta en formato de 'unordered list' los ToDoItem que corresponden mostrar, cual sea esos ToDoItem vendran dentro de 'children' */}
        { props.children }
      </ul>
    </section>
  );
}


export { ToDoList };