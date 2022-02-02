import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  
  const onError = () => dispatch({ type: actionTypes.error });
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onWrite = ({ target: { value } }) => dispatch({ type: actionTypes.write, payload: value });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          onError();
        } else {
          onConfirm();
        }
      }, 3000);
    }
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor escribe el codigo de seguridad</p>
        {(!!state.error && !state.loading) && (
          <p>Error: El codigo es incorrecto</p>
        )}
        {!!state.loading && (
          <p>Cargando...</p>
        )}
        <input
          value={state.value}
          onChange={onWrite}
          placeholder="Codigo de seguridad"
        />
        <button onClick={onCheck}>
          Comprobar
        </button>
      </div>
    );
  } else if (!state.deleted && !!state.confirmed) {
    return (
      <React.Fragment>
        <p>Pedimos confirmacion. Estas seguro?</p>
        <button onClick={onDelete}>
          Si, eliminar
        </button>
        <button onClick={onReset}>
          No, me arrepenti
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con exito</p>
        <button onClick={onReset}>
          Reset
        </button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  error: "ERROR",
  check: "CHECK",
  write: "WRITE",
  confirm: "CONFIRM",
  delete: "DELETE",
  reset: "RESET",
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.confirm]: {
    ...state,
    error: false,
    confirmed: true,
    loading: false,
    value: "",
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
    ...state,
    deleted: false,
    confirmed: false,
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };
