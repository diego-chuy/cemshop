/* ==== ESTA ES MI API ==== */

/* ....esto siempre es necesario....  */
const express = require(`express`);
const cors = require(`cors`);
const app = express();
const port = 3000;

//const elMongo = require(`./elMongo.js`); //con esto levantamos todo el codigo 
const LasFuncionesMongolas = require("./elMongo.js"); //aqui agarramos solo las funciones que exportamos desde el moudulo LasFuncionesMongolas. 

/* ---------------------- */
// esto es un middleware, 
// convierte todo lo que viene en el body a Objeto literal...
app.use(express.json()); 
app.use(cors());
app.use(express.static(`Paginas`)); //aqui ponene la carpeta que contiene los archivos....


// CREAMOS TODOS LOS ENDPOINTS


/* ================================================================================ */
/*   ENDPOINTS MONGODB / DB LASI                                        */
/* ================================================================================ */
app.get(`/Mongo/pingMongo` , LasFuncionesMongolas.HacerPing );

/* crea un Objeto, lo rellena con el body, y lo ingresa en la base de datos y coleccion en depnedencia a los parametros */
app.post(`/Mongo/CREAR` , LasFuncionesMongolas.CREAR ); 


app.get(`/Mongo/LEER` , LasFuncionesMongolas.LEER );
// http://localhost:3000/Mongo/LEER?LaDB=CHUY&LaColeccion=CEMBikes


app.put(`/Mongo/MODIFICAR` , LasFuncionesMongolas.MODIFICAR );


app.delete(`/Mongo/ELIMINAR` , LasFuncionesMongolas.ELIMINAR );



/* ================================================================ */
/* LOS GETS */
/* ================================================================ */


app.get(`/`, (req,res) =>{
    // aqui hacemos cosas en dependencia al endPoint

    // conputan lo que sea
    //res.status(200).send(`Bienvenido a mi API - en que te ayudo?`)
    //console.log(`${__dirname}`);
    //res.status(200).sendFile(`${__dirname}/Bienvenida.html`);
    
    res.status(200).sendFile(`${__dirname}/Paginas/MainAdmin.html`); 
                              //ruta actual

});



/* ESTE ES EL DEFAULT.... SI NO ENCENTRA NINGUNO, EJECUTA ESTE...... */
app.use(`*`,(req,res) =>{
    // aqui hacemos cosas en dependencia al endPoint

    // conputan lo que sea
    //res.status(404).send(`SABER ni que estas pidiendo`)
    res.status(200).sendFile(`${__dirname}/Paginas/error.html`);
});


/* AQUI levantamos la API y nos quedamos esperando solicitudes de clientes para resolverlas */

app.listen(port, () =>{
    console.log(`Arrancando api, esperando solicitudes en el puerto ${port}...`);
});