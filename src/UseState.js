import React from "react";

function UseState({ name }) {
  const [error, setError] = React.useState(true);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor escribe el codigo de seguridad</p>
      {!!error && (
        <p>Error: El codigo es incorrecto</p>
      )}
      <input
        placeholder="Codigo de seguridad"
      />
      <button
        onClick={() => setError(prevState => !prevState)}
      >
        Comprobar
      </button>
    </div>
  );
}

export { UseState };
