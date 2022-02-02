import React from "react";

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      error: false,
      loading: false,
    };
  }

  componentDidUpdate() {
    if (!!this.state.loading) {
      setTimeout(() => {
        if (this.state.value !== SECURITY_CODE) {
          this.setState({ error: true });
        } else if (!!this.state.error) {
          this.setState({ error: false });
        }
        this.setState({ loading: false });
      }, 3000);
    }
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor escribe el codigo de seguridad</p>
        {(!!this.state.error && !this.state.loading) && (
          <p>Error: El codigo es incorrecto</p>
        )}
        {!!this.state.loading && (
          <p>Cargando...</p>
        )}
        <input
          value={this.state.value}
          placeholder="Codigo de seguridad"
          onChange={event => this.setState({ value: event.target.value })}
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
