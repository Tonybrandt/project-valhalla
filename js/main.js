// Tercer pre-entrega: storage, eventos y DOM
// ¨*No subir node modules

// consulta de seguridad
// //PROYECTO CON DOM:

// Utilizar ajax o fetch. sintaxis avanzada, un ternario o 2. 1 Librería. Promesas con fetch async await. Carga de datos desde un JSON local o desde una API externa, puede ser app del clima. Agregar un README.md

let bebidasDiv = document.getElementById("bebidas1")
// *********
// let sugerirBebidaBtn = document.getElementById("sugerirBebidaBtn")
// *********
let inputBuscador = document.querySelector("#buscador")
// let coincidencia = document.getElementById("coincidencia")
// let selectOrden = document.getElementById("selectOrden")
let botonCarrito = document.getElementById("botonCarrito")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
// let precioTotal = document.getElementById("precioTotal")

let productosEnCarrito
if(localStorage.getItem("carrito")){
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)
}

verCatalogo(bebidas)

function verCatalogo(array){
    
    bebidasDiv.innerHTML = ""

    for(let drink of array){
    
        let nuevoDrinkDiv = document.createElement("div")
        nuevoDrinkDiv.setAttribute("id", "bebidasDiv");
        nuevoDrinkDiv.className = "col-12 col-md-6 col-lg-4 my-3"
        nuevoDrinkDiv.innerHTML = `
        <div id="${drink.id}" class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="height: 530px; object-fit: cover;"src="assets/${drink.imagen}" alt="${drink.nombre}">
            <div class="card-body">
                <h4 class="card-title">${drink.nombre}</h4>
                <p>Bebida: ${drink.nombre}</p>
                <p class="">Precio: ${drink.precio}</p>
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


function cargarBebida(array){
    let sugerenciaCombinacion = document.getElementById("sugerenciaCombinacion")
    let nombreBebida = document.getElementById("nombreBebida")
    
    //function constructora
    const nuevaBebida = new Bebida(array.length+1, nombreBebida.value, sugerenciaCombinacion.value, "new-drink.jpg")
    console.log(nuevaBebida)
 
    array.push(nuevaBebida)
    localStorage.setItem("bebidas", JSON.stringify(array))
    verCatalogo(array)
    let formAgregarBebida = document.getElementById("formAgregarBebida")
   
    formAgregarBebida.reset()


    Toastify({
        text: `La bebida ${nuevaBebida.nombre} ha sido agregado al stock`,
        duration: 1500,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
            color: "black"
          }
  }).showToast()
 }


function buscarInfo(buscado, array){

    let busquedaArray = array.filter(
            (drink) => drink.nombre.toLowerCase().includes(buscado.toLowerCase()) || drink.nombre.toLowerCase().includes(buscado.toLowerCase())
        )
    if(busquedaArray.length == 0){
        coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`
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
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-center" height="500px" style="object-fit: cover;" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.nombre}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.nombre}</h4>
                
                    <p class="card-text">$${productoCarrito.precio}</p> 
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

        // Swal.fire({
        //     text: `La bebida ${drink.nombre} ya existe en el carrito`,
        //     icon: "info",
        //     timer: 1500,
        //     showConfirmButton: false
        // })

        Toastify({
            text: `La bebida ${drink.nombre} ya existe en el carrito`,
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

    let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio ,0)
    
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


//EVENTOS:
// sugerirBebidaBtn.addEventListener("click", ()=>{
//     cargarBebida(bebidas)

// })
// verCatalogoBtn.onclick = function() {
//     verCatalogo(bebidas)
    
// }

// ocultarCatalogoBtn.addEventListener("click", ()=>{
//     bebidasDiv.innerHTML =""
// })


inputBuscador.addEventListener("input", ()=>{
    buscarInfo(inputBuscador.value.toLowerCase(), bebidas)
})

selectOrden.addEventListener("change", ()=>{

    if(selectOrden.value == "1"){
        ordenarMayorMenor(bebidas)
    }else if(selectOrden.value =="2"){
        ordenarMenorMayor(bebidas)
    }else if(selectOrden.value == "3"){
        ordenarAlfabeticamenteTitulo(bebidas)
    }else{
        verCatalogo(bebidas)
    }
})

botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})

 


// Toastify({
//     text: "This is a toast",
//     duration: 3000,
//     destination: "https://github.com/apvarun/toastify-js",
//     newWindow: true,
//     close: true,
//     gravity: "bottom", // `top` or `bottom`
//     position: "center", // `left`, `center` or `right`
//     stopOnFocus: true, // Prevents dismissing of toast on hover
//     style: {
//       background: "linear-gradient(to right, #00b09b, #96c93d)",
//       color: "black"
//     },
//     onClick: function(){} // Callback after click
//   }).showToast();
