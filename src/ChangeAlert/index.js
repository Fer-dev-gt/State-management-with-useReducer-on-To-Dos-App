import React from "react";
import './ChangeAlert.css';
// import { withStorageListener } from "./withStorageListener";
import { useStorageListener } from "./useStorageListener";

function ChangeAlert(sincronize) {
  const { show, toggleShow } = useStorageListener(sincronize);

  if(show) {
    return(
      <div className="ChangeAlert-bg">
        <div className="ChangeAlert-container">
          <p>It seems there have been changes in your To-Do's from another tab or window</p>
          <p>Do you want to reload and synchronize your To-Do's?</p>
          <button
            className="ToDoForm-button ToDoForm-button--add"
            onClick={() => toggleShow(false)}
          >
            Yes!
          </button>

        </div>
      </div>
    ) 
  } else {
    return null;
  }
}

// const ChangeAlertWithStorageListener = withStorageListener(ChangeAlert);

export { ChangeAlert };