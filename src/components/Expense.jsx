import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { formatDate } from "../helpers";
import IconSaving from "../img/icono_ahorro.svg";
import IconFood from "../img/icono_comida.svg";
import IconHome from "../img/icono_casa.svg";
import IconSeveral from "../img/icono_gastos.svg";
import IconLeisure from "../img/icono_ocio.svg";
import IconHealth from "../img/icono_salud.svg";
import IconSubscription from "../img/icono_suscripciones.svg";

/* A dictionary that is used to map the category of the expense to the icon that will be displayed. */
const dictionaryIcons = {
  saving: IconSaving,
  food: IconFood,
  home: IconHome,
  several: IconSeveral,
  leisure: IconLeisure,
  health: IconHealth,
  subscriptions: IconSubscription,
};

const Expense = ({ expense, setEditExpense, deleteExpense }) => {
  const { category, name, quantity, id, date } = expense;

  /**
   * LeadingActions is a function that returns a LeadingActions component that contains a SwipeAction
   * component that, when clicked, sets the editExpense state to the expense state.
   */
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditExpense(expense)}>Edit</SwipeAction>
    </LeadingActions>
  );

  /**
   * TrailingActions is a function that returns a TrailingActions component that contains a SwipeAction
   * component that deletes an expense when clicked.
   */
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => deleteExpense(id)}>
        Delete
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={dictionaryIcons[category]} alt="expense icon" />
            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className="fecha-gasto">
                Added on: <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${quantity}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Expense;
