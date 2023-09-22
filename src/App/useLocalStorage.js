import React from 'react';

function useLocalStorage(itemName, initialValue){                                 // Definimos un 'Custom Hook' para acceder a los datos guardados en LocalStorage

  const initialState = ({ initialValue }) => ({                                   // Definimos un 'initialState' que recibe un valor inicial y retorna un Object con los valores iniciales del State, es una función que retorna un Object y recibe como parametro un Object 'initialValue' que proviene del Componente que usa este Custom Hook
    sincronizedItem: true,
    error: false,
    loading: true,
    item: initialValue                                                            // El valor inicial del State 'item' es el valor que recibe como parametro el 'initialState' que proviene del Componente que usa este Custom Hook
  });

  const actionTypes = {                                                           // Definimos un Object con los nombres de las acciones que se pueden ejecutar y que vamos a implmemntar en el 'reducerObject' el cual va a cambiar el State dependiendo de la acción que se ejecute
    error: 'ERROR',
    success: 'SUCCESS',
    save: 'SAVE',
    sincronize: 'SINCRONIZE'
  };

  const reducerObject = (state, payload) => ({                                            // Definimos un 'reducerObject' que recibe un 'state' y un 'payload' y retorna un Object con los valores del State actualizados, si no existe un payload
    [actionTypes.error]: { ...state, error: true, loading: false },                       // Escribimos [actionTypes.error] entre corchetes para que el valor de la variable 'actionTypes.error' sea el nombre de la propiedad del Object que se va a crear
    [actionTypes.save]: {...state, item: payload},
    [actionTypes.sincronize]: { ...state, sincronizedItem: false, loading: true },
    [actionTypes.success]: { ...state, error: false, loading: false, sincronizedItem: true, item: payload }
  }); 

  const reducer = (state, action) => {                                                    // Definimos un 'reducer' que recibe un 'state' y un 'action' y retorna un Object con los valores del State actualizados  
    return reducerObject(state, action.payload)[action.type] || state;                    // Retornamos un Object con los valores del State actualizados, el valor de 'action.type' es el nombre de la propiedad del Object que se va a crear si no existe el valor de 'action.type' entonces retornamos el valor del 'state' sin modificar
  };

  const [state, dispatch] = React.useReducer(reducer, initialState({ initialValue }));    // Usamos el 'useReducer()' hook para manejar el State de este Custom Hook, recibe un 'reducer' y un 'initialState' que es un Object con los valores iniciales del State, estos valores los guardamos en 2 variables 'state' y 'dispatch' que son los valores que retorna el 'useReducer()' hook

  const {                                                                                 // Destructuramos los valores del State para poder usarlos sin escribir 'state.' antes de cada uno
    sincronizedItem,
    error,
    loading,
    item
  } = state;                                                                              // Los valores de este 'state' provienen del 'initialState' que definimos arriba donde usamor React.useReducer que recibe un 'reducer' y un 'initialState'.

  // ACTION CREATORS                                                                      // Esto 'Action Creators' son funciones que se encargan de ejecutar las acciones que definimos en el 'reducerObject' y que se ejecutan en el 'dispatch()' del 'useReducer()' hook
  const onError = (error) => dispatch({ type: actionTypes.error, payload: error });       // Ejecutan el dispatch() del 'useReducer()' hook y le mandan como parametro un Object con el nombre de la acción que se va a ejecutar y el valor que se va a guardar en el State
  const onSave = (item) => dispatch({ type: actionTypes.save, payload: item });
  const onSincronize = () => dispatch({ type: actionTypes.sincronize });                  // Si no se manda un payload entonces el valor del State no se va a modificar, en este caso es para sincronizar el State con el LocalStorage
  const onSuccess = (item) => dispatch({ type: actionTypes.success, payload: item });

  React.useEffect(() => {                                                                 // El 'useEffect()' hook recibe una funcion y un Array, si es un Array vacio solo se ejecuta una vez
    setTimeout(() => {                                                                    // Simulamos una solicitud a una API de 500 milisegundos de tiempo de espera
      try {
        const localStorageItem = localStorage.getItem(itemName);                          // Tratamos de obtener los valores guardados en el LocalStorage guardado en el nombre que le enviamos ('ToDos_V1')
        let parsedItem;

        if (!localStorageItem) {                                                          // Si no devolvio ningun valor entonces le ponemos como 'initialValue' un Array vacío
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);                                      // Si '.getItem(itemName)' devuelve un valor lo convertimos a formato JSON
        }

        onSuccess(parsedItem);                                                            // Ejecutamos la función 'onSuccess()' que ejecuta el 'dispatch()' del 'useReducer()' hook y le mandamos como parametro el valor que se va a guardar en el State
      } catch(error) {
        onError(error);                                                                   // Si hay un error ejecutamos la función 'onError()' que ejecuta el 'dispatch()' del 'useReducer()' hook y le mandamos como parametro el valor que se va a guardar en el State
      }
    }, 500)
  }, [sincronizedItem]);                                                                  // Si el valor de 'sincronizedItem' cambia entonces se ejecuta el 'useEffect()' hook

  const saveItem = (newItem) => {                                                         // Función para guardar un nuevo ToDo en el LocalStorage y actualizar el State
    localStorage.setItem(itemName, JSON.stringify(newItem))                               // Guardamos el valor del 'newItem' en formato 'JSON.stringify' al Object con nombre 'itenName' ('ToDos_V1')
    onSave(newItem);
  };

  const sincronizeItem = () => {                                                          // Función para sincronizar el State con el LocalStorage
    onSincronize();                                                                       // Ejecutamos la función 'onSincronize()' que ejecuta el 'dispatch()' del 'useReducer()' hook y le mandamos como parametro el valor que se va a guardar en el State
  };

  return {                                                                                // Retornamos los valores del State y las funciones que se encargan de modificar el State       
    item, 
    saveItem,
    loading,
    error,
    sincronizeItem 
  };
}

export { useLocalStorage };                                                               // Exportamos este Componente en especifico