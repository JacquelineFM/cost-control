import React from "react";
import NewBudget from "./NewBudget";
import CostControl from "./CostControl";

const Header = ({
  expenses,
  setExpenses,
  budget,
  setBudget,
  isValidBudget,
  setIsValidBudget,
}) => {
  return (
    <header>
      <h1>Expense planner</h1>
      {isValidBudget ? (
        <CostControl
          expenses={expenses}
          setExpenses={setExpenses}
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      ) : (
        <NewBudget
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      )}
    </header>
  );
};

export default Header;
