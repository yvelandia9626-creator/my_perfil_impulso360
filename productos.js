
let productos = JSON.parse(localStorage.getItem("productos360")) || [];

const formulario = document.getElementById("productoForm");
const lista = document.getElementById("listaProductos");

function mostrarProductos(filtro = "") {
    lista.innerHTML = "";

    productos.forEach((p, i) => {
        if ((p.producto + p.codigo).toLowerCase()
            .includes(filtro.toLowerCase())) {
            lista.innerHTML += `
                <tr>
                    <td>${p.codigo}</td>
                    <td>${p.producto}</td>
                    <td>${p.unidad}</td>
                    <td>${Number(p.costo).toLocaleString("es-CO")}</td>
                    <td>${Number(p.precio).toLocaleString("es-CO")}</td>
                    <td>
                        <button onclick="eliminarProducto(${i})">
                            Eliminar
                        </button>
                    </td>
                </tr>`;
        }
    });
}

formulario.addEventListener("submit", e => {
    e.preventDefault();

    productos.push({
        codigo: document.getElementById("codigo").value.trim(),
        producto: document.getElementById("producto").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        unidad: document.getElementById("unidad").value,
        costo: Number(document.getElementById("costo").value),
        precio: Number(document.getElementById("precio").value)
    });

    localStorage.setItem("productos360", JSON.stringify(productos));
    mostrarProductos();
    formulario.reset();
});

function eliminarProducto(i) {
    if (confirm("¿Eliminar producto?")) {
        productos.splice(i, 1);
        localStorage.setItem("productos360", JSON.stringify(productos));
        mostrarProductos();
    }
}

document.getElementById("buscarProducto")
    .addEventListener("input", e => mostrarProductos(e.target.value));

mostrarProductos();
