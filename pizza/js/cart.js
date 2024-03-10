const contenedorTarjetas = document.getElementById("productos-container")
const unidadadesElement = document.getElementById("unidades")
const precioElement = document.getElementById("precio")
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById("reiniciar");




function crearTarjetasProductosInicio() {
    contenedorTarjetas.innerHTML="";
    const productos = JSON.parse(localStorage.getItem("pizzas"));
    console.log(productos) 
    if(productos && productos.length > 0) {
    productos.forEach(producto => {
        const nuevaPizza = document.createElement("div");
        nuevaPizza.classList ="tarjeta-producto";
        nuevaPizza.innerHTML = `
        <img src = "./img/${producto.id}.jpg">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <div>
        <button>-</button>
        <span class="cantidad">${producto.cantidad}</span>
        <button>+</button>
        </div>
        
        `;
        contenedorTarjetas.appendChild(nuevaPizza);
        nuevaPizza
        .getElementsByTagName("button")[1]
        .addEventListener("click",(e)=> {
        const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
        cuentaElement.innerText = agregarAlCarrito(producto);
        actualizarTotales();

    });
        nuevaPizza
        .getElementsByTagName("button")[0]
        .addEventListener("click",(e)=> {
            restarAlCarrito(producto);
            crearTarjetasProductosInicio();
            actualizarTotales();

        
    });

});


}

}
crearTarjetasProductosInicio(pizzas)
actualizarTotales()

function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("pizzas"))
    let unidades = 0
    let precio = 0
    if(productos && productos.length > 0) {
        productos.forEach(producto => {

            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;

        })

        unidadadesElement.innerText = unidades;
        precioElement.innerText = precio;

    }

    revisarMensajeVacio();
}

function revisarMensajeVacio() {
    const productos = JSON.parse(localStorage.getItem("pizzas"))
    console.log(productos,productos == true)
    carritoVacioElement.classList.toggle("escondido",productos && productos.length > 0);
    totalesElement.classList.toggle("escondido",!(productos && productos.length > 0));
}

revisarMensajeVacio();

reiniciarCarritoElement.addEventListener("click",reiniciarCarrito)
function reiniciarCarrito() {

    localStorage.removeItem("pizzas");
    actualizarTotales();
    crearTarjetasProductosInicio();




}