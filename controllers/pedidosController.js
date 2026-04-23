const Pedido = require('../models/Pedido');
const Cliente = require('../models/Cliente'); 
const Producto = require('../models/Producto');

// 1. Mostrar los pedidos 
exports.getPedidos = (req, res) => {
    // Leemos todos los datos de los 3 archivos JSON de forma síncrona
    const pedidos = Pedido.fetchAll();
    const clientes = Cliente.fetchAll(); 
    const productos = Producto.fetchAll();

    // Cruzamos los IDs guardados en el pedido con los datos reales del cliente y los productos
    const pedidosCompletos = pedidos.map(pedido => {
        
        // Buscamos los datos completos del cliente que hizo el pedido
        const clienteDatos = clientes.find(c => c.id == pedido.sucursal) || { nombre: 'Sucursal desconocida' };
        
        // Buscamos los datos detallados de cada producto incluido en el pedido
        const productosDatos = pedido.productos.map(prodId => 
            productos.find(p => p.id == prodId) || { nombre: 'Producto desconocido' }
        );

        return {
            ...pedido,
            cliente: clienteDatos,
            productosDetalle: productosDatos
        };
    });

    // Enviamos los datos combinados a la vista Pug
    res.render('pedidos', {
        title: 'Listado de Pedidos - La Espiga de Oro',
        pedidos: pedidosCompletos
    });
};

// 2. Mostrar el formulario de carga para crear un registro
exports.getFormularioPedido = (req, res) => {
    res.render('nuevo-pedido', { title: 'Cargar Nuevo Pedido' });
};

// 3. Recibir los datos del formulario y guardarlos (ALTA)
exports.postGuardarPedido = (req, res) => {
    const { sucursal, productos } = req.body;
    const listaProductos = productos.split(',').map(p => p.trim());

    // Validación de referencias
    const clientes = Cliente.fetchAll();
    const existeCliente = clientes.some(c => c.id == sucursal);
    
    if (!existeCliente) {
        return res.status(400).send("Error: El ID de la sucursal no existe en la base de datos.");
    }

    const nuevoPedido = new Pedido(Date.now(), sucursal, listaProductos);
    nuevoPedido.save();
    res.redirect('/pedidos'); 
};
    
    // Ejecutamos el método síncrono para guardar en el JSON
    nuevoPedido.save();
    
    // Redirigimos al usuario nuevamente a la lista de pedidos
    res.redirect('/pedidos'); 
};

// 4. Actualizar el estado de un pedido (MODIFICACIÓN)
exports.postActualizarEstado = (req, res) => {
    const pedidoId = req.params.id;
    const nuevoEstado = req.body.nuevoEstado;

    // Actualizamos el estado utilizando el método de clase estático
    const actualizado = Pedido.updateStatus(pedidoId, nuevoEstado);
    
    if (!actualizado) {
        console.log("Error: Pedido no encontrado");
    }
    
    res.redirect('/pedidos');
};

// 5. Eliminar un pedido (BAJA)
exports.postEliminarPedido = (req, res) => {
    const pedidoId = req.params.id;
    
    // Eliminamos el registro utilizando el método síncrono
    Pedido.deleteById(pedidoId);
    
    res.redirect('/pedidos');
};