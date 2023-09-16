"use strict";
let discoSonando=0;
let sonando=false;
let temaNro=0;
let cancion=[]; //lista html
function reproductor(){
    let barra=document.querySelector("#barraTexto"); 
    let album=[];
        
    let discos=[
        //Batulitos
        {"tapaDisco":"BATULITOS.jpeg",
        "artista":"Batulitos Electronautas",
        "canciones":["tan mimosa"]},
        
        //AzulesLuces
        {"tapaDisco":"azulesluces.jpg",
        "artista":"Azules Luces",
        "canciones":["Osadia","vendaval","la mentira del mapa"]},
                    
        //ElMoyu
        {"tapaDisco":"elmoyu.jpg",
        "artista":"ElMoyu",
        "canciones":["angel","antes de abril","el remedio","hermanos","la vereda","miradas diferentes"]},
        
        //Elale
        {"tapaDisco":"elale.jpg",
        "artista":"Elale",
        "canciones":["jacinta","la chola"]},
        
        //Pehuen
        {"tapaDisco":"pehuen.jpg",
        "artista":"Pehuen",
        "canciones":["mil","noctiluca"]},
        
        //LadosOscuros
        {"tapaDisco":"ladososcuros.jpg",
        "artista":"Lados Oscuros",
        "canciones":["torcida"]}
    ]
    
    // cargar elementos visuales del reproductor
    let TapaDisco=document.querySelector("#tapa");
    TapaDisco.addEventListener('click',botonPlay);
    let artista=document.querySelector("#artista");
    let titulo=document.querySelector("#titulo");
    let listaDeReproduccion=document.querySelector("#listaDeReproduccion");
    
    
    //vinculo cada tag album con un click para cargar
    let albums=document.querySelectorAll(".album");
    for (let i=0;i<albums.length;i++){
        albums[i].addEventListener('click',()=>cargar(i));
    }
    

    //de acuerdo al seleccionado cargo todos los temas en el reproductor y en la pagina
    let inicializado=false;
    function cargar(a,refresh){
        if (!refresh) temaNro=0;
        discoSonando=a;
        cancion=[];
        listaDeReproduccion.innerHTML="";
        TapaDisco.setAttribute("style","background-image: "+
           "url(images/discos/"+discos[a].tapaDisco+")");
        
        artista.innerHTML=discos[a].artista;
        for (let x=0;x<discos[a].canciones.length;x++){
            cancion[x]=document.createElement("li");
            cancion[x].addEventListener("click",()=>clickTema(x));
            cancion[x].innerText=discos[a].canciones[x];
            listaDeReproduccion.append(cancion[x]);
            titulo.innerHTML=discos[a].canciones[0];
            barra.innerHTML=discos[discoSonando].artista+" | "+discos[discoSonando].canciones[temaNro];
            barra.classList.add("barraAnimar");
            if (!refresh){
                rocola.src="audios/"+discos[a].artista+"/"+cancion[0].innerHTML+".mp3";
            }
        }
        cancion[temaNro].classList.add("cancionClick"); //guarda con el ajax
        if (inicializado){play();}
        if (refresh)play();
        inicializado=true;
        window.scrollTo(0,0);
    }
    
    
    ////REPRODUCTOR

    
    let btnPlay=document.querySelector("#btnPlay");
    let btnVolMas=document.querySelector("#btnVolMas");
    let btnVolMenos=document.querySelector("#btnVolMenos");
    let btnNext=document.querySelector("#btnNext");
    let vol=document.querySelector("#vol");

    btnPlay.addEventListener('click',botonPlay);
    btnVolMas.addEventListener('click',()=>Volumen(0.1));
    btnVolMenos.addEventListener('click',()=>Volumen(-0.1));
    btnNext.addEventListener('click',()=>next(1));
    btnPrev.addEventListener('click',()=>next(-1));


    let rocola =document.querySelector("#rocola");
    rocola.addEventListener('ended',()=>next(1));
    Volumen(0);


    //pasar de tema
    function next(n){
        temaNro=parseInt(temaNro)+parseInt(n);
        if (temaNro==discos[discoSonando].canciones.length){temaNro=0};
        if (temaNro==-1){temaNro=discos[discoSonando].canciones.length-1};
        seleccionarTema(temaNro);
        siEstabaSonandoQueSigaSonando();
    }

    function siEstabaSonandoQueSigaSonando(){
        if (btnPlay.innerHTML=="Pausa")rocola.play();
    }

    //borra el estilo de la lista
    function borrarMarcado(){
        for (let c of cancion){
            c.classList.remove("cancionClick");
        }
    }

    function clickTema(t){
        seleccionarTema(t);
        siEstabaSonandoQueSigaSonando();
    }
    
    function seleccionarTema(t){
        let tit=discos[discoSonando].canciones[t];
        titulo.innerHTML=tit;
        rocola.src="audios/"+artista.innerHTML+"/"+tit+".mp3";
        borrarMarcado();
        cancion[t].classList.add("cancionClick");
        temaNro=t;
        barra.innerHTML=discos[discoSonando].artista+" | "+tit;
    }

    function play(){
        rocola.play();
        btnPlay.innerHTML="Pausa";
        titulo.classList.add("cancionAnimacion");
        TapaDisco.classList.add("tapaAnimacion");
        sonando=true;
    }
    
    function botonPlay(){
        let textBoton=btnPlay.innerHTML;
        if (!sonando){
            play();
        }else{
            rocola.pause();
            btnPlay.innerHTML="Play";
            TapaDisco.classList.remove("tapaAnimacion");
            titulo.classList.remove("cancionAnimacion");
            sonando=false;
        }
    }

    function Volumen(v){
        let ex=rocola.volume+v;
        if (ex<=1&&ex>=0) rocola.volume=ex;
        vol.innerHTML="Vol "+Math.trunc(rocola.volume*10);
    }

    cargar(discoSonando,sonando);
};