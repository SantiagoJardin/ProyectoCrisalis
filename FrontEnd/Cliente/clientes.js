let editar;
let borrar;

const centerPanelContainer = document.querySelector("#centerpanel-container");
const centerPanelPersona = document.querySelector("#centerpanel-persona");
const centerPanelEmpresa = document.querySelector("#centerpanel-empresas");
const guardarEdicionPersona = document.querySelector("#guardar-edicion-persona");
const cerrarEdicionPersona = document.querySelector("#cerrar-edicion-persona");
const guardarEdicionEmpresa = document.querySelector("#guardar-edicion-empresa");
const cerrarEdicionEmpresa = document.querySelector("#cerrar-edicion-empresa");

const tableBody = document.querySelector("#tbody")
const tableHead = document.querySelector("#thead")

const nombrePersona = document.querySelector("#nombre-persona");
const apellidoPersona = document.querySelector("#apellido-persona");
const direccionPersona = document.querySelector("#direccion-persona");
const emailPersona = document.querySelector("#email-persona");
const identificacionEmpresa = document.querySelector("#cuit-empresa");
const razonSocialEmpresa = document.querySelector("#razon-social-empresa");
const fechaInicioEmpresa = document.querySelector("#fecha-empresa");
const nombreEmpresa = document.querySelector("#nombre-empresa");
const apellidoEmpresa = document.querySelector("#apellido-empresa");
const direccionEmpresa = document.querySelector("#direccion-empresa");
const emailEmpresa = document.querySelector("#email-empresa");
const identificacionPersona = document.querySelector("#identificacion-persona");

//variables empresa
const nombreE = document.querySelector("#nombreE")
const identificacionE = document.querySelector("#identificacionE")
const apellidoE = document.querySelector("#apellidoE")
const direccionE = document.querySelector("#direccionE")
const emailE = document.querySelector("#emailE")
const razonSocial = document.querySelector("#razonE")
const fechaInicio = document.querySelector("#fecha")

//variables persona
const nombreP = document.querySelector("#nombreP")
const identificacionP = document.querySelector("#identificacionP")
const apellidoP = document.querySelector("#apellidoP")
const direccionP = document.querySelector("#direccionP")
const emailP = document.querySelector("#emailP")

//boton empresa o persona
const guardarBtn = document.querySelector("#guardar")
const guardarBtnp = document.querySelector("#guardarP")
const empresaBtn = document.querySelector("#modalEmpresa")

//links
const guardar = 'http://localhost:8080/cliente/guardar_cliente'
const lista = 'http://localhost:8080/cliente/lista'


const nombreBuscado = document.querySelector("#nombre-busqueda")
const buscarBtn = document.querySelector("#buscar-btn")


const contenedor = document.querySelector("#data")
var empresa = false
const btnEditar = document.querySelector("#editar")
const btnEliminar = document.querySelector("#eliminar")

const botonCerrar = document.querySelector("#boton-cerrar")

//registro de clientes
async function registroClienteEmpresa() {
    if (nombreE.value != "" && apellidoE.value != "" && identificacionE.value != "" && emailE.value != "" && direccionE.value != "" && razonSocial.value != "") {
        if (confirm("¿Confirmar registro?") == false) {
            return
        }
        const data = {
            es_empresa: true,
            nombre: nombreE.value,
            identificacion: identificacionE.value,
            apellido: apellidoE.value,
            direccion: direccionE.value,
            email: emailE.value,
            razonSocial: razonSocial.value,
            fechaInicio: fechaInicio.value
        };
        console.log(fechaInicio.value)
        const response = await fetch(guardar, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
}

async function registroClientePersona() {
    if (nombreP.value != "" && apellidoP.value != "" && identificacionP.value != "" && emailP.value != "" && direccionP.value != "") {
        const data = {
            es_empresa: false,
            nombre: nombreP.value,
            identificacion: identificacionP.value,
            apellido: apellidoP.value,
            direccion: direccionP.value,
            email: emailP.value,
            razonSocial: null,
            fechaInicio: null
        };
        const response = await fetch(guardar, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
}


empresaBtn.addEventListener("click", () => {
    empresa = true
})


guardarBtn.addEventListener("click", registroClienteEmpresa)
guardarBtnp.addEventListener("click", registroClientePersona)



async function fetchDataFromDB(lista) {
    const response = await fetch(lista)
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}


function cargarBody(data) {
    for (let dataObject of data) {
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for (let i = 1; i < dataObjectArray.length; i++) {
            const cellElement = document.createElement("td")
            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }
        editar = document.createElement("button");
        borrar = document.createElement("button");

        editar.addEventListener("click", () => {
            centerPanelContainer.style.display = "flex";
            if (dataObjectArray[1][1] == false) {
                centerPanelPersona.style.display = "flex";
                nombrePersona.value = dataObjectArray[2][1];
                apellidoPersona.value = dataObjectArray[4][1];
                identificacionPersona.value = dataObjectArray[3][1];
                direccionPersona.value = dataObjectArray[5][1];
                emailPersona.value = dataObjectArray[6][1];

            } else {
                centerPanelEmpresa.style.display = "flex";
                identificacionEmpresa.value = dataObjectArray[3][1];
                razonSocialEmpresa.value = dataObjectArray[7][1];
                fechaInicioEmpresa.value = dataObjectArray[8][1];
                nombreEmpresa.value = dataObjectArray[2][1];
                apellidoEmpresa.value = dataObjectArray[4][1];
                direccionEmpresa.value = dataObjectArray[5][1];
                emailEmpresa.value = dataObjectArray[6][1];
            }
        })

        borrar.addEventListener("click", async () => {
            if (confirm("¿Desea eliminar?") == false) {
                return
            }
            let dni = dataObjectArray[3][1];
            let linkBorrar = `http://localhost:8080/cliente/borrar?identificacion=${dni}`
            let response = await fetch(linkBorrar, {
                method: "POST"
            })
            console.log(response.status)
            refreshTable("./headers.json", lista)
        })

        let td = document.createElement("td");
        editar.innerHTML = '<img src="../img/boton-editar.png"/>'
        editar.className = "btn";
        borrar.innerHTML = '<img src="../img/basura.png"/>'
        borrar.className = "btn";
        td.append(editar)
        td.append(borrar)
        rowElement.appendChild(td)
        tableBody.appendChild(rowElement);
    }

    for (let i = 1, row; row = table.rows[i]; i++) {
        table.rows[0].style.backgroundColor = "#123873";
        table.rows[0].style.color = "white";
        if (i % 2 == 0) {
            row.style.backgroundColor = "#EEEEEE";
        }
        for (let j = 0, col; col = row.cells[j]; j++) {
            if (col.innerHTML == "false") {
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

    centerPanelEmpresa.style.display = "none";
    centerPanelPersona.style.display = "none";

    // Body
    tableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        console.log(data)
        cargarBody(data);

    });
}

refreshTable("./headers.json", lista)

cerrarEdicionPersona.addEventListener("click", () => {
    centerPanelContainer.style.display = "none";
    centerPanelEmpresa.style.display = "none";
    centerPanelPersona.style.display = "none";
})

cerrarEdicionEmpresa.addEventListener("click", () => {
    centerPanelEmpresa.style.display = "none";
    centerPanelPersona.style.display = "none";
    centerPanelContainer.style.display = "none";
})

guardarEdicionPersona.addEventListener("click", async () => {
    let link = `http://localhost:8080/cliente/actualizar?esEmpresa=false&nombre=${nombrePersona.value}&identificacion=${identificacionPersona.value}&apellido=${apellidoPersona.value}&direccion=${direccionPersona.value}&email=${emailPersona.value}&razonSocial=&fechaInicio=`
    await fetch(link, {
        method: "POST"
    })
    centerPanelContainer.style.display = "none";
    centerPanelEmpresa.style.display = "none";
    centerPanelPersona.style.display = "none";
    refreshTable("./headers.json", lista)

})

guardarEdicionEmpresa.addEventListener("click", async () => {
    let link = `http://localhost:8080/cliente/actualizar?esEmpresa=true&nombre=${nombreEmpresa.value}&identificacion=${identificacionEmpresa.value}&apellido=${apellidoEmpresa.value}&direccion=${direccionEmpresa.value}&email=${emailEmpresa.value}&razonSocial=${razonSocialEmpresa.value}&fechaInicio=${fechaInicioEmpresa.value}`
    console.log(identificacionEmpresa.value)
    await fetch(link, {
        method: "POST"
    })
    centerPanelContainer.style.display = "none";
    centerPanelEmpresa.style.display = "none";
    centerPanelPersona.style.display = "none";
    refreshTable("./headers.json", lista)
})

function search() {
    event.preventDefault();
    let listaBusqueda = `http://localhost:8080/cliente/obtener_por_nombre?nombre=${nombreBuscado.value}`
    refreshTable("./headers.json", listaBusqueda)

}

botonCerrar.addEventListener("click", () => {
    open("../Login/Login.html", "_self");
})