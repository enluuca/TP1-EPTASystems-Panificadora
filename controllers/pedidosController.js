const Pedido = require('../models/Pedido');
const Cliente = require('../models/Cliente');
const Producto = require('../models/Producto');

// 1. Mostrar los pedidos (Cruzado con MongoDB)
exports.getPedidos = async (req, res) => {
    try {
        // .populate() reemplaza los .map() y .find() manuales que haciamos antes.
        // Trae los datos reales de la colección 'Cliente' y 'Producto' basándose en los IDs.
        const pedidos = await Pedido.find()
            .populate('sucursal')
            .populate('productos');

        res.render('pedidos', {
            title: 'Listado de Pedidos - La Espiga de Oro',
            pedidos: pedidos
        });
    } catch (error) {
        console.error("Error al obtener pedidos:", error);
        res.status(500).render('error', { 
            mensaje: "Error interno al cargar la lista de pedidos de MongoDB." 
        });
    }
};

// 2. Mostrar el formulario de carga
exports.getFormularioPedido = async (req, res) => {
    try {
        // Obtenemos clientes y productos de la DB para las opciones del formulario
        const clientes = await Cliente.find();
        const productos = await Producto.find();

        res.render('nuevo-pedido', { 
            title: 'Cargar Nuevo Pedido',
            clientes: clientes,       
            productos: productos      
        });
    } catch (error) {
        res.status(500).render('error', { mensaje: "Error al cargar datos para el formulario." });
    }
};

// 3. Recibir los datos del formulario y guardarlos (ALTA)
exports.postGuardarPedido = async (req, res) => {
    try {
        const { sucursal, productos } = req.body;

        // 1. Validación simple
        if (!sucursal || !productos) {
            return res.status(400).render('error', { mensaje: "Faltan datos obligatorios." });
        }

        // 2. Procesamos productos (Mongoose maneja el array de IDs directamente)
        // Si vienen varios productos en un select múltiple/checkbox, 'productos' ya es un array.
        // Si no, lo convertimos.
        const listaProductos = Array.isArray(productos) ? productos : [productos];

        // 3. Creamos el nuevo documento con Mongoose
        const nuevoPedido = new Pedido({
            sucursal: sucursal,
            productos: listaProductos,
            estado: 'Pendiente' // El Schema ya suele tener un default, pero lo aclaramos
        });

        // 4. Guardado asincrónico
        await nuevoPedido.save(); 

        res.redirect('/pedidos'); 
    } catch (error) {
        console.error("Error al guardar pedido:", error);
        res.status(400).render('error', { mensaje: "Error de validación: Asegúrese de que los datos sean correctos." });
    }
};

// 4. Actualizar el estado de un pedido (MODIFICACIÓN)
exports.postActualizarEstado = async (req, res) => {
    try {
        const pedidoId = req.params.id;
        const { nuevoEstado } = req.body;

         // findByIdAndUpdate es el método estándar de Mongoose para esto
        const actualizado = await Pedido.findByIdAndUpdate(pedidoId, { estado: nuevoEstado });
        
        if (!actualizado) {
            return res.status(404).render('error', { mensaje: "Pedido no encontrado." });
        }
        
        res.redirect('/pedidos');
    } catch (error) {
        res.status(500).render('error', { mensaje: "Error al actualizar el estado del pedido." });
    }
};

// 5. Eliminar un pedido (BAJA)
exports.postEliminarPedido = async (req, res) => {
    try {
        const pedidoId = req.params.id;
        
        await Pedido.findByIdAndDelete(pedidoId);
        
        res.redirect('/pedidos');
    } catch (error) {
        res.status(500).render('error', { mensaje: "Error al intentar eliminar el pedido." });
    }
};