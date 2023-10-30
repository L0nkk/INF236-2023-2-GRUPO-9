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
      dob: '',
      address: '',
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

          <label htmlFor="dob">Fecha examen:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={this.state.dob}
            onChange={this.handleInputChange}
            style={inputStyle}
            required
          />

          <label htmlFor="Hora">Hora examen:</label>
          <input type="time" id="appt" name="appt" style={inputStyle} required />

          <label htmlFor="Med">Nombre Medico:</label>
          <input type="text" id="Med" name="Med" style={inputStyle} required />

          <label htmlFor="address">Motivo:</label>
          <textarea
            id="address"
            name="address"
            value={this.state.address}
            onChange={this.handleInputChange}
            style={inputStyle}
            rows="4"
            required
          />

          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    );
  }
}

export default PersonalInfoForm;
