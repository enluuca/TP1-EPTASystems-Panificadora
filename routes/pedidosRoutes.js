const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');
const authMiddleware = require('../middlewares/authMiddleware');

// Aplicamos barrera de seguridad con JWT para toda la gestión de pedidos
router.use(authMiddleware);

// Rutas GET (Lectura)
router.get('/', pedidosController.getPedidos);
router.get('/nuevo', pedidosController.getFormularioPedido);

// Rutas POST (Acciones) 
router.post('/nuevo', pedidosController.postGuardarPedido); 
router.post('/actualizar/:id', pedidosController.postActualizarEstado); 
router.post('/eliminar/:id', pedidosController.postEliminarPedido); 

module.exports = router;
