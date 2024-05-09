import React, { useState } from "react";
import { useNavigate } from "react-router";

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

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    rut: "",
    fecha: "",
    hora: "",
    med: "",
    obs: "",
    tipo: "",
  });

  const navigate = useNavigate();

 // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };
    const data = { ...form };

    await fetch("http://localhost:5050/record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    await fetch("http://localhost:5050/pacientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ name: "", rut: "", fecha: "", hora:"", med:"", obs:"", tipo:"" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
  <div>
        <h1>Agendar hora</h1>
        <form style={formStyle} onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre paciente:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            style={inputStyle}
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
            required
          />
        </div>
        <label htmlFor="rut">RUT:</label>
          <input
            type="text"
            id="rut"
            name="rut"
            value={form.rut}
            onChange={(e) => updateForm({ rut: e.target.value })}
            style={inputStyle}
            required
          />

<label htmlFor="Hora">Tipo examen:</label>
          <select
          id="tipo"
          name="tipo"
          onChange={(e) => updateForm({ tipo: e.target.value })}
          style={inputStyle}
          required
          >
            <option value="" selected disabled hidden>Choose here</option>
            <option value="laboratorio">laboratorio</option>
            <option value="genetico">genetico</option>
            <option value="sangre">sangre</option>
          </select>


<label htmlFor="fecha">Fecha examen:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={form.fecha}
            onChange={(e) => updateForm({ fecha: e.target.value })}
            style={inputStyle}
            required
          />

<label htmlFor="Hora">Hora examen:</label>
          <select
          id="hora"
          name="hora"
          onChange={(e) => updateForm({ hora: e.target.value })}
          style={inputStyle}
          required
          >
            <option value="" selected disabled hidden>Choose here</option>
            <option value="[8:30]">8:30</option>
            <option value="[9:00]">9:00</option>
            <option value="[9:30]">9:30</option>
            <option value="[10:00]">10:00</option>
            <option value="[10:30]">10:30</option>
            <option value="[11:00]">11:00</option>
            <option value="[11:30]">11:30</option>
            <option value="[12:00]">12:00</option>
            <option value="[12:30]">12:30</option>
            <option value="[14:30]">14:30</option>
            <option value="[15:00]">15:00</option>
            <option value="[15:30]">15:30</option>
            <option value="[16:00]">16:00</option>
          </select>

          <label htmlFor="med">Nombre Medico:</label>
          <input
            type="text"
            id="med"
            name="med"
            value={form.med}
            onChange={(e) => updateForm({ med: e.target.value })}
            style={inputStyle}
            required
          />

<label htmlFor="obs">Observaciones:</label>
          <textarea
            id="obs"
            name="obs"
            value={form.obs}
            onChange={(e) => updateForm({ obs: e.target.value })}
            style={inputStyle}
            rows="4"
          />
          <button type="submit" style={buttonStyle}>Submit</button>
          </form>
  </div>
);
}
