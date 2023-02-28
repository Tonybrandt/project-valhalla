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
        this.cantidad = this.cantidad - 1
        return this.cantidad
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

if(localStorage.getItem("bebidas")){
for(let bebida of JSON.parse(localStorage.getItem("bebidas"))){
    let bebidaSt = new Bebida(bebida.id, bebida.nombre, bebida.precio, bebida.imagen)
    bebidas.push(bebidaSt)} 
}else {
    mostrarBebidas()
}