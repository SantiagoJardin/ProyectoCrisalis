const tableBody = document.querySelector("#tbody")
const tableHead = document.querySelector("#thead")
const impuesto = document.querySelector("#nombre-impuesto")
const porcentaje = document.querySelector("#porcentaje-impuesto")
const guardarBtn = document.querySelector("#guardar")
const guardar = 'http://localhost:8080/impuesto/guardar_impuesto'
const lista = 'http://localhost:8080/impuesto/lista'
let resultados = ''
const contenedor = document.querySelector("#data")
const btnEditar = document.querySelector("#editar")
const btnEliminar = document.querySelector("#eliminar")
const botonCerrar = document.querySelector("#boton-cerrar")


//add
const nombreImpuesto = document.querySelector("#impuesto");
const porcentajeImpuesto = document.querySelector("#Porcentaje");


//edit
let idImpuesto = ""




const nombreBuscado = document.querySelector("#nombre-busqueda")
const centerPanelContainer = document.querySelector("#centerpanel-container");
const centerPanelImpuesto = document.querySelector("#centerpanel-impuesto");
const guardarEdicionImpuesto = document.querySelector("#guardar-edicion-impuesto");
const cerrarEdicionImpuesto = document.querySelector("#cerrar-edicion-impuesto");




//registro de productos
function registroImpuesto() { 
    const data = {
        impuesto : nombreImpuesto.value,
        porcentaje : porcentajeImpuesto.value,
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
    alert("Impuesto registrado")
}

guardarBtn.addEventListener("click", registroImpuesto)


async function fetchDataFromDB(lista) {
    const response = await fetch(lista)
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

function cargarBody(data) {
    console.log(data)
    for(let dataObject of data) {
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for(let i = 0; i < (dataObjectArray.length) - 0; i++) {

            const cellElement = document.createElement("td")

            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }
        editar = document.createElement("button");
        borrar = document.createElement("button");

        editar.addEventListener("click", () => {
            centerPanelContainer.style.display = "flex";
            centerPanelImpuesto.style.display = "flex";
            idImpuesto = dataObjectArray[0][1];
            impuesto.value = dataObjectArray[1][1];
            porcentaje.value = dataObjectArray[2][1];
           

        })

        borrar.addEventListener("click", () => {
            let impuesto = dataObjectArray[0][1];
            console.log
            let linkBorrar = `http://localhost:8080/impuesto/borrar?id=${impuesto}`
            let response = fetch(linkBorrar, {
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

        for (let i = 1, row; row = table.rows[i]; i++) {
            table.rows[0].style.backgroundColor = "#123873";
            table.rows[0].style.color = "white";
            if (i % 2 == 0) {
                row.style.backgroundColor = "#EEEEEE";
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

    centerPanelImpuesto.style.display = "none";

    // Body
    tableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        cargarBody(data);
    });
}

refreshTable("./headers.json", lista)

cerrarEdicionImpuesto.addEventListener("click", () => {
    centerPanelContainer.style.display = "none";
    centerPanelImpuesto.style.display = "none";
})

guardarEdicionImpuesto.addEventListener("click", () => {
    
    let link = `http://localhost:8080/impuesto/actualizar?impuesto=${impuesto.value}&porcentaje=${porcentaje.value}&id=${idImpuesto}`
    fetch(link, {
     method: "POST"
    })
     centerPanelContainer.style.display = "none";
     centerPanelImpuesto.style.display = "none";
     refreshTable("./headers.json", lista)
 
 })

 function search() { 
    event.preventDefault();
    let listaBusqueda =`http://localhost:8080/impuesto/obtener_por_nombre?impuesto=${nombreBuscado.value}`
    refreshTable("./headers.json", listaBusqueda)
    
}

botonCerrar.addEventListener("click" , () => {
    open("../Login/Login.html", "_self");
})