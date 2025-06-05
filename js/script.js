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

//Proceso para agregar registros
const modal = document.getElementById("mdAgregar");//Cuadro de dialogo
const btnAgregar= document.getElementById("btnAgregar");
const btnCerrar= document.getElementById("btnCerrarModal");


btnAgregar.addEventListener("click", ()=>{
modal.showModal();//Abre el modal cuando a btnAgregar se le hace clic

});


btnCerrar.addEventListener("click",()=>{
modal.close();//Cierra el modal

});

//Agregar un nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //Evita que los datos se envíen por defecto


    //Capturar los valores del formulario 
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();

    //Validacion basica
    if(!nombre || !apellido || !correo){
        alert("Complete todos los campos");
        return; //Evita que el codigo se siga ejecutando 

    }

    //Llamar a la API para enviar los datos 
    const respuesta = await fetch(API_URL, {
        method:"POST",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({nombre,apellido,correo})

    });
    if(respuesta.ok){
        alert ("El registro fue agregado correctamente");

        //Limpiar formulario
        document.getElementById("frmAgregar").reset();

        //cerrar el formulario
        modal.close();

        //recargar tabla
        ObtenerRegistros();
    }
    else{
        alert("Hubo un error al guardar");
    }

});
