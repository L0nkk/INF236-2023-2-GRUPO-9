import React, { Component } from 'react';

const formStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 5px #ccc',
  backgroundColor: '#f9f9f9',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '5px 0',
  borderRadius: '3px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  background: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
};

class PersonalInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rut: '',
      fecha: '',
      hora: '',
      med: '',
      obs: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // You can handle form submission here, e.g., send data to a server.
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <h1>Agendar hora</h1>
        <form style={formStyle} onSubmit={this.handleSubmit}>
          <label htmlFor="name">Nombre paciente:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            style={inputStyle}
            required
          />

          <label htmlFor="rut">RUT:</label>
          <input
            type="text"
            id="rut"
            name="rut"
            value={this.state.rut}
            onChange={this.handleInputChange}
            style={inputStyle}
            required
          />

          <label htmlFor="fecha">Fecha examen:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={this.state.fecha}
            onChange={this.handleInputChange}
            style={inputStyle}
            required
          />

          <label htmlFor="Hora">Hora examen:</label>
          <select
          id="hora"
          name="hora"
          value={this.state.hora}
          onChange={this.handleInputChange}
          style={inputStyle}
          required
          >
            <option value="1">8:30</option>
            <option value="2">9:00</option>
            <option value="3">9:30</option>
            <option value="4">10:00</option>
            <option value="5">10:30</option>
            <option value="6">11:00</option>
            <option value="7">11:30</option>
            <option value="8">12:00</option>
            <option value="9">12:30</option>
            <option value="10">14:30</option>
            <option value="11">15:00</option>
            <option value="12">15:30</option>
            <option value="13">16:00</option>
          </select>

          <label htmlFor="med">Nombre Medico:</label>
          <input
            type="text"
            id="med"
            name="med"
            value={this.state.med}
            onChange={this.handleInputChange}
            style={inputStyle}
            required
          />

          <label htmlFor="obs">Observaciones:</label>
          <textarea
            id="obs"
            name="obs"
            value={this.state.obs}
            onChange={this.handleInputChange}
            style={inputStyle}
            rows="4"
          />

          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    );
  }
}

export default PersonalInfoForm;
