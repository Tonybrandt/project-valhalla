﻿const indicator = document.querySelector('.indicator');
const body = document.querySelector('body');
const toggle = document.querySelector('#toggle')

indicator.onclick = function() {
    indicator.classList.toggle('active')
    body.classList.toggle('active')
    toggle.classList.toggle('active')
}

// if(localStorage.getItem("lightMode")){

//     if (JSON.parse(localStorage.getItem("lightMode")) == true){
//         moon.style.display = 'block'
//         sun.style.display = 'none'
//         btnSwitch.className = `btn btn-dark`
//     }
// }else{
//     localStorage.setItem("lightMode", false)
//     sun.style.display = 'block'
//     moon.style.display = 'none'
// }

// btnSwitch.addEventListener("click", ()=>{

//     document.body.classList.toggle("lightMode")
//     localStorage.getItem("lightMode")
//     if(JSON.parse(localStorage.getItem("lightMode")) == false){
//         sun.style.display = "none"
//         moon.style.display = 'block'
//         btnSwitch.className = `btn btn-light`
//         localStorage.setItem("lightMode", true)
//     }else{
//         moon.style.display = "none"
//         sun.style.display = 'block'
//         btnSwitch.className = `btn btn-dark`
//         localStorage.setItem("lightMode", false)
//     }
// })