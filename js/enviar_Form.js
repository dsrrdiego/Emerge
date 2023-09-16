"use strict";
function enviar_Form(){
    document.querySelector("#btnEnviar").addEventListener('click',(e)=>{
        e.preventDefault();
        let seccionAnterior=seccion.innerHTML;
        let campos=document.querySelectorAll(".formInput");
        let resp=true;
        for (let x of campos){
            if (x.value=="") resp=false;
        }
        if (resp) {
            seccion.innerHTML="<div><h3>Gracis " +campos[0].value +". Tu comentario fue enviado con exito a "+campos[1].value+"</h3>";
            let volver=document.createElement("a");
            volver.addEventListener("click",()=>{
                window.history.back();
            });
            volver.innerHTML="Volver";
            seccion.append(volver);
        }else{
            alert("Te falta completar");
        }
    });
}
