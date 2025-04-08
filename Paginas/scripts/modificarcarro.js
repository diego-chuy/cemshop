// Obtener referencias a los elementos del formulario
const idInput = document.querySelector('.input-group input');
const btnBuscar = document.getElementById('btnBuscar');
const marcaInput = document.getElementById('marca');
const lineaInput = document.getElementById('Linea');
const yearInput = document.getElementById('year');
const precioInput = document.getElementById('precio');
const colorInput = document.getElementById('color');
const kilometrajeInput = document.getElementById('kilometraje');
const transmisionInput = document.getElementById('transmision');
const motorInput = document.getElementById('motor');
const tipoInput = document.getElementById('tipo');
const urlImagenInput = document.getElementById('urlImagen');
const btnModificar = document.getElementById('btn_mod');

// URL de la API
const apiUrl = 'http://localhost:3000';

// Función para cargar los datos del carro en el formulario
function cargarDatosCarro(carro) {
  marcaInput.value = carro.marca;
  lineaInput.value = carro.linea;
  yearInput.value = carro.ano;
  precioInput.value = carro.precio;
  colorInput.value = carro.color;
  kilometrajeInput.value = carro.kilometraje;
  transmisionInput.value = carro.transmision;
  motorInput.value = carro.cilindrada;
  tipoInput.value = carro.tipo;
  urlImagenInput.value = carro.fotos[0];
}

// Manejar el evento de clic en el botón de búsqueda
btnBuscar.addEventListener('click', function() {
  const idCarro = idInput.value;

  // Realizar una solicitud GET a la API para obtener los datos del carro
  fetch(`${apiUrl}/vehiculos/${idCarro}`)
    .then(response => response.json())
    .then(data => {
      if (data._id) {
        // Cargar los datos del carro en el formulario
        cargarDatosCarro(data);
      } else {
        alert('No se encontró un carro con el ID especificado.');
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos del carro:', error);
      alert('Error al obtener los datos del carro. Por favor, intenta nuevamente.');
    });
});

// Manejar el evento de clic en el botón de modificar
btnModificar.addEventListener('click', function(event) {
  event.preventDefault();

  const idCarro = idInput.value;
  const marca = marcaInput.value;
  const linea = lineaInput.value;
  const year = yearInput.value;
  const precio = precioInput.value;
  const color = colorInput.value;
  const kilometraje = kilometrajeInput.value;
  const transmision = transmisionInput.value;
  const motor = motorInput.value;
  const tipo = tipoInput.value;
  const urlImagen = urlImagenInput.value;

  // Crear un objeto con los datos modificados del carro
  const carroModificado = {
    marca: marca,
    linea: linea,
    ano: year,
    precio: precio,
    color: color,
    kilometraje: kilometraje,
    transmision: transmision,
    cilindrada: motor,
    tipo: tipo,
    fotos: [urlImagen]
  };

  // Realizar una solicitud PUT a la API para modificar el carro
  fetch(`${apiUrl}/vehiculos/${idCarro}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(carroModificado)
  })
    .then(response => response.json())
    .then(data => {
      if (data._id) {
        alert('Carro modificado exitosamente.');
        // Limpiar los campos del formulario si es necesario
      } else {
        alert('Error al modificar el carro. Por favor, intenta nuevamente.');
      }
    })
    .catch(error => {
      console.error('Error al modificar el carro:', error);
      alert('Error al modificar el carro. Por favor, intenta nuevamente.');
    });
});