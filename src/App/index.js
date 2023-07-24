import React from 'react';
import { AppUI } from './AppUI';
import { useLocalStorage } from './useLocalStorage';

function App() {                                                            // Esto es un Componente de React, por convención se escriben con mayuscula
  const [toDos, saveToDos] = useLocalStorage('ToDos_V1', []);                    
  const [searchValue, setSearchValue] = React.useState('');                 // Definimos un estado (dentro de un array), el estado no solo se consume tambien se actualiza el estado es inmutable, inicial vació con ''
  
  const completedToDos = toDos.filter(toDo => !!toDo.completed).length;     // Usamos el método filter y lenght (con doble !! para que sean boolenas) para obtener el número de To Do's completadas
  const totalToDos = toDos.length;            
  
  console.log('Log 1');

  // React.useEffect(() => {
  //   console.log('Looooooooog 2');
  // });

  // React.useEffect(() => {
  //   console.log('Looooooooog 2');
  // }, []);

  React.useEffect(() => {
    console.log('Looooooooog 2');
  }, [totalToDos]);

  console.log('Log 3');

  const searchedToDos = toDos.filter(toDo => 
    toDo.text.toLowerCase().includes(searchValue.toLowerCase())
  );

  const completeToDo = (text) => {                                          // Función que cambia el State de 'toDos' en el apartado de 'completed' de false a true
    const newToDos = [...toDos];                                            // Creamos una copia del Array 'ToDos' usando destructuración [...]
    const toDoIndex = newToDos.findIndex( (toDo) =>                         // Encontramos el index del elemento del Array de ToDos que queremos cambiar
      toDo.text === text );
    newToDos[toDoIndex].completed = !newToDos[toDoIndex].completed;
    saveToDos(newToDos);
  };

  const deleteToDo = (text) => {                                            // Función que crea un nuevo Array de los toDos sin el ToDos que le dimos X para eliminar
    const newToDos = [...toDos];                                            
    const toDoIndex = newToDos.findIndex( (toDo) =>
      toDo.text === text);
    newToDos.splice(toDoIndex, 1);                                          // Quitamos el ToDo seleccionado con la X del Array de ToDos que luego va a actualizar el estado
    saveToDos(newToDos);
  };  

  return(
    <AppUI
    completedToDos = {completedToDos}
    totalToDos = {totalToDos} 
    searchValue = {searchValue}
    setSearchValue = {setSearchValue} 
    searchedToDos = {searchedToDos} 
    completeToDo = {completeToDo} 
    deleteToDo = {deleteToDo}
    />
  )
}

export default App;