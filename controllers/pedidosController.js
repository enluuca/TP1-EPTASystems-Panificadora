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
    // Leemos los datos desde los archivos JSON mediante los Modelos
    const clientes = Cliente.fetchAll();
    const productos = Producto.fetchAll();

    // Renderizamos la vista pasándole los datos para que arme las opciones
    res.render('nuevo-pedido', { 
        title: 'Cargar Nuevo Pedido',
        clientes: clientes,       
        productos: productos      
    });
};

// 3. Recibir los datos del formulario y guardarlos (ALTA)
exports.postGuardarPedido = (req, res) => {
    const { sucursal, productos } = req.body;


    // 1. Validamos que lleguen datos
    if (!sucursal || !productos) {
        return res.status(400).send("Faltan datos obligatorios.");
    }

    // 2. Procesamos la lista de productos
    const listaProductos = productos.split(',').map(p => p.trim());

    // 3. Validación de referencias (Aseguramos que ambos sean String para comparar)
    const clientes = Cliente.fetchAll();
    const existeCliente = clientes.some(c => String(c.id) === String(sucursal).trim());
    
    if (!existeCliente) {
        // Mostramos por consola qué ID está llegando para debuguear
        console.log(`Error: El ID de sucursal "${sucursal}" no coincide con ninguno en el JSON.`);
        return res.status(400).send(`Error: El ID de la sucursal "${sucursal}" no existe.`);
    }

    // 4. Creamos y guardamos el pedido (UNA SOLA VEZ)
    const nuevoPedido = new Pedido(Date.now(), sucursal, listaProductos);

    nuevoPedido.save(); 

    // 5. Redirigimos (UNA SOLA VEZ)
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