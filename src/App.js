import React, { useState, useEffect } from "react";
import Pregunta from "./components/Pregunta";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import ControlPresupuesto from "./components/ControlPresupuesto";

function App() {
  //crear state
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [mostrarpregunta, actualizarPregunta] = useState(true);
  const [gastos, guardarGastos] = useState([]);
  const [gasto, guardarGasto] = useState({});
  const [creargasto, guardarCreargasto] = useState(false);

  //use Effect queactualiza el restante
  useEffect(() => {
    if (creargasto) {
      //agregar el nuevo presupuesto
      guardarGastos([...gastos, gasto]);
    }

    //resta del presupuesto actual
    const presupuestoRestante = (restante) - gasto.cantidad;
    guardarRestante(presupuestoRestante);

    //resetear a false
    guardarCreargasto(false);

    //porque tengo un error al agregar restante a las dependencias del use Effect
    // eslint-disable-next-line 
  }, [gasto, creargasto, gastos]);

  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>
        <div className="contenido-principal contenido">
          {/* carga condicional de un componente. muy comun por ejemplo al autenticar un usuario */}
          {mostrarpregunta ? (
            <Pregunta
              guardarPresupuesto={guardarPresupuesto}
              guardarRestante={guardarRestante}
              actualizarPregunta={actualizarPregunta}
            />
          ) : (
            <div className="row">
              <div className="one-half column">
                <Formulario
                  guardarGasto={guardarGasto}
                  guardarCreargasto={guardarCreargasto}
                />
              </div>
              <div className="one-half column">
                <Listado gastos={gastos} />
                <ControlPresupuesto
                  presupuesto={presupuesto}
                  restante={restante}
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
