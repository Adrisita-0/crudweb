//Direccio del EndPoint generado en Retool
const API_URL = "https://retoolapi.dev/jk6mJA/Integrantes";
//funcion que llamaa la API y reaiza una solicitud GET. obtiene un JSON
async function ObtenerRegistros(){
    //Hacemos GET a la API servidor y obtenemos su respuesta (response)
        const respuesta = await fetch(API_URL);

        //Obtenemos los datos en formato JSON a parti de la respuesta
        const data = await respuesta.json(); //Esto ya es un JSON
        MostrarRegistros(data)
}

document.addEventListener('DOMContentLoaded', () =>{
    ObtenerRegistros()
})

//Funcion para generar las filas de la tabla
//"datos" representa el JSON
function MostrarRegistros (datos){
    //se llama al elemento tbody dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar codigo HTML usamos innerHTML

    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla 

    //Por cada persona en el JSON se hara lo que sale en las llaves 
    datos.forEach(persona => {
        tabla.innerHTML += `
        <tr>
                    <td>${persona.id}</td>
                    <td>${persona.nombre}</td>
                    <td>${persona.apellido}</td>
                    <td>${persona.correo}</td>
                    <td>
        <button>Editar</button>
        <button>Eliminar</button>
        </td>
        </tr>
        


        `
               
    });
}


