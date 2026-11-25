
if (!sessionStorage.getItem("impulso360_usuario")) {
    window.location.href = "index.html";
}

const clientes = JSON.parse(
    localStorage.getItem("clientes360")
) || [];

const productos = JSON.parse(
    localStorage.getItem("productos360")
) || [];

const cotizaciones = JSON.parse(
    localStorage.getItem("cotizaciones360")
) || [];

document.getElementById("totalClientes").textContent = clientes.length;
document.getElementById("totalProductos").textContent = productos.length;
document.getElementById("totalCotizaciones").textContent =
    cotizaciones.length;
