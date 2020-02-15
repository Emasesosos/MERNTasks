import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import clienteAxios from './../../config/axios';
import {    REGISTRO_EXITOSO,
            REGISTRO_ERROR,
            OBTENER_USUARIO,
            LOGIN_EXITOSO,
            LOGIN_ERROR,
            CERRAR_SESION
        } from './../../types';

const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    /* ************************** FUNCIONES ************************** */

    // ********************** REGISTRAR USUARIO ********************** //
    const registrarUsuario = async (datos) => {

        try {

            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data // Token 
            });

            // Obtener el Usuario
            usuarioAutenticado();

        } catch(error) {

            console.log(error.response.data.msg); 
            const { msg } = error.response.data;
            const alerta = {
                msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });

        }

    }; 

    // Retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            // TODO: Función para enviar el token por headers
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            console.log(respuesta);
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }
    
    /* ************************** FUNCIONES ************************** */
    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario ,
                usuarioAutenticado
            }}
        >
            {props.children} 
        </authContext.Provider>
    );
};

export default AuthState;