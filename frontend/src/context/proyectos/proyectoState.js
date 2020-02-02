import React, { useReducer } from 'react';
import uuid from 'uuid';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { 
        FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS, 
        AGREGAR_PROYECTO, 
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO 
    } from './../../types';

const ProyectoState = (props) => {

    const proyectos = [
        { id: 1, nombre: 'Tienda Virtual' },
        { id: 2, nombre: 'Intranet' },
        { id: 3, nombre: 'Diseño de Sitio Web' },
        { id: 4, nombre: 'MERN' },
        { id: 5, nombre: 'MEAN' },
        { id: 6, nombre: 'MEVN' },
        { id: 7, nombre: 'MERAVN' }
    ];

    const initialState = {
        formulario: false,
        proyectos: [],
        errorformulario: false,
        proyecto: null
    };

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    };

    // Obtener los proyectos
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        });
    };

    // Agregar nuevo proyecto
    const agregarProyecto = (proyecto) => {
        proyecto.id = uuid.v4();

        // Insertar el prouecto en el state
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        });
    };

    // Validar el fromulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    };

    // Mostrar Proyecto que selecciona el Usuario
    const proyectoActual = (proyectoId) => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        });
    };

    // Elimina un proyecto
    const eliminarProyecto = (proyectoId) => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        });
    };

    return(
        <proyectoContext.Provider
            value={{
                formulario: state.formulario,
                proyectos: state.proyectos,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    );

}

export default ProyectoState;