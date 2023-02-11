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

//Instanciación

const bebida1 = new Bebida(1,"Fernet", 2000, "fernet1.jpeg")

const bebida2 = new Bebida(2,"Champagne Du", 900, "champagne-du.jpeg")

const bebida3 = new Bebida(3,"Gordons Gin", 2700, "gin-gordons.jpeg")

const bebida4 = new Bebida(4,"Smirnoff Vodka", 1900, "smirnoff.jpeg")

const bebida5 = new Bebida(5,"Skyy Vodka", 1800, "vodka-skyy.jpeg")

const bebida6 = new Bebida(6,"Promo Fernet + 1 Coca Cola", 2500, "promo-fernet1.jpeg")

const bebida7 = new Bebida(7,"Promo Fernet + 2 Coca Cola", 2700, "promo-fernet2.jpeg")

const bebida8 = new Bebida(8,"Promo Gin Gordons + 1 Paso de los toros", 3000, "promo-gin.jpeg")

const bebida9 = new Bebida(9,"Promo Vodka Smirnoff + 4 Speed", 2650, "promo-smirnoff.jpeg")

const bebida10 = new Bebida(10,"Promo Vodka Skyy + 4 Speed", 2550, "promo-vodka-skyy.jpeg")

let bebidas = []

if(localStorage.getItem("bebidas")){
    bebidas = JSON.parse(localStorage.getItem("bebidas"))
}else{
    bebidas.push(bebida1, bebida2, bebida3, bebida4, bebida5, bebida6, bebida7, bebida8, bebida9, bebida10)
    localStorage.setItem("bebidas", JSON.stringify(bebidas))
}