/* 

Este es un archivo super optimizado para conectarnos a cualquier cluster de mongodb

Cuando lo mandemos a levantar, debemos colocar el usuario, la contrasenia y el cluster a usar,
una vez colocado eso, ya podemos hacer uso del crud al 100%, la verdad que soy un maldito jaja


*/


const { MongoClient, ServerApiVersion, ClientSession } = require('mongodb');
// ===============================================================================================================
// ==================  DATOS DE MIS BASES DE DATOS / CLUSTER / CLAVE/ USUARIO/ COLECCION =========================
// ===============================================================================================================

const InfoMongo_Cluster_user_pss = {
    ElUsuario: `ingdiegochuy`, //importantisimo
    LaClave: `ingdiegochuy`, //importantisimo
    ElCluster: `Galileo`, //importantisimo
    DB: `CHUY`, // solo se usa en el ping... 
    Coleccion: `CEMBikes` // realmente no se usa... pero aqui lo dejare
}


// ==================================================================
// ==================  FUNCIONES A EXPORTAR =========================
// ==================================================================

const LasFuncionesMongolas = {

    /* OJO: en los parametros debe venir el nombre de la base de datos y coleccion bajo los siguientes nombres:
            LaDB
            LaColeccion
            body , el body debe venir debidamente lleno
    */
    // CREATE / CREAR / INSERTAR UNO NUEVO - TODO EN UNO PERRO
    /* ejemplo que se debe poner en postman
    puedecambiar                          aqui             aqui -------------> y en el body
    http://localhost:3000/Mongo/CREAR?LaDB=LASI&LaColeccion=Alumnos_Progra5
    body> 
            {
            "Nombre": "Diego",
            "Apellido": "Chuy",
            "Edad":30
            }
    */
    CREAR: async (req, res) => {
        console.log(`estan creando en mongo...`);

        let { LaDB, LaColeccion } = req.query; // asi deben llamarse los parametros.. OJO: LaDB, LaColeccion
        let { body } = req; // asi deben llamarse los parametros.. OJO: body
        try {
            let resultado = await Crear(CrearCliente(InfoMongo_Cluster_user_pss), body, LaDB, LaColeccion);
            res.status(201).send(resultado);
            console.log(resultado);
            
        }
        catch (e) {
            res.status(201).send(`Error al ingresar nuevo dato!!!${LaDB}\n${LaColeccion}\n${body} \n\n${e}`);
        }

    }


    ,
    //READ / LEER/ BUSCAR - TODO EN UNO PERRO
    LEER: async (req, res) => {
        console.log(`estan leyendo en mongo...`);
        let { LaDB, LaColeccion, LaPropiedad, ValorPropiedad } = req.query; // asi deben llamarse los parametros.. OJO: LaDB, LaColeccion
        
        if (LaDB && LaColeccion) { //validamos existencia de db y coleccion
            if (LaPropiedad && ValorPropiedad) { // validamos si vamos a buscar por propiedad y valor ... de lo contrario buscamos todo
                /* URL para probarlo
                puedecambiar                          aqui             aqui                        aqui                  aqui
                http://localhost:3000/Mongo/LEER?LaDB=LASI&LaColeccion=Alumnos_Progra5&LaPropiedad=Nombre&ValorPropiedad=Josue
                */
                // el await es necesario.. sino truena
                res.status(200).send(await Buscar(CrearCliente(InfoMongo_Cluster_user_pss), LaPropiedad, ValorPropiedad, LaDB, LaColeccion));
            } else {
                /* URL para probarlo
                puedecambiar                          aqui             aqui            
                http://localhost:3000/Mongo/LEER?LaDB=LASI&LaColeccion=Alumnos_Progra5
                */

                // el await es necesario, sino, no logra enviar "nada", pero es porque lo hace rapido.. 
                res.status(200).send(await Buscar(CrearCliente(InfoMongo_Cluster_user_pss), null, null, LaDB, LaColeccion));
            }
        } else {
            res.status(201).send(`Error en la busqueda, no tiene DB o Collection !!! \n\n MIRE -> db-${LaDB} -> colection- ${LaColeccion}`);
        }
    }
    ,

    MODIFICAR: async (req, res) => {
        console.log(`estan modificando en mongo...`);

        let { LaDB, LaColeccion, LaPropiedad, ElValor } = req.query; // asi deben llamarse los parametros.. OJO: LaDB, LaColeccion
        let { body } = req; // asi deben llamarse los parametros.. OJO: body
        try {
            /* URL para probarlo
            puedecambiar                              aqui             aqui                    aqui            aqui
            http://localhost:3000/Mongo/MODIFICAR?LaDB=IME&LaColeccion=Alumnos_CC2&LaPropiedad=Nombre&ElValor=Diego

                body> 
            {
                "Nombre": "Diego",
                "Apellido": "Chuy",
                "Edad":30
            }
                SI LO ENCUENTRA SEGUN LA PROPIEDAD Y VALOR, REEMPLAZA TODO TODO
            */
            let resultado = await Modificar(CrearCliente(InfoMongo_Cluster_user_pss), LaDB, LaColeccion, LaPropiedad, ElValor, body);
            res.status(201).send((resultado === 0) ? `No se ingreso correctamente...` : `Todo nitido en la modificacion...`);
        }
        catch (e) {
            res.status(201).send(`Error al ingresar nuevo dato!!!${LaDB}\n${LaColeccion}\n${body} \n\n${e}`);
        }
    },
    ELIMINAR: async (req, res) => {
        console.log(`estan eliminando en mongo...`);

        let { LaDB, LaColeccion, LaPropiedad, ElValor } = req.query; // asi deben llamarse los parametros.. OJO: LaDB, LaColeccion
        try {
            /* URL para probarlo
            puedecambiar                          aqui             aqui                    aqui            aqui
            http://localhost:3000/Mongo/ELIMINAR?LaDB=IME&LaColeccion=Alumnos_CC2&LaPropiedad=Nombre&ElValor=Diego
            */
            let resultado = await Eliminar(CrearCliente(InfoMongo_Cluster_user_pss), LaDB, LaColeccion, LaPropiedad, ElValor);
            res.status(204).send(`Ya lo eliminé`)
        }
        catch (e) {
            res.status(201).send(`Error al ingresar nuevo dato!!!${LaDB}\n${LaColeccion}\n${body} \n\n${e}`);
        }

    },
    HacerPing: async (req, res) => {
        await haciendoPing(CrearCliente(InfoMongo_Cluster_user_pss), InfoMongo_Cluster_user_pss);
        res.status(200).send(`exito con el ping!`);

    }
}


/* ---------------------------------------- */
const CrearCliente = ({ ElUsuario, LaClave, ElCluster }) => {

    //const uri = `mongodb+srv://${ElUsuario}:${LaClave}@galileo.xtfjy.mongodb.net/?retryWrites=true&w=majority&appName=${ElCluster}`;
    //const uri = `mongodb+srv://${ElUsuario}:${LaClave}@galileo.1gvnw.mongodb.net/?retryWrites=true&w=majority&appName=${ElCluster}`;
    const uri = `mongodb+srv://${ElUsuario}:${LaClave}@galileo.1gvnw.mongodb.net/?retryWrites=true&w=majority&appName=${ElCluster}`;
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    console.log(`\n========= ya tenemos las credenciales y el cliente... demosle viaje a mongo ========= \n`);
    return client;

}
/* ---------------------------------------- */

/* ============== =================== ================ */
/* ============== TODAS LAS FUNCIONES ================ */
/* ============== =================== ================ */

/* ----------------------HACIENDO PING ---------------------- */
async function haciendoPing(client, { DB }) {
    try {
        await client.connect();
        await client.db(DB).command({ ping: 1 });
        console.log("Se hizo ping a tu implementación. Te conectaste correctamente a MongoDB!");
    } catch (e) {
        console.log(`Hubo un clavo haciendo ping a la Mongo`);
    } finally {
        await client.close();
    }
    // Send a ping to confirm a successful connection
};

/* ------------------ OBTENER BASES EXISTESNTES ----------------- */
async function listadoBasesDatos(client) {
    basesDatos = await client.db().admin().listDatabases();

    //console.log(basesDatos); //solo para ver que trae
    //console.log(`Las bases de datos existentes son:\n`);

    basesDatos.databases.forEach(db => console.log(` - ${db.name}`));

};

/* --------------------------------- AQUI EMPIEZA EL CRUD ------------------------------- */

/* ========================================================================================*/
/* =================== CREAR UNO ==========================================================*/
async function Crear(client, nuevoDato, NombreDB, NombreColeccion) {
    let resultado;
    try {
        //OJO: el nuevoDato ya deberia venir con el formato correcto... 
        await client.connect();
        console.log(`Crear`);
        console.log(NombreDB);
        console.log(NombreColeccion);
        console.log(nuevoDato);
        console.log((JSON.stringify(nuevoDato) === `{}`) ? "vacio" : "datos");

        if (JSON.stringify(nuevoDato) !== `{}` && NombreDB && NombreColeccion)
            resultado = await client.db(NombreDB).collection(NombreColeccion).insertOne(nuevoDato);
        else if (NombreDB && NombreColeccion)
            resultado = await client.db(NombreDB).collection(NombreColeccion);
        else if (NombreDB)
            resultado = await client.db(NombreDB)
        console.log(resultado);

    } catch (e) {
        console.log(`Hubo un clavo creando un dato nuevo a Mongo\n\n${e}`);
    } finally {
        await client.close();
    }
    return resultado;

}



/* == BUSCAR ====================*/
/* == BUSCAR POR NOMBRE Por propiedad y valor====================*/
async function Buscar(client, LaPropiedad, Valor, NombreDB, NombreColeccion) {
    let losDatos = -1;
    //              si es verdadero... buscamos por todo, sino, por propiedad y valor

    let buscarPor = {};

    //consoles necesario para entender como funciona esta fucking shit
    console.log(Valor);
    console.log((parseInt(Valor)));
    console.log(isNaN((parseInt(Valor))));
    console.log(typeof (parseInt(Valor)));

    //este if valida si la busqueda es de tipo numerico o de tipo texto.... 
    // me costo un huevo, porque si buscaban por numero, el numero entraba como '22222' texto y no buscaba..
    // con este if, si no se puede convertir a numero, da NAN, osea! es texto
    if (isNaN((parseInt(Valor))))
        buscarPor = (LaPropiedad == null) ? {} : JSON.parse(`{ "${LaPropiedad}" : "${Valor}" }`);
    else
        buscarPor = (LaPropiedad == null) ? {} : JSON.parse(`{ "${LaPropiedad}" : ${parseInt(Valor)} }`);

    //buscarPor = (LaPropiedad == null) ? {} : JSON.parse(`{ "${LaPropiedad}" : ${parseInt(Valor)} }`);

    console.log(`leyendo`);
    console.log(typeof (parseInt(Valor)));
    console.log(buscarPor);
    console.log(NombreDB);
    console.log(NombreColeccion);
    console.log(LaPropiedad);
    console.log(Valor);
    try {
        await client.connect();


        const resultado = await client.db(NombreDB).collection(NombreColeccion).find(buscarPor);

        losDatos = await resultado.toArray();
        //    console.log(losDatos);

        /* 
        losDatos.forEach(registro => {
            console.log(registro.Nombre);
            }) 
            */
    } catch (e) {
        console.log(`Hubo un clavo Pidiendo por Propiedad y Valor a la coleccion ${NombreColeccion} Mongo`);
    } finally {
        await client.close();
    }


    console.log(losDatos);
    return losDatos;

}


/* ======================================================================================================*/
/* == MODIFICAR =========================================================================================*/
async function Modificar(client, NombreDB, NombreColeccion, LaPropiedad, ElValor, nuevaData) {
    let resultado = 0;
    try {
        console.log(`Modificando`);
        console.log(NombreDB);
        console.log(NombreColeccion);
        console.log(LaPropiedad);
        console.log(ElValor);
        console.log(nuevaData);
        await client.connect();
        resultado = await client.db(NombreDB).collection(NombreColeccion).updateOne(
            JSON.parse(`{ "${LaPropiedad}" : "${ElValor}" }`), { $set: nuevaData }
        );
        //console.log(`modificado con exito!`);

    } catch (e) {
        console.log(`Hubo un clavo al modificar el dato con la propiedad ${LaPropiedad} y valor ${ElValor} en la coleccion ${NombreColeccion} en Mongo`);
    } finally {
        await client.close();
    }
    return resultado;
}

/* ========================================================================================================*/
/* == ELIMINAR ============================================================================================*/
async function Eliminar(client, NombreDB, NombreColeccion, LaPropiedad, ElValor) {
    try {
        console.log(`Eliminando`);
        console.log(NombreDB);
        console.log(NombreColeccion);
        console.log(LaPropiedad);
        console.log(ElValor);
        await client.connect();

        const resultado = await client.db(NombreDB).collection(NombreColeccion).deleteOne(JSON.parse(`{ "${LaPropiedad}" : "${ElValor}" }`));
        //console.log(`El dato ${LaPropiedad} : ${ElValor} ha sido eliminado con exito!!`);
    } catch (e) {
        console.log(`Hubo un clavo creando un dato nuevo a Mongo`);
    } finally {
        await client.close();
    }


}

module.exports = LasFuncionesMongolas;

