import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from './../../context/proyectos/proyectoContext';
import tareaContext from './../../context/tareas/tareaContext';

const FormTarea = () => {

    // Obtener el state si un proyecto esta activo : proyecto
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const { errortarea, 
            tareaseleccionada, 
            agregarTarea, 
            validarTarea, 
            obtenerTareas, 
            actualizarTarea,
            limpiarTarea
        } = tareasContext;

    // State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ''
            });
        }
    }, [tareaseleccionada]);

    // Extraer el nombre del proyecto
    const { nombre } = tarea;

    // Si no hay proyecto Seleccionado
    if(!proyecto) return null;
    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // Leer los valores del formulario
    const handleChange = (e) => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // Validar
        if(nombre.trim() === '') {
            validarTarea();
            return;
        }

        // Si es edición o sí es nueva tarea
        if(tareaseleccionada === null) {
            // Tarea nueva y Agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            // tarea.estado = false;
            agregarTarea(tarea);
        } else {
            // Actualizar tarea existente
            actualizarTarea(tarea);

            // Elimina tareaseleccionada del state
            limpiarTarea();
        }
        
        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id); 

        // Reiniciar el form
        guardarTarea({
            nombre: ''
        });
    };

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {
                errortarea ? <p className="mensaje error">El nombre de la Tarea es obligatorio</p> : null 
            }
        </div>
    );
}


export default FormTarea;