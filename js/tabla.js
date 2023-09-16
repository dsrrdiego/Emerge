"use strict";

function tabla(){
    const url="https://62a891acec36bf40bda915ff.mockapi.io/api/usuario";
    let celda=[[],[],[],[],[]];
    let check=[];
    let atributos=["nombre","album","puntaje","comentario","id"];
    let tabla=document.querySelector("#tabla");
    let tablaOriginal=tabla.innerHTML;
    let dato={"nombre":"","album":"","puntaje":0,"comentario":""};
    
    let filtroAlbum=document.querySelector("#filtroAlbum");    
    filtroAlbum.addEventListener("change",leerTablaCon0);
    let filtroMinimo=document.querySelector("#filtroMinimo");
    filtroMinimo.addEventListener("change",leerTablaCon0);
    let filtroMaximo=document.querySelector("#filtroMaximo");
    filtroMaximo.addEventListener("change",leerTablaCon0);

    let paginaMinimo=0;
    const maxDeLineasPorPagina=4; /////largo de la tabla
    let paginaMaximo=maxDeLineasPorPagina;
    let nDePagina, maxDePagina;

    ///paginacion cambia de pagina
    let paginaAnteriorBtn=document.querySelector("#paginaAnterior");
    let paginaPosteriorBtn=document.querySelector("#paginaPosterior");
    paginaAnterior.addEventListener("click",()=>pagina(-1));
    paginaPosterior.addEventListener("click",()=>pagina(1));
    let nDePaginaText=document.querySelector("#nDePagina");
    function pagina(i){
        if (!(nDePagina==maxDePagina && i==1)){
            paginaMinimo+=maxDeLineasPorPagina*i;
            if (paginaMinimo<0) paginaMinimo=0;
            paginaMaximo=paginaMinimo+maxDeLineasPorPagina;
            leerTabla();
        }
    }
    function leerTablaCon0(){ //lista desde la pagina 0
        paginaMinimo=0;
        leerTabla();
    }

    async function leerTabla(){
        tabla.innerHTML=tablaOriginal;
        let checkGeneral=document.querySelector("#checkGeneral").addEventListener("click",seleccionarTodo);
        celda=[[],[],[],[],[]];
        barraCambiar("Cargando");
        let filtrado=[];
        try{
            let resp=await fetch(url,{mode: 'cors'})
            let obj=await resp.json();
            filtrado=[];
            let min=filtroMinimo.value;
            let max=filtroMaximo.value;
            if (min < 0 || min>100 || max<0 || max > 100){
                alert("los filtros deben estar entre 0 y 100");
                min=0;
                filtroMinimo.value=0;
                max=100;
                filtroMaximo.value=100;
            }
            let valor=filtroAlbum.options[filtroAlbum.selectedIndex].value;
            
            let i=0;
            for (let objLinea of obj){
                //filtro v
                if (((objLinea[atributos[2]]>min && objLinea[atributos[2]]<max) && objLinea[atributos[1]]==valor)  ||  
                    ((objLinea[atributos[2]]>min && objLinea[atributos[2]]<max) &&valor=="")){
                        
                        filtrado[i]=objLinea;
                        i++;
                    }
                }
                
                paginaAnteriorBtn.classList.add("cancel");
                paginaPosteriorBtn.classList.add("cancel");
                maxDePagina=Math.floor((filtrado.length-1)/(maxDeLineasPorPagina)+1);
                nDePagina=(paginaMinimo+maxDeLineasPorPagina)/maxDeLineasPorPagina;
                
                if (maxDePagina==0){
                    nDePaginaText.innerHTML="No hay comentarios que mostrar";
                }else{
                    nDePaginaText.innerHTML="Página "+nDePagina+" de un total de "+maxDePagina;
                    if (nDePagina>1) paginaAnteriorBtn.classList.remove("cancel");
                    if (nDePagina<maxDePagina) paginaPosteriorBtn.classList.remove("cancel");
                }

            let nroLinea;
            nroLinea=0;
            
            ///genero lo visible de lo filtrado
            while (nroLinea<maxDeLineasPorPagina&&paginaMinimo+nroLinea<filtrado.length){
                let f=filtrado[nroLinea+paginaMinimo];
                if (((f[atributos[2]] > min && f[atributos[2]] < max) && f[atributos[1]]==valor)  ||  
                ((f[atributos[2]] > min && f[atributos[2]] < max) && valor=="")){
                    
                    let fila=document.createElement("tr");
                    if (f.puntaje>70){
                        fila.classList.add("resaltar");
                    }
                    tabla.append(fila);
                    let td=document.createElement("td");
                    fila.append(td);
                    check[nroLinea]=document.createElement("input");
                    check[nroLinea].setAttribute("type","checkbox");
                    td.append(check[nroLinea]);
                    
                    for (let i=0;i<atributos.length;i++){
                        let n=nroLinea;
                        celda[n][i]=document.createElement("td");
                        celda[n][i].innerHTML=f[atributos[i]];
                        celda[n][i].addEventListener("click",()=>celdaClick( n,i));
                        if (i<4) fila.append(celda[n][i]);
                    }
                }//bloque del filtro
                nroLinea++;
            }
            barraCambiar("listo");
            
            
        }catch(e){
            console.log(e);
        }    
    }
    

    //barra de estado inferior
    let body=document.querySelector("#body");
    let barra=document.querySelector("#barraTexto");
    let pilaDeEstados=[]
    let barraAnterior;
    function barraCambiar(modo){
        switch (modo){
            case "listo":
                body.classList.remove("espera");
                barra.classList.add("barraAnimar");
                barra.innerHTML=pilaDeEstados.pop();
                break;
            default:
                body.classList.add("espera");
                barra.classList.remove("barraAnimar");
                pilaDeEstados.push(barra.innerHTML);
                barra.innerHTML=modo+"...";
            }
    }
    

    //Botones agregar, agrgar x 3, etc
    document.querySelector("#btnAgregar").addEventListener('click',()=>agregar(inputNombre.value,inputAlbum.value,inputPuntaje.value,inputComentario.value));
    document.querySelector("#btnAgregarx3").addEventListener('click',()=>agregarX3(inputNombre.value,inputAlbum.value,inputPuntaje.value,inputComentario.value));
    document.querySelector("#btnBorrar").addEventListener('click',borrar)
    
    let nombre=document.querySelector("#inputNombre");
    nombre.addEventListener('keypress',(e)=>enter(e,inputNombre.value,inputAlbum.value,inputPuntaje.value,inputComentario.value))
    let album=document.querySelector("#inputAlbum");
    album.addEventListener('keypress',(e)=>enter(e,inputNombre.value,inputAlbum.value,inputPuntaje.value,inputComentario.value))
    let puntaje=document.querySelector("#inputPuntaje");
    let comentario=document.querySelector("#inputComentario");
    comentario.addEventListener('keypress',(e)=>enter(e,inputNombre.value,inputAlbum.value,inputPuntaje.value,inputComentario.value))

    function enter(e,nombre,album,puntaje,comentario){
        if (e.key==="Enter") agregar(nombre,album,puntaje,comentario);
    }
    
    function agregar(nombre, album,puntaje,comentario){
        if (completo(nombre,album,comentario)){
            dato={"nombre":nombre,"album":album,"puntaje":parseInt(puntaje,10),"comentario":comentario};
            mandar(dato,true);
        }
    }

    function agregarX3(nombre, album,puntaje,comentario){
        if (completo(nombre,album,comentario)){
            dato={"nombre":nombre,"album":album,"puntaje":parseInt(puntaje,10),"comentario":comentario};
            mandar(dato,false);
            mandar(dato,false);
            mandar(dato,true);
        }
    }

    //verifico que los campos esten completos
    function completo(){
        for (let x of arguments){
            if (x==""){
                alert("tenes que completar todos los campos");
                alert
                return false;
            }
        }
        if (puntaje.value<0 || puntaje.value>100) {
            alert("La puntuacion debe estar entre 0 y 100");
            return false;
        }
        return true;
    }
    
    
    async function mandar(dato,flag){
        barraCambiar("Agregando");
        try{
            await fetch(url,{
                "method": 'POST',
                'headers': {
                'Content-Type': 'application/json'},
                'body': JSON.stringify(dato)
            })
            barraCambiar("listo");
            if (flag) leerTabla();
        }catch(e){}
    }
        
    //guardo la celda anterior para despues de haber sido clickeada
    let celdaAnterior={
        "y":0,
        "x":0,
        "texto":"",
        "editando":false
    }
    function celdaClick(n,i){
        if (!celdaAnterior.editando){
            celdaAnterior.y=n;
            celdaAnterior.x=i;
            celdaAnterior.texto=celda[n][i].innerHTML;
            celdaAnterior.editando=true;
            
            let inputNuevo=document.createElement("input");
            if (i==2){
                inputNuevo.type="number";
                inputNuevo.setAttribute("max","100");
                inputNuevo.setAttribute("min","0");
            }
            inputNuevo.value=celda[n][i].innerText;
            celda[n][i].innerHTML="";
            let btnEditar=document.createElement("button")
            btnEditar.innerText="Editar";
            inputNuevo.addEventListener('keypress',(e)=>chekTecla(e,n,i,inputNuevo.value))
            btnEditar.addEventListener("click",()=>editar(n,i,inputNuevo.value));
            celda[n][i].append(inputNuevo);
            celda[n][i].append(btnEditar);
        }
    }
    function chekTecla(e,n,i,value){
        if (e.key==="Enter"){
            editar(n,i,value);
        }
    }

    async function editar(n,i,texto){
        barraCambiar("Guardando");

        dato.nombre=celda[n][0].innerText;
        dato.album=celda[n][1].innerText;
        dato.puntaje=parseInt(celda[n][2].innerText,10);
        dato.comentario=celda[n][3].innerText;
        dato[atributos[i]]=texto;
        
        let valido=true;
        if (i==2){
            let valor=parseInt(texto,10);
            dato.puntaje=valor;
            if (valor<0 || valor >100){
                alert("Debe estar enre 0 y 100");
                valido=false;
            }
        }
        
        if(valido){
            try{
                
                let prom=await fetch(url+"/"+celda[n][4].innerText,{
                    "method":"PUT",
                    "headers":{
                    "Content-type":"application/json"},
                    "body":JSON.stringify(dato)
                })
                celdaAnterior.editando=false;
                barraCambiar("listo");
                leerTabla();
            }catch(e){}
        }
    }

    function seleccionarTodo(){
        for (let x of check){
            x.checked=this.checked;
        }
    }

    async function borrar(){
        barraCambiar("borrando")
        try{
            for (let x=0;x<check.length;x++){
                if (check[x].checked && celda[x][4]!=null){
                    let t=celda[x][4].innerHTML;
                    await fetch(url+"/"+t,{
                    "method":"DELETE",
                    "headers":{"Content-type":"apllication/json"}});
                }
            }
            barraCambiar("listo");
            paginaMinimo=0;
            leerTabla()
        }catch(e){
            console.log(e)
        }
    }
    leerTabla();
}