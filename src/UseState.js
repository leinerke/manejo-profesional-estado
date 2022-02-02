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

  const onError = () => {
    setState(prevState => ({
      ...prevState,
      error: true,
      loading: false,
    }));
  };

  const onConfirm = () => {
    setState(prevState => ({
      ...prevState,
      error: false,
      confirmed: true,
      loading: false,
      value: "",
    }));
  };

  const onWrite = (event) => {
    setState(prevState => ({
      ...prevState,
      value: event.target.value,
    }));
  };

  const onCheck = () => {
    setState(prevState => ({
      ...prevState,
      loading: true,
    }));
  };

  const onDelete = () => {
    setState(prevState => ({
      ...prevState,
      deleted: true,
    }));
  };

  const onReset = () => {
    setState(prevState => ({
      ...prevState,
      deleted: false,
      confirmed: false,
    }));
  };

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
          onChange={event => onWrite(event)}
          placeholder="Codigo de seguridad"
        />
        <button
          onClick={onCheck}
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
          onClick={onDelete}
        >
          Si, eliminar
        </button>
        <button
          onClick={onReset}
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
          onClick={onReset}
        >
          Reset
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };
