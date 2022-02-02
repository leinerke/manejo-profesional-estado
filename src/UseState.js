import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          setState(prevState => ({
            ...prevState,
            error: true,
            loading: false,
          }));
        } else {
          setState(prevState => ({
            ...prevState,
            error: false,
            confirmed: true,
            loading: false,
            value: "",
          }));
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
          onChange={event => setState(prevState => ({ ...prevState, value: event.target.value }))}
          placeholder="Codigo de seguridad"
        />
        <button
          onClick={() => setState(prevState => ({ ...prevState, loading: true }))}
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
          onClick={() => {
            setState(prevState => ({
              ...prevState,
              deleted: true,
            }));
          }}
        >
          Si, eliminar
        </button>
        <button
          onClick={() => {
            setState(prevState => ({
              ...prevState,
              confirmed: false,
            }));
          }}
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
          onClick={() => {
            setState(prevState => ({
              ...prevState,
              deleted: false,
              confirmed: false,
            }));
          }}
        >
          Reset
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };
