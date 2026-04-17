const Pedido = require('../models/Pedido');

// 1. Mostrar todos los pedidos
exports.getPedidos = (req, res) => {
    Pedido.fetchAll((pedidos) => {
        res.render('pedidos', {
            title: 'Listado de Pedidos - La Espiga de Oro',
            pedidos: pedidos
        });
    });
};

// 2. Mostrar el formulario de carga
exports.getFormularioPedido = (req, res) => {
    res.render('nuevo-pedido', { title: 'Cargar Nuevo Pedido' });
};

// 3. Recibir los datos del formulario y guardarlos
exports.postGuardarPedido = (req, res) => {
    const { sucursal, productos } = req.body;
    
    const listaProductos = productos.split(',').map(p => p.trim());

    const nuevoPedido = new Pedido(
        Date.now(), 
        sucursal, 
        listaProductos
    );
    
    nuevoPedido.save();
    res.redirect('/pedidos'); 
};

exports.postActualizarEstado = (req, res) => {
    const pedidoId = req.params.id;
    const nuevoEstado = req.body.nuevoEstado;

    Pedido.updateStatus(pedidoId, nuevoEstado, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/pedidos');
    });

    };
exports.postEliminarPedido = (req, res) => {
    const pedidoId = req.params.id;
    Pedido.deleteById(pedidoId, (err) => {
        if (err) console.log(err);
        res.redirect('/pedidos');
    });

};