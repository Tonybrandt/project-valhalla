// Tercer pre-entrega: storage, eventos y DOM
// //----------------------------------------------------------------------------------------
// //PROYECTO CON DOM:

let bebidasDiv = document.getElementById("bebidas1")
let verCatalogoBtn = document.getElementById("verCatalogo")
let ocultarCatalogoBtn = document.getElementById("ocultarCatalogo")
// *********
let sugerirBebidaBtn = document.getElementById("sugerirBebidaBtn")
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

function verCatalogo(array){
    
    bebidasDiv.innerHTML = ""

    for(let drink of array){
        //div padre de la card
        let nuevoDrinkDiv = document.createElement("div")
        nuevoDrinkDiv.className = "col-12 col-md-6 col-lg-4 my-3"
        nuevoDrinkDiv.innerHTML = `
        <div id="${drink.id}" class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="height: 530px; object-fit: cover;"src="assets/${drink.imagen}" alt="${drink.nombre} de ${drink.nombre}">
            <div class="card-body">
                <h4 class="card-title">${drink.nombre}</h4>
                <p>Bebida: ${drink.nombre}</p>
                <p class="${drink.precio <= 2300 && "ofertaLibro"}">Precio: ${drink.precio}</p>
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
    //sumarlo a productosEnCarrito
    productosEnCarrito.push(trago)
    //setearlo en storage
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    console.log(productosEnCarrito)
    //evaluar si ya existe o no el producto
}

// ******************************************
function cargarBebida(array){
    let inputAutor = document.getElementById("sugerenciaCombinacion")
    let inputTitulo = document.getElementById("nombreBebida")
    
    //hacerlo con la function constructora
    const nuevaBebida = new Bebida(array.length+1, inputAutor.value, inputTitulo.value, "new-drink.jpg")
    console.log(nuevaBebida)
 
    //pushearlo o sumarlo al array
    array.push(nuevaBebida)
    //guardar en storage:
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
    console.log("Funciona btn render carrito")
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
     //segundo forEach agregar function eliminar   
     array.forEach((productoCarrito)=>{
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", ()=>{
            // console.log("btn eliminar funciona")
            //borrar del DOM
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            //eliminar del array
            //busco prod a eliminar
            let productoEliminar = array.find(drink => drink.id == productoCarrito.id)
            console.log(productoEliminar)
            //busco el indice
            let posicion = array.indexOf(productoEliminar)
            console.log(posicion)
            //splice (posicion donde trabajar, cant de elementos a eliminar)
            array.splice(posicion, 1)
            console.log(array)
            //eliminar storage (volver a setear)
            localStorage.setItem("carrito", JSON.stringify(array))
            //recalcular total
            compraTotal(array)
        })
     })
    compraTotal(array)
}
// **********************************************************************

function agregarAlCarrito(drink){
    //evaluar si ya existe o no el producto
    let bebidaAgregada = productosEnCarrito.find((elem)=> elem.id == drink.id)
    if(bebidaAgregada == undefined){
        console.log(`El producto ${drink.nombre} ha sido agregado al carrito y vale ${drink.precio}`)
        //sumarlo a productosEnCarrito
        productosEnCarrito.push(drink)
        //setearlo en storage
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        // console.log(productosEnCarrito)
        //sweetalert para experiencia de usuario
        Swal.fire({
            title: 'Has agregado un producto',
            text: `La bebida ${drink.nombre} ha sido agregada`,
            icon: "info",
            confirmButtonText: "Gracias!",
            confirmButtonColor: "green",
            //milisegundo por medida
            timer: 2000,
            //para img
            imageUrl: `assets/${drink.imagen}`,
            imageHeight: 200 
        })

    }else{
        //el producto ya se encuentra
        console.log(`La bebida ${drink.nombre} ya se encuentra en el carrito`)
        //OTRA OPCION: logica que acumule cantidad
        //que me avise que ya está en el carrito
        Swal.fire({
            text: `La bebida ${drink.nombre} ya existe en el carrito`,
            icon: "info",
            timer: 1500,
            showConfirmButton: false
        })
    }

}

// *********************************************************************

// FUNCION QUE MUESTRA EL TOTAL EN EL CARRITO

function compraTotal(array){
    // reduce
    // let acumulador = 0
    // for(let book of array){
    //     acumulador = acumulador + book.precio
    // }
    
    //acumulador con reduce
    let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio ,0)
    console.log("Acc con reduce " + total)
    //ternario para mostrar en el html
    total == 0 ?
    precioTotal.innerHTML = `No hay productos agregados` :
    precioTotal.innerHTML = `El total del carrito es <strong>${total}</strong>`
    return total
}


//functions ordenar:
function ordenarMenorMayor(array){
    //copia array original, para no modificar bebidas
    const menorMayor = [].concat(array)
    menorMayor.sort((a, b)=> a.precio - b.precio)
    verCatalogo(menorMayor)
}

function ordenarMayorMenor(array){
    //array que recibe y lo copia
    const mayorMenor = [].concat(array)
    mayorMenor.sort((a,b)=> b.precio - a.precio)
    verCatalogo(mayorMenor)
    
}

function ordenarAlfabeticamenteTitulo(array){
        const ordenadoAlfabeticamente = [].concat(array)
        //ordenar algo que tiene un dato string
        //forma de la a-z ascendente
        ordenadoAlfabeticamente.sort((a, b) => {
            if (a.nombre > b.nombre) {
              return 1
            }
            if (a.nombre < b.nombre) {
              return -1
            }
            // a es igual b
            return 0
          })
          verCatalogo(ordenadoAlfabeticamente)
}


//  //EVENTOS:
sugerirBebidaBtn.addEventListener("click", ()=>{
    cargarBebida(bebidas)

})
verCatalogoBtn.onclick = function() {
    verCatalogo(bebidas)
    
}

ocultarCatalogoBtn.addEventListener("dblclick", ()=>{
    bebidasDiv.innerHTML =""
})

//por cada evento, averiguar su funcionamiento, luego pasarle function con instrucciones a realizar
inputBuscador.addEventListener("input", ()=>{
    buscarInfo(inputBuscador.value.toLowerCase(), bebidas)
})
//select para ordenar
selectOrden.addEventListener("change", ()=>{
    // console.log(selectOrden.value)
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
// //CODIGO:
// verCatalogo(estanteria)

// //CLASE 7 - Operadores avanzados y Librerías

// //OPERADORES AVANZADOS
// // let num = 8
// // if(num == 4){
// //     console.log("El num es 4")
// // }else{
// //     console.log("El Num NO es 4")
// // }
// // //operador ternario:
// // //condicion ? lo que se ejecuta si es true : lo que se ejecuta si es False
// // num == 4 ? console.log("El num es 4. Con ternario") : console.log("El Num NO es 4. Con ternario") 

// // //operador nullish
// // let busquedaNullish = estanteria.find((book) => book.titulo == "Paula" ) ?? "No tenemos ese libro en stock"
// // console.log(busquedaNullish)

// // //Acceso condicional:
// // console.log(libro3?.autor || "El/la autor/a no existe")
// // let enciclopedia3 
// // console.log(enciclopedia3?.autor || "El/la autor/a no existe")
// // console.log("---------------------------")
// // //DESESTRUCTURACION:
// // //objects
// // //nombre exacto de la propiedades
// // let {autor, titulo, precio, imagen, editorial} = libro2
// // console.log(autor)
// // console.log(titulo)
// // console.log(precio)
// // console.log(imagen)
// // //si no existe o no pongo el nombre exacto: undefined
// // console.log(editorial)
// // titulo = "Crónica de una muerte anunciada"
// // console.log(titulo)
// // //para no afectar object original
// // // libro2.titulo = "Amor en tiempo de cólera"
// // // console.log(libro2)

// // //desestructuración con ALIAS
// // let {autor: author, titulo: title, precio: price} = libro3
// // console.log(author)
// // console.log(title)
// // console.log(price)

// // //desestructuración arrays: POR POSICIÓN
// // console.log("Arrays")
// // let numeros = [5, 19, 1993, 7, 23, -25]
// // let [a, segundo, , ,x] = numeros
// // console.log(a)
// // console.log(segundo)
// // console.log(x)

// // //SPREAD
// // console.log(estanteria)
// // console.log(...estanteria)
// // console.log(numeros)
// // console.log(...numeros)
// // //objeto Math
// // console.log(Math.min(...numeros))

// // //con objetos
// // let superLibro4 = {
// //     ...libro4,
// //     cantPag: 875,
// //     editorial: "Sudamericana"
// // }
// // console.log(superLibro4)

// //LIBRERIAS
// //Primera librería sweetAlert
// // Swal.fire({
// //     title: 'Error!',
// //     text: 'Do you want to continue',
// //     icon: 'error',
// //     confirmButtonText: 'Cool'
// //   })
// // Swal.fire({
// //     title: "Bienvenidos/as",
// //     text: "Buen día, hoy es 4 del 2",
// //     confirmButtonText: "Entendido",
// //     confirmButtonColor: "Green",
// //     icon: "success"
// // })

// //SEgunda librería Toastify
// // Toastify({
// //     text: "This is a toast",
// //     duration: 3000,
// //     destination: "https://github.com/apvarun/toastify-js",
// //     newWindow: true,
// //     close: true,
// //     gravity: "bottom", // `top` or `bottom`
// //     position: "center", // `left`, `center` or `right`
// //     stopOnFocus: true, // Prevents dismissing of toast on hover
// //     style: {
// //       background: "linear-gradient(to right, #00b09b, #96c93d)",
// //       color: "black"
// //     },
// //     onClick: function(){} // Callback after click
// //   }).showToast();


// //Luxon: 
// //tercera librería
// const DateTime = luxon.DateTime
// // console.log(DateTime)

// // //crear con fecha con iso
// // const cumple = DateTime.fromISO("1993-07-19")
// // console.log(cumple)

// // console.log(cumple.year)
// // console.log(cumple.day)
// // console.log(cumple.weekdayLong)

// const fechaHoy = DateTime.now()
// // console.log(fechaHoy)
// // console.log(fechaHoy.second)
// // console.log(fechaHoy.day)

// // //formatos:
// // console.log(fechaHoy.toLocaleString(DateTime.DATE_SHORT))
// // console.log(fechaHoy.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY))
// // console.log(fechaHoy.toLocaleString(DateTime.DATE_FULL))

// let fecha = document.getElementById("fecha")
// let fechaMostrar = fechaHoy.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
// fecha.innerHTML = `${fechaMostrar}`