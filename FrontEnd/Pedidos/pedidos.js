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

//Tabla de clientes
const table = document.querySelector("#table")
const tableHead = document.querySelector("#thead")
const tableBody = document.querySelector("#tbody")
const clienteExistenteBtn = document.querySelector("#cliente-existente")
const panelGrande = document.querySelector("#panel-grande")
const panelChico = document.querySelector("#panel-chico")

//Cerrar sesion
const botonCerrar = document.querySelector("#boton-cerrar")


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

async function fetchDataFromDB(lista) {
    const response = await fetch(lista)
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

function cargarBody(data) {
    for(let dataObject of data) {
        
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for(let i = 0; i < dataObjectArray.length; i++) {
            const cellElement = document.createElement("td")
            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }

        tableBody.appendChild(rowElement);
    }

    for (let i = 1, row; row = table.rows[i]; i++) {
        for (let j = 0, col; col = row.cells[j]; j++) {
          if(col.innerHTML == "false") {
            col.innerHTML = "Persona";
          } else if (col.innerHTML == "true") {
            col.innerHTML = "Empresa";
          } else if (col.innerHTML == "") {
            col.innerHTML = "-";
          }
        }
        
    }
}

async function refreshTable(urlHeaders, urlBody) {
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();

    // Limpiar
    tableHead.innerHTML = "<tr></tr>";

    // Llenar
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        tableHead.querySelector("tr").appendChild(headerElement); 
    }    
    
    //panelContainer.style.display = "none";
    

    // Body
    tableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        console.log(data)
        cargarBody(data);

    });
}

clienteExistenteBtn.addEventListener("click", () => {
    refreshTable("./headers.json", 'http://localhost:8080/cliente/lista')
    panelGrande.style.display = "flex";
    panelChico.style.display = "flex";
    
})

botonCerrar.addEventListener("click" , () => {
    open("../Login/Login.html", "_self");
})
