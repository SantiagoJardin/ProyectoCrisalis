//Variables Empresa
const nombreE = document.querySelector("#nombreE")
const identificacionE = document.querySelector("#identificacionE")
const apellidoE = document.querySelector("#apellidoE")
const direccionE = document.querySelector("#direccionE")
const emailE = document.querySelector("#emailE")
const razonSocial = document.querySelector("#razonE")
const fechaInicio = document.querySelector("#fecha")

//Variables Persona
const nombreP = document.querySelector("#nombreP")
const identificacionP = document.querySelector("#identificacionP")
const apellidoP = document.querySelector("#apellidoP")
const direccionP = document.querySelector("#direccionP")
const emailP = document.querySelector("#emailP")

//Link para guardar clientes
const guardar = 'http://localhost:8080/cliente/guardar_cliente'

//Boton para guardar empresa o persona
const guardarBtn = document.querySelector("#guardar")
const guardarBtnp = document.querySelector("#guardarP")
const empresaBtn = document.querySelector("#modalEmpresa")


//Registro Empresa
function registroClienteEmpresa() { 
    if (nombreE.value != "" && apellidoE.value != "" && identificacionE.value != "" && emailE.value != "" && direccionE.value != "" && razonSocial.value != "") {
        if (confirm("¿Confirmar registro?") == false) {
            return
        }
            const data = {
                es_empresa : true,
                nombre : nombreE.value,
                identificacion : identificacionE.value,
                apellido : apellidoE.value,
                direccion : direccionE.value,
                email : emailE.value,
                razonSocial : razonSocial.value,
                fechaInicio : fechaInicio.value
            };
            console.log(fechaInicio.value)
            const response = fetch(guardar, {
                method : 'POST',
                body : JSON.stringify(data),
                headers : {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
            alert("Empresa registrada")
    } 
}
guardarBtn.addEventListener("click", registroClienteEmpresa) 

//Registro Persona
function registroClientePersona() { 
    if (nombreP.value != "" && apellidoP.value != "" && identificacionP.value != "" && emailP.value != "" && direccionP.value != "") {
        if (confirm("¿Confirmar registro?") == false) {
            return
        }
            const data = {
                es_empresa : false,
                nombre : nombreP.value,
                identificacion : identificacionP.value,
                apellido : apellidoP.value,
                direccion : direccionP.value,
                email : emailP.value,
                razonSocial : null,
                fechaInicio : null
            };
            const response = fetch(guardar, {
                method : 'POST',
                body : JSON.stringify(data),
                headers : {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
            alert("Persona registrada")
    } 
}


empresaBtn.addEventListener("click", () => {
    empresa = true
})
guardarBtnp.addEventListener("click", registroClientePersona)