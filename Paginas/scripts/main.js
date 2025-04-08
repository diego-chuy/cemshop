// URL de la API
const apiUrl = 'http://localhost:3000/usuarios';

// Obtener referencias a los elementos HTML
const usuarioInput = document.getElementById("login-email");
const contraseñaInput = document.getElementById("login-pass");
const btnLogin = document.getElementById("btn_Login");

// Función para manejar el evento click del botón de inicio de sesión
btnLogin.addEventListener("click", function (event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Variables para almacenar los valores de usuario y contraseña
  const usuario = usuarioInput.value;
  const contraseña = contraseñaInput.value;

  // Realizar una solicitud fetch para iniciar sesión
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const usuarioEncontrado = data.find(user => user.correo === usuario && user.contrasena === contraseña);
      // Si se encuentra un usuario
      if (usuarioEncontrado) {
          // Redirigir según el rol del usuario
          if (usuarioEncontrado.rol === "administrador") {
              window.location.href = "MainAdmin.html";
          } else if (usuarioEncontrado.rol === "cliente") {
              window.location.href = "buscarUser.html";
          } else {
              // Si el rol no es reconocido, mostrar un mensaje de error
              alert("Rol de usuario no reconocido");
          }
      } else {
          // Si no se encuentra ningún usuario, mostrar un mensaje de error
          alert("¡Inicio de sesión fallido! Por favor, verifica tu usuario y contraseña.");
      }
    })
    .catch(error => {
      // Manejar errores de red u otros errores
      console.error("Error al iniciar sesión", error);
      alert("Error al iniciar sesión");
    });
});

/*=============== Esconder la contraseña ===============*/
const showHiddenPass = (loginPass, loginEye) => {
  const input = document.getElementById(loginPass),
    iconEye = document.getElementById(loginEye);

  iconEye.addEventListener("click", () => {
    // Change password to text
    if (input.type === "password") {
      // Switch to text
      input.type = "text";
      // Icon change
      iconEye.classList.add("ri-eye-line");
      iconEye.classList.remove("ri-eye-off-line");
    } else {
      // Change to password
      input.type = "password";
      // Icon change
      iconEye.classList.remove("ri-eye-line");
      iconEye.classList.add("ri-eye-off-line");
    }
  });
};

showHiddenPass("login-pass", "login-eye");