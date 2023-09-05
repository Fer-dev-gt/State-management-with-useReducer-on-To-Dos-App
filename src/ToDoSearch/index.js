import React from 'react';
import './ToDoSearch.css';
import searchIcon from "../Assets/search-icon.svg";

function ToDoSearch({ searchValue, setSearchValue }) {                                  // Antes estos States y setStates los obteniamos de un React Context ahora los pasamos como props gracias a que aplicamos la Composición de Componentes

  return(
    <div className='search-container'>
      <input 
        placeholder='Search your To Do'
        className='ToDoSearch'
        value={searchValue}
        onChange={(event) => { setSearchValue(event.target.value) }}                    // Actualiza el State cada vez que se escribe algo en el buscador y hace que se renderizen los componentes que hacen match con el 'search value'
      />
      <img className='search-icon' src={searchIcon} alt='search icon'/>
    </div>
  );
}

export { ToDoSearch };