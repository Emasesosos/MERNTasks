import React, { useContext } from 'react';
import proyectoContext from './../../context/proyectos/proyectoContext';
import tareaContext from './../../context/tareas/tareaContext';

const Tarea = (props) => {

    const { tarea } = props;

    // Obtener el state si un proyecto esta activo : proyecto
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;
    // const { eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual } = tareasContext;

    // Extraer el proyecto
    const [proyectoActual] = proyecto;

    // Función que se ejecuta cuando el usuario presiona el btn de eliminar
    const tareaEliminar = (id) => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    };

    // Función que modifica el estado de las tareas
    const cambiarEstado = (tarea) => {
        if(tarea.estado) {
            tarea.estado = false;
        } else{
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    };

    // Agrega una tarea actual cuendo el usuario desea editarla
    const seleccionarTarea = (tarea) => {
        guardarTareaActual(tarea);
    };

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {
                    tarea.estado
                    ? 
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstado(tarea)}
                            >
                                Completo
                            </button>
                        )
                    :
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstado(tarea)}
                            >
                                Incompleto
                            </button>
                        )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >
                    Eliminar
                </button>
            </div>
        </li>  
    );
}

export default Tarea;