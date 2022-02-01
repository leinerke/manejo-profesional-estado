import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!!loading) {
      setTimeout(() => {
        if (value !== SECURITY_CODE) {
          setError(true);
        } else if (!!error) {
          setError(false);
        }
        setLoading(false);
      }, 3000);
    }
  }, [loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor escribe el codigo de seguridad</p>
      {!!error && (
        <p>Error: El codigo es incorrecto</p>
      )}
      {!!loading && (
        <p>Cargando...</p>
      )}
      <input
        value={value}
        onChange={event => setValue(event.target.value)}
        placeholder="Codigo de seguridad"
      />
      <button
        onClick={() => setLoading(true)}
      >
        Comprobar
      </button>
    </div>
  );
}

export { UseState };
