
const formulario = document.getElementById("clienteForm");
const lista = document.getElementById("listaClientes");

let clientes = JSON.parse(localStorage.getItem("clientes360")) || [];

function guardar() {
    localStorage.setItem("clientes360", JSON.stringify(clientes));
}

function mostrarClientes(filtro = "") {
    lista.innerHTML = "";

    clientes.filter(c =>
        c.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        c.documento.includes(filtro)
    ).forEach((c, i) => {
        lista.innerHTML += `
            <tr>
                <td>${c.nombre}</td>
                <td>${c.documento}</td>
                <td>${c.telefono}</td>
                <td>${c.correo}</td>
                <td>
                    <button onclick="eliminarCliente(${i})">
                        Eliminar
                    </button>
                </td>
            </tr>`;
    });
}

formulario.addEventListener("submit", e => {
    e.preventDefault();

    clientes.push({
        nombre: document.getElementById("nombre").value.trim(),
        documento: document.getElementById("documento").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        direccion: document.getElementById("direccion").value.trim(),
        ciudad: document.getElementById("ciudad").value.trim()
    });

    guardar();
    mostrarClientes();
    formulario.reset();
});

function eliminarCliente(i) {
    if (confirm("¿Deseas eliminar este cliente?")) {
        clientes.splice(i, 1);
        guardar();
        mostrarClientes();
    }
}

document.getElementById("buscar").addEventListener("input", e => {
    mostrarClientes(e.target.value);
});

mostrarClientes();
