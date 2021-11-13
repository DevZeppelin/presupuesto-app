import React, { Fragment, useState } from "react";
import PropTypes from 'prop-types'
import Error from "./Error";
//utilizando extension rafc

const Pregunta = ({ guardarPresupuesto, guardarRestante, actualizarPregunta }) => {
  //definir el state
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  //Funcion que define el presupuesto. Como hay que acceder a lops valores le pasamos "e"
  const definirPresupuesto = (e) => {
    //Se va a ingresar como string por eso lo paso a entero
    //console.log(parseInt(e.target.value))
    guardarCantidad(parseInt(e.target.value), 10);
    //otra forma es directamente dentro del {} del onChange poner: {e => guardarCantidad(parseInt(e.target.value),10) }. Las dos se usan
  };

  //Submit para definir presupeusto
  const agregarPresupuesto = (e) => {
    e.preventDefault(); //q no envie el query string en la parte superior ni que recargue la pagina

    //Validar
    if (cantidad < 1 || isNaN(cantidad)) {
      guardarError(true);
      return;
    }

    //Si pasa la validacion
    guardarError(false)
    guardarPresupuesto(cantidad)
    guardarRestante(cantidad)
    actualizarPregunta(false)
  };

  return (
    <Fragment>
      <h2>Coloca tu presupuesto</h2>

        { error ? <Error mensaje="El presupuesto es incorrecto" /> : null}

      <form onSubmit={agregarPresupuesto}>
        <input
          type="number"
          className="u-full-width"
          placeholder="Coloca tu presupuesto"
          onChange={definirPresupuesto}
        />
        <input type="submit" className="u-full-width button-primary" value="OK" />
      </form>
    </Fragment>
  );
};

Pregunta.propTypes = {
  guardarPresupuesto : PropTypes.func.isRequired,
  guardarRestante : PropTypes.func.isRequired,
  actualizarPregunta : PropTypes.func.isRequired
}


export default Pregunta;
