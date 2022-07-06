import { useState, useEffect } from "react";
import Message from "./Message";
import CloseModal from "../img/cerrar.svg";

const Modal = ({
  setModal,
  animateModal,
  setAnimateModal,
  saveExpenses,
  editExpense,
  setEditExpense,
}) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");

  /* A hook that is called after the first render. It is used to perform side effects in function
  components. */
  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setName(editExpense.name);
      setQuantity(editExpense.quantity);
      setCategory(editExpense.category);
      setDate(editExpense.date);
      setId(editExpense.id);
    }
  }, []);

  /**
   * When the user clicks the close button, the modal will animate out, the editExpense state will be
   * reset, and after 400 milliseconds, the modal will be set to false.
   */
  const closeModal = () => {
    setAnimateModal(false);
    setEditExpense({});
    setTimeout(() => {
      setModal(false);
    }, 400);
  };

  /**
   * If the name, quantity, or category is empty, then set the message to "All fields are required!"
   * and after 1.5 seconds, set the message to an empty string.
   * @returns the object {name, quantity, category, id, date}
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if ([name, quantity, category].includes("")) {
      setMessage("All fields are required!");
      setTimeout(() => {
        setMessage("");
      }, 1500);
      return;
    }

    saveExpenses({ name, quantity, category, id, date });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CloseModal} alt="Close modal" onClick={closeModal} />
      </div>
      <form
        className={`formulario ${animateModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>{editExpense.name ? "Edit budget" : "New budget"}</legend>
        {message && <Message type="error">{message}</Message>}
        <div className="campo">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="School"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            placeholder="900"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="saving">Saving</option>
            <option value="food">Food</option>
            <option value="home">Home</option>
            <option value="several">Several</option>
            <option value="leisure">Leisure</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>
        <input
          type="submit"
          value={editExpense.name ? "Save budget" : "Add budget"}
        />
      </form>
    </div>
  );
};

export default Modal;
