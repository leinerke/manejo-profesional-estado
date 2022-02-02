import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          dispatch({ type: "ERROR" });
        } else {
          dispatch({ type: "CONFIRM" });
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
          onChange={event => dispatch({ type: "WRITE", payload: event.target.value })}
          placeholder="Codigo de seguridad"
        />
        <button
          onClick={() => dispatch({ type: "CHECK" })}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (!state.deleted && !!state.confirmed) {
    return (
      <React.Fragment>
        <p>Pedimos confirmacion. Estas seguro?</p>
        <button
          onClick={() => dispatch({ type: "DELETE" })}
        >
          Si, eliminar
        </button>
        <button
          onClick={() => dispatch({ type: "RESET" })}
        >
          No, me arrepenti
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con exito</p>
        <button
          onClick={() => dispatch({ type: "RESET" })}
        >
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

const reducerObject = (state, payload) => ({
  "ERROR": {
    ...state,
    error: true,
    loading: false,
  },
  "CHECK": {
    ...state,
    loading: true,
  },
  "WRITE": {
    ...state,
    value: payload,
  },
  "CONFIRM": {
    ...state,
    error: false,
    confirmed: true,
    loading: false,
    value: "",
  },
  "DELETE": {
    ...state,
    deleted: true,
  },
  "RESET": {
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
