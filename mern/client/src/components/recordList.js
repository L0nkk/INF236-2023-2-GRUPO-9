import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = ({ record, deleteRecord }) => (
  <tr>
    <td>{record.name}</td>
    <td>{record.rut}</td>
    <td>{record.tipo}</td>
    <td>{record.fecha}</td>
    <td>{record.hora}</td>
    <td>{record.med}</td>
    <td>{record.obs}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${record._id}`}>
        Edit
      </Link>{" "}
      |{" "}
      <button
        className="btn btn-link"
        onClick={() => {
          deleteRecord(record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("day"); // Default time frame is day

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`http://localhost:5050/record/`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const records = await response.json();
        setRecords(records);
      } catch (error) {
        window.alert(error.message);
      }
    }
    getRecords();
  }, []);

  async function deleteRecord(id) {
    try {
      await fetch(`http://localhost:5050/record/${id}`, {
        method: "DELETE"
      });
      setRecords(records.filter((el) => el._id !== id));
    } catch (error) {
      window.alert(error.message);
    }
  }

  function recordList() {
    return records.map((record) => (
      <Record
        key={record._id}
        record={record}
        deleteRecord={() => deleteRecord(record._id)}
      />
    ));
  }

  const showMessage = () => {
    let totalHours = 0;
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    if (selectedTimeFrame === "day") {
      totalHours = records.reduce((total, record) => {
        const recordDate = new Date(record.fecha);
        if (
          (recordDate.getDate() === currentDay || recordDate.getDate() === currentDay - 1) &&
          recordDate.getMonth() === currentMonth &&
          recordDate.getFullYear() === currentYear
        ) {
          return total + 1;
        }
        return total;
      }, 0);
    } else if (selectedTimeFrame === "week") {
      const firstDayOfWeek = new Date(currentDate);
      const lastDayOfWeek = new Date(currentDate);
      const currentDayOfWeek = currentDate.getDay();
      const diff = currentDayOfWeek - 1;
      firstDayOfWeek.setDate(firstDayOfWeek.getDate() - diff);
      lastDayOfWeek.setDate(lastDayOfWeek.getDate() + (6 - diff));
      totalHours = records.reduce((total, record) => {
        const recordDate = new Date(record.fecha);
        if (
          recordDate >= firstDayOfWeek &&
          recordDate <= lastDayOfWeek
        ) {
          return total + 1;
        }
        return total;
      }, 0);
    } else if (selectedTimeFrame === "month") {
      totalHours = records.reduce((total, record) => {
        const recordDate = new Date(record.fecha);
        if (
          recordDate.getMonth() === currentMonth &&
          recordDate.getFullYear() === currentYear
        ) {
          return total + 1;
        }
        return total;
      }, 0);
    }
  
    alert(`Cantidad de Horas Registradas: ${totalHours}`);
  };
  

  return (
    <div>
      <h3>Horas de Consulta</h3>
      <button onClick={showMessage}>Mostrar Registros</button>
      <select
        value={selectedTimeFrame}
        onChange={(e) => setSelectedTimeFrame(e.target.value)}
      >
        <option value="day">Dia</option>
        <option value="week">Semana</option>
        <option value="month">Mes</option>
      </select>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rut</th>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Bloque</th>
            <th>Medico</th>
            <th>Obs</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
};

export default RecordList;
