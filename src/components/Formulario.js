import React, { useState } from "react";
import PropTypes from 'prop-types'
import Error from "./Error";
import shortid from "shortid";

const Formulario = ({ guardarGasto, guardarCreargasto }) => {
  const [nombre, guardarNombre] = useState("");
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  const agregarGasto = (e) => {
    e.preventDefault();

    if (cantidad < 1 || nombre.trim() === "" || isNaN(cantidad)) {
      guardarError(true);
      return;
    }
    guardarError(false); /* si pasa la validacion vuelve el error a false */

    //generar el gasto
    const gasto = { nombre, cantidad, id: shortid.generate() };

    //pasar el gastoi al componente principal
    guardarGasto(gasto);
    guardarCreargasto(true);

    //resetear el form
    guardarNombre("");
    guardarCantidad(0);
  };

  return (
    <form onSubmit={agregarGasto}>
      <h2>Agregue sus gastos</h2>

      {error ? (
        <Error mensaje="Ambos campos son obligatorios o Presupuesto inválido" />
      ) : null}

      <div>
        <label className="campo">Nombre del gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          value={nombre}
          onChange={(e) => guardarNombre(e.target.value)}
        />

        <label className="campo">Cantidad del gasto</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ej. 300"
          value={cantidad}
          onChange={(e) => guardarCantidad(parseInt(e.target.value))}
        />

        <input
          value="Agregar Gasto"
          type="submit"
          className="u-full-width button-primary"
        />
      </div>
    </form>
  );
};

Formulario.propTypes = {
  guardarGasto : PropTypes.func.isRequired,
  guardarCreargasto : PropTypes.func.isRequired
}


export default Formulario;
