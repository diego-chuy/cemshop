const divCards = document.getElementById("divCards");

window.onload = (event) => {
    cargar_carros();
};

//Funcion para cargar los carros 
function cargar_carros() {
    const api = "http://localhost:3000/Mongo/LEER?LaDB=CHUY&LaColeccion=CEMBikes";
    
    console.log(api);
    
    
    
    fetch(api)
        .then(respuesta => respuesta.ok ? respuesta.json() : Promise.reject(respuesta))
        .then(data => {
            console.log(data[0]._id);
            
            divCards.innerHTML = "";
            data.forEach(element => {
                divCards.innerHTML += `
                <div class="col-sm-6 mb-3 mb-sm-0">
                <div class="card text-center shadow">
                    <div class="card-body">
                        <img src="./scripts/FotosMotos/${element._id}.${element.fotos[0]}" alt="no hay foto men.." class="card-img-top w-75 h-75" id="img_card">

                        <div class="d-flex justify-content-center ">
                            <h2 class="" id="marca_card">${element.marca}</h2>
                            <h2 class="ms-2" id="linea_card">${element.linea}</h2>
                        </div>

                        <h4 class="" id="precio_card">Q${element.precio}</h4>

                        <div class="d-flex justify-content-center ">
                            <h5 class="year p-2 " id="year_card">${element.ano}</h5>
                            <h5 class="ms-2 p-2 " id="kilometraje_card">${element.kilometraje}km</h5>
                        </div>

                        <div class="d-flex justify-content-center">
                            <h5 class="" id="transmision_card">${element.transmision}</h5>
                            <h5 class="ms-3 " id="color_card">${element.color}</h5>
                            <h5 class="ms-3 " id="motor_card">${element.cilindrada}</h5>
                            <h5 class="ms-3 " id="tipo_card">${element.tipo}</h5>
                        </div>
                    </div>
                </div>
            </div>`
            });
          })
        .catch(error => {
            console.error('Error al cargar los datos JSON', error);
        });
        
}

let selectedOption;
const filtro_select = document.getElementById('filtro_select');
filtro_select.addEventListener('change', function () {
    selectedOption = this.options[this.selectedIndex];
});


const btn_buscar = document.getElementById("btnBuscar");
btn_buscar.addEventListener('click', function(){
    const input_texto = document.getElementById("input_texto");
    buscarXfiltro(selectedOption.value, input_texto.value ); 
});


function buscarXfiltro(filtro, texto) {
    const api_filtro = `http://localhost:3000/vehiculos/${filtro}/${texto}`;
    fetch(api_filtro)
        .then(respuesta => respuesta.ok ? respuesta.json() : Promise.reject(respuesta))
        .then(data => {
            divCards.innerHTML = "";
            data.forEach(element => {
                divCards.innerHTML += `
                <div class="col-sm-6 mb-3 mb-sm-0">
                <div class="card text-center shadow">
                    <div class="card-body">
                        <img src="${element.fotos[0]}" alt="" class="card-img-top w-75 h-75" id="img_card">

                        <div class="d-flex justify-content-center ">
                            <h2 class="" id="marca_card">${element.marca}</h2>
                            <h2 class="ms-2" id="linea_card">${element.linea}</h2>
                        </div>

                        <h4 class="" id="precio_card">$${element.precio}</h4>

                        <div class="d-flex justify-content-center ">
                            <h5 class="year p-2 " id="year_card">${element.ano}</h5>
                            <h5 class="ms-2 p-2 " id="kilometraje_card">${element.kilometraje}km</h5>
                        </div>

                        <div class="d-flex justify-content-center">
                            <h5 class="" id="transmision_card">${element.transmision}</h5>
                            <h5 class="ms-3 " id="color_card">${element.color}</h5>
                            <h5 class="ms-3 " id="motor_card">${element.cilindrada}</h5>
                            <h5 class="ms-3 " id="tipo_card">${element.tipo}</h5>
                        </div>
                    </div>
                </div>
            </div>`
            });
          })
        .catch(error => {
            console.error('Error al cargar los datos JSON', error);
        });
}