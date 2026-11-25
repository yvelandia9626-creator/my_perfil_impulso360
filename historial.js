
const historial = JSON.parse(
    localStorage.getItem("cotizaciones360")
) || [];

const tabla = document.getElementById("historial");

function mostrar(filtro = "") {
    tabla.innerHTML = "";

    historial.forEach((c, i) => {
        const texto = (c.numero + c.cliente).toLowerCase();

        if (texto.includes(filtro.toLowerCase())) {
            const total = Number(c.total).toLocaleString("es-CO");

            tabla.innerHTML += `
                <tr>
                    <td>${c.numero}</td>
                    <td>${c.fecha}</td>
                    <td>${c.cliente}</td>
                    <td>$${total}</td>
                    <td>
                        <button onclick="imprimir(${i})">
                            Imprimir
                        </button>
                    </td>
                </tr>`;
        }
    });
}

function imprimir(i) {
    const c = historial[i];

    const ventana = window.open("", "_blank");

    if (!ventana) {
        alert("Permite las ventanas emergentes para imprimir.");
        return;
    }

    const filas = c.items.map(p => `
        <tr>
            <td>${p.nombre}</td>
            <td>${p.cantidad}</td>
            <td>$${Number(p.precio).toLocaleString("es-CO")}</td>
            <td>$${(p.cantidad * p.precio).toLocaleString("es-CO")}</td>
        </tr>
    `).join("");

    ventana.document.write(`
        <html>
        <head>
            <title>Cotización ${c.numero}</title>
            <style>
                body { font-family: Arial; padding: 35px; color: #183251; }
                h1 { color: #0b1d38; }
                table { width: 100%; border-collapse: collapse; }
                td, th { padding: 12px; border-bottom: 1px solid #ddd; }
                .total { text-align: right; margin-top: 25px; }
            </style>
        </head>
        <body>
            <h1>IMPULSO360</h1>
            <h2>COTIZACIÓN ${c.numero}</h2>
            <p>Fecha: ${c.fecha}</p>
            <p>Cliente: ${c.cliente}</p>
            <table>
                <thead>
                    <tr><th>Producto</th><th>Cantidad</th>
                    <th>Precio</th><th>Total</th></tr>
                </thead>
                <tbody>${filas}</tbody>
            </table>
            <div class="total">
                <p>Subtotal: $${Number(c.subtotal).toLocaleString("es-CO")}</p>
                <p>IVA: $${Number(c.iva).toLocaleString("es-CO")}</p>
                <h2>Total: $${Number(c.total).toLocaleString("es-CO")}</h2>
            </div>
            <script>
                window.onload = function() {
                    window.print();
                };
            <\/script>
        </body>
        </html>
    `);

    ventana.document.close();
}

document.getElementById("buscar").addEventListener("input", e => {
    mostrar(e.target.value);
});

mostrar();
