//npm i --save-dev @types/jquery
/// <reference types="jquery" />

const btnBuscar = $("#btn-buscar");
const numeroInput = $("#numero-input");
//console.log(numeroInput);
const card = $("#card");
const img = $("#img");
const info = $("#info");
const nombre = $("#nombre")
const caracteristicas = $("#caracteristicas");
const pieCard = $("#pie-card");

const URL = "https://fedeperin-harry-potter-api.herokuapp.com/personajes"; //o cualquiera

btnBuscar.on("click", ()=>{    
    console.log("btnBuscar clickeado");
    if(numeroInput.val()>0 && numeroInput.val()<24){
        mostrarCardGenerica();   
        mostrarCard(); 
    }
    else{
        alert("Ingresa un numero entre 1 y 23");
    }
      
});

function mostrarCardGenerica (){        
    caracteristicas.text("Cargando información...");
    img.attr("src","./imgs/rayoHarry.png");
    card.addClass("visible");    
}

function mostrarCard (){    
    fetch (`${URL}/${numeroInput.val()}`).
    then(respuesta => respuesta.json()).
    then(respuestaJSON => {
        //console.log(`Conectado al sitio web ${URL}/${numeroInput.val()}`);
        console.log(respuestaJSON);
        const URLimg = respuestaJSON.imagen;
        console.log(respuestaJSON.imagen);
        img.attr("src",URLimg);
        caracteristicas.text("");            

        // //Para mostrar toda la info dentro de la rta haria esto:
        // Object.keys(respuestaJSON).forEach(caracteristica => {
        //     console.log(JSON.stringify(respuestaJSON[caracteristica]));            
        //     caracteristicas.append($(`<li class="negrita mt-2">${caracteristica}: </li>`));
        //     caracteristicas.append($(`<li>${JSON.stringify(respuestaJSON[caracteristica])}</li>`));            
        // }); 

        //Para mostrar solo las caracteristicas que quiero:
        caracteristicas.append($(`<li class="negrita mt-2">ID: </li>`));           
        caracteristicas.append($(`<li>${respuestaJSON["id"]}</li>`));  
        caracteristicas.append($(`<li class="negrita mt-2">Apodo: </li>`));        
        caracteristicas.append($(`<li>${respuestaJSON["apodo"]}</li>`)); 
        caracteristicas.append($(`<li class="negrita mt-2">Casa de Hogwarts: </li>`));        
        caracteristicas.append($(`<li>${respuestaJSON["casaDeHogwarts"]}</li>`));        
        pieCard.addClass("visible");               

    }).    
    catch (error => mostrarCardError ());
}

function mostrarCardError (){
    alert("Personaje no encontrado");               
}
