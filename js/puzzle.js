"use strict";
function puzzle(){
    let btnOrdenar=document.querySelector("#btnOrdenar");
    btnOrdenar.addEventListener('click',function (e){e.preventDefault();ini()});
    let btnMasFacil=document.querySelector("#btnMasFacil");
    btnMasFacil.addEventListener('click',function(e){e.preventDefault();facilitar()});
    let div=document.querySelector("#puzzle");

    const ancho=4;
    let lista=[];

    function ini(){
        lista=[0];
        let lista2=[];
        for (let i=1;i<ancho*ancho;i++){
            lista2[i]=i;
        }
        lista2=lista2.sort(function(){return Math.random()-0.5});
        lista.push(...lista2);
        crear();
    }

    function crear(){
        div.innerHTML="";
        
        // creo los botones
        let cuadradito=[];
        let nn=0;
        for (let y=0;y<ancho;y++){
            for (let x=1;x<ancho+1;x++){
                nn++;
                let n=nn;
                cuadradito[n]=document.createElement("button");
                cuadradito[n].addEventListener("click",function (e){e.preventDefault();click(n,cuadradito)});
            
                if (n==ancho*ancho){
                    cuadradito[n].innerText="";
                    cuadradito[n].className="ausente";
                }else{
                    cuadradito[n].innerText=lista[n];
                }
                div.append(cuadradito[n]);
            }
            let br=document.createElement("br");
            div.append(br);
        }
        let br=document.createElement("br");
        div.append(br);
    }


    function click(n,cuadradito){
        let nClickeado=cuadradito[n];
        
        //limmites
        let orden=[-ancho,-1,1,ancho]
        
        if (n<=ancho){orden[0]=0};             //fila superios
        
        for (let i=1;i<=(ancho*(ancho-1))+1;i+=ancho){
            if (n==i){orden[1]=0};       //columna izqu
        }
        
        for (let i=ancho;i<=(ancho*ancho);i+=ancho){
            if (n==i){orden[2]=0};  //colum derecha
        }
        
        if (n>ancho*(ancho-1)+1){orden[ancho]=0};  //fila de abajo                //fila inferior
        
        // reemplazar los botones de los costados
        for (let y=0;y<ancho+1;y++){
            let a=cuadradito[n+orden[y]];
                if (a && a.innerText==""){
                    a.innerText=nClickeado.innerText;
                    a.className="";
                    nClickeado.innerText="";
                    nClickeado.className="ausente";
                }
        }
        check(1,cuadradito);
    }
    
    ///checkear si gana
    let btnEnviar=document.querySelector("#btnEnviar");
    function check(n,cuadradito){
        if (n==ancho*ancho-1){
            gano();
        }else{
            let a=cuadradito[n];
            if (a.innerText==n){check(n+1,cuadradito)};
        }
    }

    function gano(){
        div.innerHTML="<h3>Perfecto</h3>";
            btnOrdenar.classList.add("ocultar");
            btnMasFacil.classList.add("ocultar");
            captchaFacilDiv.classList.add("ocultar");
            btnEnviar.classList.remove("ocultar");
        
    }
    let captchaFacilDiv=document.querySelector("#captchaFacilDiv");
    let captchaTexto=document.querySelector("#captchaTexto");
    let captchaInput=document.querySelector("#captchaInput");
    let btnVerificar=document.querySelector("#btnVerificar")
    btnVerificar.addEventListener("click",function(e){e.preventDefault();verificar()});

    let dificultad=0;
    let captcha="no PueDO hAcEr uN puZZle";

    function facilitar(){
        switch (dificultad){
        case 0:
            dificultad++;  
            btnMasFacil.innerHTML="No puedo, quiere mas facil todavía";  
            lista=[0,1,2,3,4,5,6,7,8,13,9,10,11,14,15,12];
            crear();
            break;
        case 1:
            div.innerHTML="";
            btnMasFacil.classList.add("ocultar");
            btnOrdenar.classList.add("ocultar");
            captchaFacilDiv.classList.add("captchaFacil");
            captchaFacilDiv.classList.remove("ocultar");
            captchaTexto.innerHTML=captcha;
        }
    }
   
    function verificar(){
        if (captchaInput.value==captcha){
            gano();
        }else{
            alert("El texto ingresado es incorrecto!!");
        }
    }
            
    ini();
};