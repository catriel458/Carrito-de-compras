const contenedorTarjetas = document.getElementById("productos-container")



function crearTarjetasProductosInicio(productos) {
    productos.forEach(producto => {
        const nuevaPizza = document.createElement("div");
        nuevaPizza.classList ="tarjeta-producto";
        nuevaPizza.innerHTML = `
        <img src = "./img/${producto.id}.jpg">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button>Agregar al carrito</button>
        
        `
        contenedorTarjetas.appendChild(nuevaPizza);
        nuevaPizza.getElementsByTagName("button")[0].addEventListener("click",()=>agregarAlCarrito(producto))

        
    });

}

crearTarjetasProductosInicio(pizzas)