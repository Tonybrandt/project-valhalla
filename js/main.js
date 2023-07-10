// Capturando objetos del DOM
const menuToggle = document.querySelector('.menu-toggle')
const navigation = document.querySelector('.nav-container')


let bebidasDiv = document.getElementById("bebidas1")
// let inputBuscador = document.querySelector("#buscador")
let coincidencia = document.getElementById("coincidencia")
let seleccionDeOrden = document.getElementById("seleccionDeOrden")
let botonCarrito = document.getElementById("botonCarrito")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
// let precioTotal = document.getElementById("precioTotal")
let btnFinalizarCompra = document.querySelector('#finalizarCompra')

let productosEnCarrito = []
if(localStorage.getItem("carrito")){

    for(let bebida of JSON.parse(localStorage.getItem("carrito"))){
        let unidades = bebida.cantidad
        let bebidaCarrito = new Bebida(bebida.id, bebida.nombre, bebida.precio, bebida.imagen)
        bebidaCarrito.cantidad = unidades
        productosEnCarrito.push(bebidaCarrito)}
}else{
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)
}

// Funciones

verCatalogo(bebidas)

function verCatalogo(array){ 

    bebidasDiv.innerHTML = ""

    for(let drink of array){
    
        let nuevoDrinkDiv = document.createElement("div")
        nuevoDrinkDiv.setAttribute("id", "bebidasDiv");
        nuevoDrinkDiv.className = "col-12 col-md-6 col-lg-4 my-3"
        nuevoDrinkDiv.innerHTML = `
        <div id="${drink.id}" class="card">
            <img class="card-img-top img-fluid" src="assets/${drink.imagen}" alt="${drink.nombre}">
            <div class="card-body">
                <h4 class="card-title">${drink.nombre}</h4>
                <p class="copy">Bebida: ${drink.nombre}</p>
                <p class="copy">Precio: $${drink.precio}</p>
                <button id="agregarBtn${drink.id}" class="btn btn-outline-success">Agregar al carrito</button>
            </div>
        </div> 
        `
        bebidasDiv.appendChild(nuevoDrinkDiv)
        let agregarBtn = document.getElementById(`agregarBtn${drink.id}`)
        agregarBtn.onclick = ()=>{
            
            agregarAlCarrito(drink)
        }
    }
}

function agregarAlCarrito(trago){
    
    console.log(`El producto ${trago.nombre} ha sido agregado al carrito y vale ${trago.precio}`)

    productosEnCarrito.push(trago)

    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    console.log(productosEnCarrito)
    
}

function buscarInfo(buscado, array){

    let busquedaArray = array.filter(
            (drink) => drink.nombre.toLowerCase().includes(buscado.toLowerCase()) //|| drink.nombre.toLowerCase().includes(buscado.toLowerCase())
        )
    if(busquedaArray.length == 0){
        coincidencia.innerHTML = `<h3 class="coincidencia">No hay coincidencias con su búsqueda</h3>`
        verCatalogo(busquedaArray)
    }else{
        coincidencia.innerHTML = ""
        verCatalogo(busquedaArray)
    }
}


function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito)=>{
        
        modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 281px;">
            <img class="card-img-center" height="500px" style="object-fit: cover;" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.nombre}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.nombre}</h4>
                
                    <p class="card-text">Precio por unidad: $${productoCarrito.precio}</p>
                    <p class="card-text">Unidades: ${productoCarrito.cantidad}</p> 
                    <p class="card-text">Sub total: $${productoCarrito.precio * productoCarrito.cantidad}</p>

                    <button class= "btn btn-success" id="botonSumarUnidad${productoCarrito.id}"><i class=""></i>+1</button>

                    <button class= "btn btn-danger" id="botonEliminarUnidad${productoCarrito.id}"><i class=""></i>-1</button>

                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
        `
        })

     array.forEach((productoCarrito)=>{
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", ()=>{
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            let productoEliminar = array.find(drink => drink.id == productoCarrito.id)
            let posicion = array.indexOf(productoEliminar)
            array.splice(posicion, 1)
            localStorage.setItem("carrito", JSON.stringify(array))   
            compraTotal(array)
        })

        let btnSumarUnidad = document.querySelector(`#botonSumarUnidad${productoCarrito.id}`)
        btnSumarUnidad.addEventListener('click', ()=> {

            productoCarrito.sumarUnidad()
            localStorage.setItem('carrito', JSON.stringify(array))
            cargarProductosCarrito(array)
        })

        document.querySelector(`#botonEliminarUnidad${productoCarrito.id}`).addEventListener('click', () => {
            let cantUnidades = productoCarrito.restarUnidad()

            if (cantUnidades < 1){
                
                let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)

                cardProducto.remove()

                let posicion = array.indexOf(productoCarrito)

                array.splice(posicion, 1)

                localStorage.setItem("carrito", JSON.stringify(array))   

                compraTotal(array)
            }else{
                localStorage.setItem('carrito', JSON.stringify(array))

            }
            cargarProductosCarrito(array)
        })
     })
    compraTotal(array)
}


function agregarAlCarrito(drink){
    
    let bebidaAgregada = productosEnCarrito.find((elem)=> elem.id == drink.id)
    if(bebidaAgregada == undefined){
        
        productosEnCarrito.push(drink)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))  

        Toastify({
            text: `Has agregado ${drink.nombre} al carrito`,
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
                color: "black"
              }
      }).showToast()

    }else{

        Toastify({
            text: `La bebida ${drink.nombre} ya existe en el carrito, podes añadir mas unidades desde el carrito`,
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
                color: "black"
              }
      }).showToast()
    }

}

function compraTotal(array){

    let total = array.reduce((acc, productoCarrito)=> acc + (productoCarrito.precio * productoCarrito.cantidad) ,0)
    
    total == 0 ?
    precioTotal.innerHTML = `No hay productos agregados` :
    precioTotal.innerHTML = `El total del carrito es <strong>${total}</strong>`
    return total
}


//functions ordenar:
function ordenarMenorMayor(array){
    const menorMayor = [].concat(array)
    menorMayor.sort((a, b)=> a.precio - b.precio)
    verCatalogo(menorMayor)
}

function ordenarMayorMenor(array){
    const mayorMenor = [].concat(array)
    mayorMenor.sort((a,b)=> b.precio - a.precio)
    verCatalogo(mayorMenor)
    
}

function ordenarAlfabeticamenteTitulo(array){
        const ordenadoAlfabeticamente = [].concat(array)

        ordenadoAlfabeticamente.sort((a, b) => {
            if (a.nombre > b.nombre) {
              return 1
            }
            if (a.nombre < b.nombre) {
              return -1
            }
            
            return 0
          })
          verCatalogo(ordenadoAlfabeticamente)
}

function finalizarCompra(fn) {

    Swal.fire({
        title: 'Desea finalizar la compra?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then( (result)=> {
            if(result.isConfirmed){
                let totalCompra = compraTotal(fn)
                Swal.fire({
                    title: 'Compra realizada',
                    icon: 'success',
                    confirmButtonColor: 'green',
                    text: `Muchas gracias por su compra ha adquirido nuestras bebidas. Por un total de ${totalCompra}`,
                    })
                productosEnCarrito = []
                localStorage.removeItem("carrito")    
                
            }else{
                Swal.fire({
                    title: 'Compra no realizada',
                    icon: 'info',
                    text: `La compra no ha sido realizada! Sus productos siguen en el carrito`,
                    confirmButtonColor: 'green',
                    timer:3500
                })
            }
    })

}

//EVENTOS:


// inputBuscador.addEventListener('input', ()=>{
//     buscarInfo(inputBuscador.value.toLowerCase(), bebidas)
// })

seleccionDeOrden.addEventListener("change", ()=>{

    if(seleccionDeOrden.value == "1"){
        ordenarMayorMenor(bebidas)
    }else if(seleccionDeOrden.value =="2"){
        ordenarMenorMayor(bebidas)
    }else if(seleccionDeOrden.value == "3"){
        ordenarAlfabeticamenteTitulo(bebidas)
    }else{
        verCatalogo(bebidas)
    }
})

botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})

btnFinalizarCompra.addEventListener('click', ()=> {
    finalizarCompra(productosEnCarrito)
})

// const store = document.querySelector('#store');

// store.onclick = () => {
   
// }

menuToggle.onclick = function () {
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');

}


