const idInput = document.getElementById("inputtexto");
const btn_vender = document.getElementById("btn_vender"); 
const btnBuscar = document.getElementById('btnBuscar');
const cardB = document.getElementById('cardB');

function cargarDatosCarro(carro) {
    cardB.innerHTML = ""; 
    cardB.innerHTML = `<img src="${carro.fotos[0]}" alt="" class="card-img-top w-75 h-75" id="img_card">

    <div class="d-flex justify-content-center ">
        <h2 class="" id="marca_card">${carro.marca}</h2>
        <h2 class="ms-2" id="linea_card">${carro.linea}</h2>
    </div>

    <h4 class="" id="precio_card">${carro.precio}</h4>

    <div class="d-flex justify-content-center ">
        <h5 class="year p-2 " id="year_card">${carro.ano}</h5>
        <h5 class="ms-2 p-2 " id="kilometraje_card">${carro.kilometraje}</h5>
    </div>

    <div class="d-flex justify-content-center">
        <h5 class="" id="transmision_card">${carro.transmision}</h5>
        <h5 class="ms-3 " id="color_card">${carro.color}</h5>
        <h5 class="ms-3 " id="motor_card">${carro.cilindrada}</h5>
        <h5 class="ms-3 " id="tipo_card">${carro.tipo}</h5>
    </div>`; 
}


const apiUrl = 'http://localhost:3000';
btnBuscar.addEventListener('click', function() {
    const idCarro = idInput.value;
    console.log(idCarro);
  
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


// Manejar el evento de clic en el botón de vender
btn_vender.addEventListener('click', function(event) {
    event.preventDefault();
  
    const idCarro = idInput.value;

    // Realizar una solicitud DELETE a la API para eliminar el carro
    fetch(`${apiUrl}/vehiculos/${idCarro}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        if (data._id) {
          alert('Carro vendido exitosamente.');
          cardB.innerHTML = ""; 
        } else {
          alert('Error al vender el carro. Por favor, intenta nuevamente.');
        }
      })
      .catch(error => {
        console.error('Error al vender el carro:', error);
        alert('Error al vender el carro. Por favor, intenta nuevamente.');
      });
  });