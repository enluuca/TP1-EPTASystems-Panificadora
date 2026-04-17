const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'data', 'pedidos.json');

class Pedido {
    constructor(id, sucursal, productos, estado = 'Pendiente') {
        this.id = id;
        this.sucursal = sucursal;
        this.productos = productos; 
        this.estado = estado;
        this.fecha = new Date().toLocaleDateString();
    }

    static fetchAll(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) return cb([]);
            try {
                // Manejamos el caso de archivo vacío
                if (fileContent.length === 0) return cb([]);
                cb(JSON.parse(fileContent));
            } catch (e) {
                cb([]);
            }
        });
    }

    save() {
        fs.readFile(p, (err, fileContent) => {
            let pedidos = [];
            if (!err && fileContent.length > 0) {
                try {
                    pedidos = JSON.parse(fileContent);
                } catch(e) { pedidos = []; }
            }
            pedidos.push(this);
            fs.writeFile(p, JSON.stringify(pedidos, null, 2), (err) => {
                if (err) console.log("Error al guardar:", err);
            });
        });
    }

    static updateStatus(id, nuevoEstado, cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) return cb(err);
            let pedidos = JSON.parse(fileContent);
            
            // Usamos == para no tener problemas de String vs Number
            const index = pedidos.findIndex(p => p.id == id);
            
            if (index !== -1) {
                pedidos[index].estado = nuevoEstado;
                fs.writeFile(p, JSON.stringify(pedidos, null, 2), (err) => cb(err));
            } else {
                cb("Pedido no encontrado");
            }
        });
    }

    static deleteById(id, cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) return cb(err);
            
            let pedidos = [];
            try {
                pedidos = JSON.parse(fileContent);
            } catch(e) { return cb(e); }

            // CORRECCIÓN 1: Aseguramos que la comparación sea efectiva
            // Filtramos: "Dejame todos los que NO tengan este ID"
            const pedidosActualizados = pedidos.filter(p => p.id.toString() !== id.toString());
            
            // CORRECCIÓN 2: Evitamos guardar basura si algo sale mal
            fs.writeFile(p, JSON.stringify(pedidosActualizados, null, 2), (err) => {
                cb(err);
            });
        });
    }
}

module.exports = Pedido;