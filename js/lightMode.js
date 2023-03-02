let btnSwitch = document.getElementById("switch")

if(localStorage.getItem("lightMode")){
    if(JSON.parse(localStorage.getItem("lightMode")) == true){
        btnSwitch.innerText = `Oscuro`
        btnSwitch.className = `btn btn-dark`
    }
}else{
    localStorage.setItem("lightMode", false)
}

btnSwitch.addEventListener("click", ()=>{

    document.body.classList.toggle("lightMode")

    if(JSON.parse(localStorage.getItem("lightMode")) == false){
        btnSwitch.textContent = `Oscuro`
        btnSwitch.className = `btn btn-light`
        localStorage.setItem("lightMode", true)
    }else{
        btnSwitch.innerText = `Claro`;
        btnSwitch.className = `btn btn-dark`
        localStorage.setItem("lightMode", false)
    }
})