// servicios ofrecidos, prodcutos
class Excursiones {
    constructor(id, nombre, precio, imagen, descrip){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.descrip = descrip;
    }
}
const servicios = [];

const paquete1 = new Excursiones(1, "Paquete 1", 3000, "./multimedia/servicios-1Dias.jpg", `
<p class="fs-5">Actividades en los esteros</p>
<ul class="p-1 ms-5 me-5">
    <li class="text-start p-1">Paseos en lancha</li>
    <li class="text-start p-1">Excursiones en kayak</li>
    <li class="text-start p-1">Fauna local de cerca</li>
</ul>`);
const paquete2 = new Excursiones(2, "Paquete 2", 5700, "./multimedia/servicios-2Dias.jpg", `
<p class="fs-5">Incluye <span class="text-success">Paquete 1</span></p>
<ul class="p-1 ms-5 me-5">
    <li class="text-start p-1">Cabañas equipadas</li>
    <li class="text-start p-1">All Inclusive</li>
    <li class="text-start p-1">Birdwatching</li>
</ul>
`);
const paquete3 = new Excursiones(3, "Paquete 3", 7500, "./multimedia/servicios-3Dias.jpg",`
<p class="fs-5">Incluye <span class="text-success">Paquete 2</span></p>
<ul class="p-1 ms-5 me-5">
    <li class="text-start p-1">Actividades nocturnas</li>
    <li class="text-start p-1">¡Experiencia Ranger!</li>
    <li class="text-start p-1">Fogón y asado</li>
</ul>
` );

servicios.push(paquete1, paquete2, paquete3);


function pintoTarjetaServicios () {
    const listaServicios = document.getElementById("listaServicios");
    listaServicios.className = "clientes-container";
    servicios.forEach( (servicio) => {
        let div_servicios = document.createElement("div");
        div_servicios.classList.add("clientes-tarjeta", "titulo-parrafo")
        div_servicios.innerHTML = `<img src="${servicio.imagen}">
                            <h3 class="clientes-tarjeta__titulo pb-2">${servicio.nombre}</h3>
                            <div class="pt-3 text-primary">${servicio.descrip}</div>
                            <p class="fs-5 text-secondary">Precio final $${servicio.precio}</p>
                            `;
        listaServicios.appendChild(div_servicios);
        });
}

pintoTarjetaServicios();

function guardarStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function recuperarStorage(clave) {
    return JSON.parse(localStorage.getItem(clave));
}

function checkPedidoStorage(){
    if (recuperarStorage("pedidoAnterior") === true){
        pedidoConfirmado();
    }else{
        ingresarNombre();
    }
}
//arranca simulador
checkPedidoStorage();

function ingresarNombre(){
    const app = document.getElementById("app");
    const app_main = document.createElement("div");
    app_main.classList.add("titulo-parrafo");
    app.appendChild(app_main);
    // pregunta si es el mismo usuario
    if ( recuperarStorage("nombre_usuario")){
        let nombre = recuperarStorage("nombre_usuario");
        app_main.innerHTML = `<h3> Hola ${nombre.toUpperCase()} &#129303 </h3>
        <div id="menu_SiNo" class="bg-white border border-1 mt-3">
            <h4 class="p-3">¿Es ud?</h4>
            <div id="btnSi" type="button" class="btn btn-success fw-bold m-2">Si &#10004 </div>
            <div id="btnNo" type="button" class="btn btn-danger fw-bold m-2">&#10060 No</div>
        </div>`;
        $("#btnSi").click( ()=>{
            $("#menu_SiNo").slideUp(500)
        })
        $("#btnNo").click( ()=>{
            localStorage.clear();
            window.location.reload();
        })
        elegirServicio();
    } else {
        app_main.innerHTML = `<h3> BIENVENIDO &#128075; </h3>
                            <p> Para comprar ingrese su nombre </p>
                            <input id="nombreIngresado" type="text" placeholder="Nombre" class="p-1 mb-3 bg-white" required>`;
        //btn
        let app_main_btn = document.createElement("div");
        app_main_btn.innerHTML = `<div id="btnNombre" type="button" class="btn btn-outline-success fw-bold m-2">Confirmar</div>`;
        app_main.appendChild(app_main_btn);
        // evento btn por input
        let boton = document.getElementById("btnNombre");
        boton.addEventListener("click", respuesta);
        // evento por teclado por input
        let pressEnter = document.getElementById("nombreIngresado");
        pressEnter.addEventListener("keyup", (e) => {
            if (e.code === "Enter") {
                e.preventDefault();
                respuesta();
            }
        });
        function respuesta() {
            let nombre = document.getElementById("nombreIngresado").value;
            if ((nombre !=="") && (nombre !==" "))  {
                $(app_main).html(`<h3> Hola ${nombre.toUpperCase()} &#129303 </h3>`);
                guardarStorage("nombre_usuario",nombre );
                elegirServicio();
            } 
        }
    }
}

//scroll sub div tarjetas inicio
$('*[data-id="scroll"]').css("display","none").scroll().slideDown(2000);
