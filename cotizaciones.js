
const clientes = JSON.parse(localStorage.getItem("clientes360")) || [];
const productos = JSON.parse(localStorage.getItem("productos360")) || [];

let detalle = [];

const clienteSelect = document.getElementById("cliente");
const productoSelect = document.getElementById("producto");

clientes.forEach((c, i) => {
    clienteSelect.innerHTML +=
        `<option value="${i}">${c.nombre}</option>`;
});

productos.forEach((p, i) => {
    productoSelect.innerHTML +=
        `<option value="${i}">${p.codigo} - ${p.producto}</option>`;
});

document.getElementById("numero").value =
    "COT-" + Date.now().toString().slice(-8);

document.getElementById("fecha").value =
    new Date().toISOString().slice(0, 10);

const formato = n => n.toLocaleString("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

document.getElementById("agregar").addEventListener("click", () => {
    const indice = productoSelect.value;
    const cantidad = Number(document.getElementById("cantidad").value);

    if (indice === "" || !Number.isInteger(cantidad) || cantidad < 1) {
        alert("Selecciona un producto y una cantidad válida.");
        return;
    }

    const p = productos[indice];

    detalle.push({
        codigo: p.codigo,
        nombre: p.producto,
        precio: Number(p.precio),
        cantidad
    });

    mostrarDetalle();
});

function mostrarDetalle() {
    const tabla = document.getElementById("detalle");
    tabla.innerHTML = "";

    let subtotal = 0;

    detalle.forEach((p, i) => {
        const total = p.precio * p.cantidad;
        subtotal += total;

        tabla.innerHTML += `
            <tr>
                <td>${p.nombre}</td>
                <td>${p.cantidad}</td>
                <td>$${formato(p.precio)}</td>
                <td>$${formato(total)}</td>
                <td>
                    <button onclick="eliminarItem(${i})">
                        Quitar
                    </button>
                </td>
            </tr>`;
    });

    const iva = subtotal * 0.19;

    document.getElementById("subtotal").textContent = formato(subtotal);
    document.getElementById("iva").textContent = formato(iva);
    document.getElementById("total").textContent = formato(subtotal + iva);
}

function eliminarItem(i) {
    detalle.splice(i, 1);
    mostrarDetalle();
}

function obtenerCotizacion() {
    const cliente = clientes[clienteSelect.value];

    if (!cliente || detalle.length === 0) {
        alert("Selecciona un cliente y agrega productos.");
        return null;
    }

    const subtotal = detalle.reduce(
        (s, p) => s + p.precio * p.cantidad, 0
    );

    return {
        numero: document.getElementById("numero").value,
        fecha: document.getElementById("fecha").value,
        cliente: cliente.nombre,
        correo: cliente.correo,
        items: detalle,
        subtotal,
        iva: subtotal * 0.19,
        total: subtotal * 1.19
    };
}

document.getElementById("guardar").addEventListener("click", () => {
    const cotizacion = obtenerCotizacion();
    if (!cotizacion) return;

    const historial =
        JSON.parse(localStorage.getItem("cotizaciones360")) || [];

    historial.push(cotizacion);
    localStorage.setItem("cotizaciones360", JSON.stringify(historial));

    alert("Cotización guardada correctamente.");
});

document.getElementById("imprimir").addEventListener("click", () => {
    if (!obtenerCotizacion()) return;
    window.print();
});

document.getElementById("correo").addEventListener("click", () => {
    const c = obtenerCotizacion();
    if (!c) return;

    const asunto = encodeURIComponent("Cotización " + c.numero);
    const cuerpo = encodeURIComponent(
        `Estimado ${c.cliente},\n\n` +
        `Adjuntamos la información de su cotización ${c.numero}.\n` +
        `Total: $${formato(c.total)}\n\n` +
        `Saludos cordiales.`
    );

    window.location.href =
        `mailto:${c.correo}?subject=${asunto}&body=${cuerpo}`;
});
