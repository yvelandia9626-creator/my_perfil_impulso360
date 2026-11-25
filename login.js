
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const mensaje = document.getElementById("mensaje");

    // Credenciales de demostración
    if (usuario === "admin" && password === "123456") {
        sessionStorage.setItem("impulso360_usuario", usuario);
        window.location.href = "dashboard.html";
    } else {
        mensaje.textContent = "Usuario o contraseña incorrectos";
    }
});
