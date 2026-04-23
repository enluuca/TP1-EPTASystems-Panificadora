const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'data', 'pedidos.json');

class Pedido {
    // 1. Declaramos la propiedad privada con #
    #estado; 

    constructor(id, sucursal, productos, estado = 'Pendiente') {
        this.id = id;
        this.sucursal = sucursal;
        this.productos = productos; 
        this.#estado = estado; // Asignamos a la variable privada
        this.fecha = new Date().toLocaleDateString();
    }

    // 2. Getter: Permite leer el estado desde el controlador o la vista 
    get estado() {
        return this.#estado;
    }

    // 3. Setter: Permite modificar el estado con validación 
    set estado(nuevoEstado) {
        this.#estado = nuevoEstado;
    }

    // Método de apoyo para que JSON.stringify pueda leer la propiedad privada al guardar
    toJSON() {
        return {
            id: this.id,
            sucursal: this.sucursal,
            productos: this.productos,
            estado: this.#estado,
            fecha: this.fecha
        };
    }

    static fetchAll() {
        try {
            const fileContent = fs.readFileSync(p, 'utf-8');
            if (fileContent.length === 0) return [];
            return JSON.parse(fileContent);
        } catch (e) {
            return [];
        }
    }

    save() {
        let pedidos = Pedido.fetchAll(); 
        pedidos.push(this); 
        try {
            fs.writeFileSync(p, JSON.stringify(pedidos, null, 2), 'utf-8');
        } catch (err) {
            console.log("Error al guardar:", err);
        }
    }

    static updateStatus(id, nuevoEstado) {
        let pedidos = Pedido.fetchAll();
        const index = pedidos.findIndex(p => p.id == id);
        
        if (index !== -1) {
            pedidos[index].estado = nuevoEstado;
            fs.writeFileSync(p, JSON.stringify(pedidos, null, 2), 'utf-8');
            return true; 
        } else {
            return false; 
        }
    }

    static deleteById(id) {
        let pedidos = Pedido.fetchAll();
        const pedidosActualizados = pedidos.filter(p => p.id.toString() !== id.toString());
        fs.writeFileSync(p, JSON.stringify(pedidosActualizados, null, 2), 'utf-8');
    }
}

module.exports = Pedido;