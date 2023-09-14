import React from 'react'
import './ToDoList.css'

function ToDoList(props) {                                                        // Esto se puede trabajar con 'props' (como es el caso, donde a cada propiedad recibida tenemos que especificar con un 'props.variable') o importaros explicitamen listando el nombre de cada valor o función que se va a consumir
  const renderFuction = props.children || props.render;                           // Esta variable tomara el valor de una funcion para Reenderizar dependiendo si esta funcion es enviada como un Render Props (como atributo) o como una Render Function (como children dentro de las etiquetas del Componente)

  return(                                                                         // Dentro de este Componente vamos a evaluar cada State y de eso dependera el tipo de Render y los Componentes que vamos a mostrar
    <section className='ToDoList-container'>
      {props.error && props.onError()}                                            {/* Si existe un erro se ejecuta la función 'onError()' la cual su lógica esta definida en el Componente Padre en el Componente App */}
      {props.loading && props.onLoading()}
      {(!props.loading && !props.totalToDos) && props.onEmptyToDos()}             {/* Verificamos si no estamos haciendo 'loading' y si no existe ToDos ya creados, si las 2 son ciertas ejecutamos la Render Prop 'onEmptyToDos' que reenderiza el Componente de <EmptyToDos>*/}

      {(!!props.totalToDos && !props.searchedToDos.length) && props.onEmptySearchResults(props.searchText)}     {/* Validamos que ningun texto en el Search coincida con alguno de nuestros ToDos en el 'searchedToDos' y que exista al menos un To Do creado, si ese es el caso entonces mostrasmos un Componente que indique que no hay resultados para su busqueda y el texto de lo que queria buscar*/}
      
      <ul className='ToDoList'>                                                   {/* Muesta en formato de 'unordered list' los ToDoItem que corresponden mostrar, cual sea esos ToDoItem vendran dentro de 'children' */}
        {(!props.loading && !props.error) && props.searchedToDos.map(renderFuction)}                                     {/* Por cada elemento de nuestro Array 'searchedToDos' vamos a "ejecutar" la variable 'renderFuction' que adentro contiene una funcion que Reederiza los Componenetes <ToDoItem>, el valor de la variable lo podemos sustituir con un: {props.searchedTodos.map(props.render || props.children)} */}
      </ul>
    </section>
  );
}

export { ToDoList };