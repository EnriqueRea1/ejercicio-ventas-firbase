const Venta = require("../modelos/VentaModelo");
const ventasBD = require("./conexion").ventas;
const usuariosBD = require("./conexion").usuarios;
const productosBD = require("./conexion").productos;

async function validarRelacion(idUsuario, idProducto) {
    const usuario = await usuariosBD.doc(idUsuario).get();
    const producto = await productosBD.doc(idProducto).get();
    return usuario.exists && producto.exists;
}

async function mostrarVentas() {
    const ventas = await ventasBD.get();
    let ventasValidas = [];
    
    ventas.forEach(venta => {
        const venta1 = new Venta({ id: venta.id, ...venta.data() });
        ventasValidas.push(venta1.getVenta);
    });
    
    return ventasValidas;
}

async function buscarVentaPorID(id) {
    const venta = await ventasBD.doc(id).get();
    return venta.exists ? new Venta({ id: venta.id, ...venta.data() }).getVenta : null;
}

async function nuevaVenta(data) {
    const { idUsuario, idProducto, cantidad } = data; // Solo necesitamos estos tres campos
    let ventaValida = false;

    // Validar que el usuario y el producto existen
    if (await validarRelacion(idUsuario, idProducto)) {
        const nuevaVenta = new Venta({ idUsuario, idProducto, cantidad });
        await ventasBD.doc().set(nuevaVenta.getVenta);  // Crear la nueva venta con los valores predeterminados
        ventaValida = true;
    }
    
    return ventaValida;
}

async function actualizarEstatusVenta(id, nuevoEstatus) {
    const venta = await buscarVentaPorID(id);
    
    if (venta) {
        // Actualizamos solo el estatus
        await ventasBD.doc(id).update({ estatus: nuevoEstatus });
        return true;
    }
    return false;
}

module.exports = {
    mostrarVentas,
    buscarVentaPorID,
    nuevaVenta,
    actualizarEstatusVenta
};
