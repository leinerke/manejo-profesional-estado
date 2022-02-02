import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
  });

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          setState(prevState => ({
            ...prevState,
            error: true,
          }));
        } else if (!!state.error) {
          setState(prevState => ({
            ...prevState,
            error: false,
          }));
        }
        setState(prevState => ({
          ...prevState,
          loading: false,
        }));
      }, 3000);
    }
  }, [state.loading]);

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
}

export { UseState };
