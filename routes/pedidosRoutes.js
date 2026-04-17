const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.get('/', pedidosController.getPedidos);

router.get('/nuevo', pedidosController.getFormularioPedido);

router.post('/guardar', pedidosController.postGuardarPedido);

router.post('/actualizar-estado/:id', pedidosController.postActualizarEstado);

router.post('/eliminar/:id', pedidosController.postEliminarPedido);

module.exports = router;