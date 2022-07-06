import { useState } from "react";
import Message from "./Message";

const NewBudget = ({ budget, setBudget, setIsValidBudget }) => {
  const [message, setMessage] = useState("");

  /**
   * If the budget is not valid, set the message to 'Not a valid budget!' and return. Otherwise, set
   * the message to an empty string and set isValidBudget to true.
   * @returns Nothing is being returned.
   */
  const handleBudget = (e) => {
    e.preventDefault();

    if (!budget || budget < 0) {
      setMessage("Not a valid budget!");
      return;
    }

    setMessage("");
    setIsValidBudget(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handleBudget} className="formulario">
        <div className="campo">
          <label>Define budget</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Add budget"
            value={budget}
            onChange={(e) => {
              setBudget(Number(e.target.value));
            }}
          />
        </div>
        <input type="submit" value="Add" />
        {message && <Message type="error">{message}</Message>}
      </form>
    </div>
  );
};

export default NewBudget;
