import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from './../../context/proyectos/proyectoContext';

const ListadoProyectos = () => {

    // Obtener el state inicial de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyectos } = proyectosContext;

    // Obtener proyectos cuando carga el componente 
    useEffect(() => {
        obtenerProyectos();
    }, []);

    // Revisar si proyectos tiene contenido
    if(proyectos.length === 0) return null;

    return (
        <ul className="listado-proyectos">

            {
                proyectos.map(proyecto => {
                        return(
                            <Proyecto
                                key={proyecto.id}
                                proyecto={proyecto}
                            />
                        );
                    }
                )
            }

        </ul>
    );
}

export default ListadoProyectos;