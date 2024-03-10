function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("pizzas"))
    console.log(memoria)
    let cuenta = 0;
    if(!memoria) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        nuevoProducto.cantidad = 1;
        localStorage.setItem("pizzas",JSON.stringify([nuevoProducto]));
        cuenta = 1;
    } else {
        const indiceProducto = memoria.findIndex(pizza => pizza.id === producto.id);
        console.log(indiceProducto) 
        const nuevaMemoria = memoria;
        if(indiceProducto === -1) {
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
            cuenta = 1
        } else {
            nuevaMemoria[indiceProducto].cantidad ++ ;
            cuenta = nuevaMemoria[indiceProducto].cantidad;
        }

        localStorage.setItem("pizzas",JSON.stringify(nuevaMemoria))
        
    }
    actualizarNumeroCarrito();
    return cuenta;
    
}

function restarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("pizzas"))
    const indiceProducto = memoria.findIndex(pizza => pizza.id === producto.id);
    if(memoria[indiceProducto].cantidad === 1) {
       memoria.splice(indiceProducto,1);
      
       
    } else {
        memoria[indiceProducto].cantidad --;
    }

    localStorage.setItem("pizzas",JSON.stringify(memoria))
    actualizarNumeroCarrito();

}

// Toma un producto le agrega cantidad 1 y lo devuelve

function getNuevoProductoParaMemoria(producto) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto 
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito")

function actualizarNumeroCarrito() {

    const memoria = JSON.parse(localStorage.getItem("pizzas"));
    if(memoria && memoria.length > 0) {
    const cuenta = memoria.reduce((acum,current) => acum + current.cantidad,0)
    cuentaCarritoElement.innerText = cuenta;
    console.log(cuenta)
}
else {
cuentaCarritoElement.innerText = 0;
}
}

actualizarNumeroCarrito();