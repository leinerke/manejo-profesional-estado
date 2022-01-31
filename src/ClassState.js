import React from "react";

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: true,
      loading: false,
    };
  }

  componentDidUpdate() {
    if (!!this.state.loading) {
      setTimeout(() => {
        this.setState({ loading: true });
      }, 3000);
    }
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor escribe el codigo de seguridad</p>
        {!!this.state.error && (
          <p>Error: El codigo es incorrecto</p>
        )}
        {!!this.state.loading && (
          <p>Cargando...</p>
        )}
        <input
          placeholder="Codigo de seguridad"
        />
        <button
          onClick={() => this.setState({ loading: true })}
        >
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
