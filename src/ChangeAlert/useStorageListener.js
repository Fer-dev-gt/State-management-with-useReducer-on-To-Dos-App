// Esto era un HOC y lo cambiamos a un Custom Hook 
import React from "react";

function useStorageListener(sincronize){
  const [storageChange, setStorageChange] = React.useState(false);

  window.addEventListener('storage', (change) => {
    if(change.key === 'ToDos_V1') {
      console.log('Hubo cambios en ToDos_V1');
      setStorageChange(true)
    }
  });

  const toggleShow = () => {
    sincronize();
    setStorageChange(false);
  };

  return {
    show: storageChange,
    toggleShow
  };
}

export { useStorageListener };