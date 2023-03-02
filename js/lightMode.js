let btnSwitch = document.getElementById("switch")

let moon = document.createElement("p")
moon.className = "moon"
moon.append(`<i class="fa-regular fa-moon"></i>`)
// moon.innerHTML = `<i class="fa-regular fa-moon"></i>`
let sun = document.createElement('p')
this.className = 'sun'
sun.append(`<i class="fa-regular fa-sun"></i>`)

if(localStorage.getItem("lightMode")){
    if(JSON.parse(localStorage.getItem("lightMode")) == true){
        btnSwitch.innerText = `Claro`
        btnSwitch.className = `btn btn-dark`
    }
}else{
    localStorage.setItem("lightMode", false)
}

btnSwitch.addEventListener("click", ()=>{

    document.body.classList.toggle("lightMode")

    if(JSON.parse(localStorage.getItem("lightMode")) == false){
        btnSwitch.textContent = `Claro`
        btnSwitch.className = `btn btn-light`
        localStorage.setItem("lightMode", true)
    }else{
        btnSwitch.innerText = `Oscuro`;
        btnSwitch.className = `btn btn-dark`
        localStorage.setItem("lightMode", false)
    }
})

// let moon = document.createElement("i")
// moon.className = "moon"
// moon.innerHTML = `<i class="fa-regular fa-moon"></i>
// `


// `<i class="fa-regular fa-moon"></i>`

// <i class="fa-regular fa-moon"></i> Luna

// let nuevoDrinkDiv = document.createElement("div")
// nuevoDrinkDiv.setAttribute("id", "bebidasDiv");
// nuevoDrinkDiv.className = "col-12 col-md-6 col-lg-4 my-3"
// nuevoDrinkDiv.innerHTML = `
// <div id="${drink.id}" class="card" style="width: 18rem;">
//     <img class="card-img-top img-fluid" style="height: 530px; object-fit: cover;"src="assets/${drink.imagen}" alt="${drink.nombre}">
//     <div class="card-body">
//         <h4 class="card-title">${drink.nombre}</h4>
//         <p>Bebida: ${drink.nombre}</p>
//         <p class="">Precio: ${drink.precio}</p>
//         <button id="agregarBtn${drink.id}" class="btn btn-outline-success">Agregar al carrito</button>
//     </div>
// </div> 
// `