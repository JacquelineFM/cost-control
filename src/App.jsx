import { useState, useEffect } from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";
import ListExpenses from "./components/ListExpenses";
import Modal from "./components/Modal";
import { getId } from "./helpers";
import IconNewBudget from "./img/nuevo-gasto.svg";

const App = () => {
  const [expenses, setExpenses] = useState(
    localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : []
  );
  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [editExpense, setEditExpense] = useState({});
  const [filter, setFilter] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  /* This is a useEffect hook that is checking if there is an editExpense. If there is, then it is
setting the modal state to true, and animating the modal. */
  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimateModal(true);
      }, 400);
    }
  }, [editExpense]);

  /* This is a useEffect hook that is setting the budget to local storage. */
  useEffect(() => {
    localStorage.setItem("budget", budget ?? 0);
  }, [budget]);

  /* This is a useEffect hook that is setting the expenses array to local storage. */
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses) ?? []);
  }, [expenses]);

  /* This is a useEffect hook that is checking if there is a filter. If there is, then it is filtering
the expenses array and setting the filteredExpenses state to the filtered array. */
  useEffect(() => {
    if (filter) {
      const filteredExpenses = expenses.filter(
        (expense) => expense.category === filter
      );
      setFilteredExpenses(filteredExpenses);
    }
  }, [filter]);

  /* This is checking if there is a budget in local storage. If there is, then it sets the isValidBudget
state to true. */
  useEffect(() => {
    const budgetLS = Number(localStorage.getItem("budget")) ?? 0;

    if (budgetLS > 0) setIsValidBudget(true);
  }, []);

  /**
   * When the user clicks the "New Budget" button, the modal is set to true, the editExpense state is set
   * to an empty object, and the modal is animated
   */
  const handleNewBudget = () => {
    setModal(true);
    setEditExpense({});
    setTimeout(() => {
      setAnimateModal(true);
    }, 400);
  };

  /**
   * If the expense has an id, then we update the expense, otherwise we add a new expense
   */
  const saveExpenses = (expense) => {
    if (expense.id) {
      // Update Expenses
      const updatedExpenses = expenses.map((expenseState) =>
        expenseState.id === expense.id ? expense : expenseState
      );
      setExpenses(updatedExpenses);
      setEditExpense({});
    } else {
      // New Expenses
      expense.id = getId();
      expense.date = Date.now();
      setExpenses([...expenses, expense]);
    }

    setAnimateModal(false);
    setTimeout(() => {
      setModal(false);
    }, 400);
  };

  /**
   * Delete the expense with the given id from the expenses array.
   */
  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />
      {isValidBudget && (
        <>
          <main>
            <Filter filter={filter} setFilter={setFilter} />
            <ListExpenses
              expenses={expenses}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
              filter={filter}
              filteredExpenses={filteredExpenses}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconNewBudget}
              alt="New budget"
              onClick={handleNewBudget}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpenses={saveExpenses}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
        />
      )}
    </div>
  );
};

export default App;
