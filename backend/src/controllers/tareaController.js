// ***** Tareas: Funciones de Peticiones ***** //
const Tarea = require('./../models/Tarea');
const Proyecto = require('./../models/Proyecto');
const { validationResult } = require('express-validator');

const tareasCtrl = {};

// *+*+*+*+* Inicio: POST - CREATE => crearTarea *+*+*+*+* //
tareasCtrl.crearTarea = async(req, res) => {
    console.log('Desde tareaController: crearTarea');
    console.log(req.body);

    // Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {

        const { proyecto } = req.body; // Extraer el proyecto y comprobar si existe

        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        if (existeProyecto.creador.toString() !== req.usuario.id) { // Revisar si el proyecto actual pertenece al usuario autenticado
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        const tarea = new Tarea(req.body); // Creamos la tarea
        await tarea.save();
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
// *+*+*+*+* GET - READ => obtenerTareas *+*+*+*+* //
tareasCtrl.obtenerTareas = async(req, res) => {
    console.log('Desde tareaController: obtenerTareas');
    console.log(req.body);

    try {

        const { proyecto } = req.body; // Extraer el proyecto y comprobar si existe

        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        if (existeProyecto.creador.toString() !== req.usuario.id) { // Revisar si el proyecto actual pertenece al usuario autenticado
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        const tareas = await Tarea.find({ proyecto }); //  Obtener las tareas por proyecto
        res.json({ tareas });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// *+*+*+*+* PUT - UPDATE => actualizarTarea*+*+*+*+* //
tareasCtrl.actualizarTarea = async(req, res) => {
    console.log('Desde tareaController: actualizarTarea');
    console.log(req.body);

    try {

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// *+*+*+*+* DELETE - DELETE => eliminarTarea *+*+*+*+* //
tareasCtrl.eliminarTarea = async(req, res) => {
    console.log('Desde tareaController: eliminarTarea');
    console.log(req.body);

    try {

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

module.exports = tareasCtrl;