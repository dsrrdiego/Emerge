"use strict";
window.onload=(event)=>{   
    window.addEventListener("popstate",(event)=>{
        let id=event.state.id;
        cargar(id);
    });
    
    let menuItm=document.querySelectorAll('.menuItm');
    menuItm.forEach(a=>a.addEventListener('click',(event)=>cargar(event.target.id)));

    let botonMenu=document.querySelector("#botonMenu");
    botonMenu.addEventListener('click',menuClick);
    let menu=document.querySelector("#menu");    
    let logo=document.querySelector(".logo");
    let ajaxDiv=document.querySelector("#ajaxDiv");
    
    function menuClick(){
        menu.classList.remove("ocultar");
        logo.classList.toggle("ocultar");
        botonMenu.classList.toggle("ocultar");
    }
    
    async function cargar(id){
        menu.classList.add("ocultar");
        botonMenu.classList.remove("ocultar");
        menuItm.forEach(a=>a.classList.remove("activa"));
        let item=document.querySelector("#"+id).classList.add("activa");

        let funcs={
            "inicio":[],
            "artistas":[reproductor],
            "contactos":[tabla,puzzle,enviar_Form]};
        let pagina=id+".html";

        ajaxDiv.innerHTML="<h1> Cargando....</h1>";
        try {
            let promesa =await fetch(pagina);
            if (promesa.ok){
                let text =await promesa.text();
                ajaxDiv.innerHTML=text;
                funcs[id].forEach(a=>a());
                window.title=id;

                //lo dejo , funciona, pero tira un error si no es por xampp que todavia no he solucionado
                window.history.pushState({id},`${id}`,`${id}`);
            }else{
                ajaxDiv.innerHTML="<h1> hemos tenido un error!!</h1>";
            }
        }catch(e){
            ajaxDiv.innerHTML="<h1> hemos tenido un error!! "+e+" </h1>";
        }
    }
    
    cargar("inicio");
    
};