const crearDivSelectores = () => ( `<form>
<div class="clientes-tarjeta clientes-tarjeta__titulo">
<h4> Elegí tu Aventura</h4>
<select id="paquetes" class="text-black m-2">
<option value="3000">Paquete básico &#128675</option>
<option value="5700">Paquete completo &#128010</option>
<option value="7500">Experiencia Ranger &#128170</option>
</select>
<h4 class="mt-3">Somos un grupo</h4>
<select id="cantidad" class="text-black m-2">
<option value="1">1 Persona</option>
<option value="2">2 Personas</option>
<option value="4">4 Personas </option>
<option value="8">8 Personas</option>
</select>
<button type="button" id="calcular" class="btn btn-outline-primary 
m-3" >Calcular</button>
<div class="m-0">
    <p class="fs-5 text-primary text-opacity-75 
    text-start ps-4">Precio final de $<span id="resultado">0</span>
    </p>
</div>
</form>`);

const DIVcrearFormularioCompra = () => (
    `<div class="clientes-tarjeta clientes-tarjeta__titulo">
        <h3> Gracias por elegirnos &#128075; </h3>
        <div id="form_compra"> ${crearFormularioCompra()} </div>
        <p id="faltanDatos" style="display: none;" class="fs-4 text-danger">FALTAN DATOS<p> 
        <div>
            <div type="button" id="confirmar-pedido"
            class="btn btn-success fw-bold m-2">Aceptar</div>
            <div type="button" id="cancelar-pedido"
            class="btn btn-danger fw-bold m-2">Cancelar</div>
        </div>
    </div>`);

const crearFormularioCompra = () => ( `<form>
<div class="form-group">
<input type="text" class="form-control mb-3 mt-3" placeholder="Nombre completo" id="nombreCompleto" required>
</div>
<div class="form-group">
<input type="email" class="form-control" placeholder="ej:     jaime@gmail.com" id="email" required>
</div>
<div class="form-check form-switch pt-3">
<input type="checkbox" class="form-check-input" role="switch" id="checked" >
<label class="form-check-label mb-2 text-black fs-6">Confirmar pedido</label>
</div>
</form>`);


function elegirServicio(){
    const menu_servicios = document.createElement("div");
    menu_servicios.classList.add("clientes-container");
    app.appendChild(menu_servicios);
    //creo div hijo sub de app y selectores
    let opcion_servicio = document.createElement("div");
    opcion_servicio.classList.add("clientes-container")
    opcion_servicio.innerHTML = crearDivSelectores();
    menu_servicios.appendChild(opcion_servicio);
    //div esqueleto de form con btn y formulario
    const menu_post_compras = document.createElement("div");
    menu_post_compras.classList = "clientes-container"
    menu_post_compras.innerHTML = DIVcrearFormularioCompra();
    $(app).append(menu_post_compras).hide().slideDown(2000)

    //btn cancela pedido
    const btn_cancel_compra = document.getElementById("cancelar-pedido");
    btn_cancel_compra.addEventListener("click", ()=>{
        localStorage.removeItem("nombre_usuario");
        location.reload();
    });

    //btn confirma pedido
    const btn_conf_compra = document.getElementById("confirmar-pedido");
    btn_conf_compra.addEventListener("click", function btnAceptar () {
        let nombreCompleto = document.getElementById("nombreCompleto").value;
        guardarStorage("nombreCompleto", nombreCompleto)
        let email = document.getElementById("email").value;
        let checkbox = document.getElementById("checked").checked;
        guardarStorage("email", email)
        if ( (nombreCompleto !== "")
            && (checkbox === true)
            && (email !== "")
            && (recuperarStorage("precioFinal") )) {
                pedidoConfirmado();
                this.removeEventListener("click", (btnAceptar));
        } else {
            faltanDatos();
        }
    });
    addProducts();
}

//selectores y btn Calcular
function addProducts() {
    let btn_opciones = document.getElementById("calcular");
    btn_opciones.addEventListener("click", () => {
        let op1 = document.getElementById("paquetes");
        let precio = parseInt(op1.options[op1.selectedIndex].value);
        let op2 = document.getElementById("cantidad");
        let cantidad = parseInt(op2.options[op2.selectedIndex].value);
        let total = `${precio * cantidad}`;
        document.getElementById("resultado").innerText = total;
        guardarStorage("precioFinal",  total);
    });
}
//if btnAceptar
function pedidoConfirmado () {
    let carritoContainer = document.getElementById("pedidoConfirmado");
    let carritoBox = document.createElement("div");
    carritoBox.classList.add("clientes-container", "titulo-parrafo");
    carritoBox.innerHTML =  `<div class="clientes-tarjeta ">
    <h3>¡Gracias ${recuperarStorage("nombreCompleto").toUpperCase()} ! &#129303</h3>
    <p class="fs-5 text-center text-primary">Su pedido fué procesado </p>
    <img class=" clientes-tarjeta rounded bg-black bg-opacity-75 m-1"
    src="./multimedia/logo-empresa-blanco.png" id="imagenForm">
    <p class="fs-5">Su total es de $${parseInt(recuperarStorage("precioFinal"))} </p>
    <p>Factura y detalles enviados: <br><span class="fs-6"
    >${recuperarStorage("email")}</span></p>
    <p class="fs-6 text-center text-decoration-underline m-2">Quiero seguir comprando </p>
    <div id="borrar_datos" type="button"
    class="btn btn-warning fw-bold m-2" required>Comprar</div>
    </div>`;
    //guardo varible para function checkPedidoStorage
    let pedidoAnterior = true;
    guardarStorage("pedidoAnterior", pedidoAnterior);

    //oculto selectores y formulario
    $("#app").children().parent().slideToggle(2000)
    //muestro pedido confirmado
    $(carritoContainer).append(carritoBox).hide().slideDown(2000)
    //btn borra todos los datos y refresh
    $("#borrar_datos").click( ()=>{
        localStorage.removeItem("nombre_usuario");
        localStorage.removeItem("pedidoAnterior");
        location.reload();
    })
}

//else btnAceptar
function faltanDatos(){
    $("#faltanDatos").slideDown(300).delay(300)
    .fadeOut(300).fadeIn(300).fadeOut(300, () => {
        $("#faltanDatos").fadeIn(300)
        .delay(300).slideUp(300);
    })
}