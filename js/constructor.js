//class constructora
class Bebida {
    constructor(id, nombre, precio, imagen){
        //propiedades o atributos de nuestra clase
        this.id = id,
        this.nombre = nombre,
        this.precio = precio, 
        this.imagen = imagen,
        this.cantidad = 1
        
    }
    //métodos
    sumarUnidad(){
        this.cantidad += 1
    }
    restarUnidad(){
        this.cantidad += 1
    }
}

let bebidas = []

const mostrarBebidas = async () => {
    const Response = await fetch("bebidas.json")
    const data = await Response.json()
    for(let bebida of data){
        let bebidaNueva = new Bebida(bebida.id, bebida.nombre, bebida.precio, bebida.imagen)
        bebidas.push(bebidaNueva)
    }
    localStorage.setItem("bebidas", JSON.stringify(bebidas))
}

localStorage.getItem("bebidas") ?
bebidas = JSON.parse(localStorage.getItem("bebidas")) : 
mostrarBebidas()
