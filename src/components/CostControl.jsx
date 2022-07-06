import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CostControl = ({
  expenses,
  setExpenses,
  budget,
  setBudget,
  setIsValidBudget,
}) => {
  const [percentage, setPercentage] = useState(0);
  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);

  /* A hook that is called when the component is mounted and when the expenses change. */
  useEffect(() => {
    const totalSpent = expenses.reduce(
      (total, expense) => expense.quantity + total,
      0
    );
    const totalAvailable = budget - totalSpent;
    const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(
      2
    );

    setAvailable(totalAvailable);
    setSpent(totalSpent);
    setTimeout(() => {
      setPercentage(newPercentage);
    }, 700);
  }, [expenses]);

  /**
   * It takes a number and returns a string formatted as a currency.
   */
  const formatQuantity = (quantity) =>
    quantity.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  /**
   * If the user confirms the reset, then set the expenses and budget to empty and set the
   * isValidBudget to false.
   */
  const handleResetApp = () => {
    const result = confirm("Do you want to restart budgets and expenses?");

    if (result) {
      setExpenses([]);
      setBudget(0);
      setIsValidBudget(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}% spent`}
          styles={buildStyles({
            pathColor: percentage > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: percentage > 100 ? "#DC2626" : "#3B82F6",
          })}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Reset app
        </button>
        <p>
          <span>Budget: </span>
          {formatQuantity(budget)}
        </p>
        <p className={`${available < 0 ? "negativo" : ""}`}>
          <span>Available: </span>
          {formatQuantity(available)}
        </p>
        <p>
          <span>Spent: </span>
          {formatQuantity(spent)}
        </p>
      </div>
    </div>
  );
};

export default CostControl;
