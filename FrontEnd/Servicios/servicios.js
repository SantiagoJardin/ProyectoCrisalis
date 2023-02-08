const tableBody = document.querySelector("#tbody")
const tableHead = document.querySelector("#thead")
const impuestoTable = document.querySelector("#impuesto-table")
const impuestoTableBody = document.querySelector("#impuesto-tbody")
const impuestoTableHead = document.querySelector("#impuesto-thead")
const impuestoTableCrear = document.querySelector("#impuesto-table-crear")
const impuestoTableBodyCrear = document.querySelector("#impuesto-tbody-crear")
const impuestoTableHeadCrear = document.querySelector("#impuesto-thead-crear")
const nombre = document.querySelector("#servicio")
const precio = document.querySelector("#precio")
const cargo = document.querySelector("#soporte")
const guardarBtn = document.querySelector("#guardar")
const lista = 'http://localhost:8080/servicio/lista'
let resultados = ''
let listaAEnviar = [];
const contenedor = document.querySelector("#data")
const btnEditar = document.querySelector("#editar")
const btnEliminar = document.querySelector("#eliminar")

const idServicio = document.querySelector("#id-servicio")
const nombreServicio = document.querySelector("#nombre-servicio");
const precioServicio = document.querySelector("#precio-servicio");
const cargoSoporte = document.querySelector("#cargo-soporte");
const centerPanelContainer = document.querySelector("#centerpanel-container");
const centerPanelServicio = document.querySelector("#centerpanel-servicio");
const guardarEdicionServicio = document.querySelector("#guardar-edicion-servicio");
const cerrarEdicionServicio = document.querySelector("#cerrar-edicion-servicio");

const nombreBuscado = document.querySelector("#nombre-busqueda")

const botonCerrar = document.querySelector("#boton-cerrar")




//registro de Servicios
async function registroServicio() {
    const guardar = `http://localhost:8080/servicio/guardar_servicio?impuestosId=${listaAEnviar}`
    const data = {
        servicio: nombre.value,
        precio: precio.value,
        cargo: cargo.value,
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

guardarBtn.addEventListener("click", registroServicio)


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
        for (let i = 0; i < (dataObjectArray.length) - 0; i++) {

            if (i == 4) {
                let listaAMostrar = [];
                let listaImpuestos = dataObjectArray[i][1];
                for (let j of listaImpuestos) {
                    listaAMostrar.push(j.impuesto)
                }
                const cellElement = document.createElement("td")
                cellElement.textContent = listaAMostrar;
                rowElement.appendChild(cellElement);
                continue;
            }

            const cellElement = document.createElement("td")

            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }
        editar = document.createElement("button");
        borrar = document.createElement("button");

        editar.addEventListener("click", () => {
            centerPanelContainer.style.display = "flex";
            centerPanelServicio.style.display = "flex";
            idServicio.value = dataObjectArray[0][1];
            nombreServicio.value = dataObjectArray[1][1];
            precioServicio.value = dataObjectArray[2][1];
            cargoSoporte.value = dataObjectArray[3][1];
            let impuestos = dataObjectArray[4][1];
            let listaDeImpuestos = [];
            for (let i of impuestos) {
                listaDeImpuestos.push(i.impuesto)
            }

            for (let k = 1, filaImpuesto; filaImpuesto = impuestoTable.rows[k]; k++) {
                document.querySelector(`#checkbox${filaImpuesto.cells[0].innerHTML}`).checked = false;
                listaAEnviar = [];
            }

            for (let k = 1, filaImpuesto; filaImpuesto = impuestoTable.rows[k]; k++) {
                if (listaDeImpuestos.includes(filaImpuesto.cells[1].innerHTML)) {
                    document.querySelector(`#checkbox${filaImpuesto.cells[0].innerHTML}`).checked = true;
                    listaAEnviar.push(parseInt(filaImpuesto.cells[0].innerHTML))
                } else {
                    const index = listaDeImpuestos.indexOf(filaImpuesto.cells[0].innerHTML);
                    if (index > -1) {
                        listaAEnviar.splice(index, 1);
                    }
                }
            }
        })

        borrar.addEventListener("click", () => {
            if (confirm("¿Desea eliminar?") == false) {
                return
            }
            let servicio = dataObjectArray[0][1];
            console.log
            let linkBorrar = `http://localhost:8080/servicio/borrar?id=${servicio}`
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

function cargarBodyImpuestos(data) {
    for (let dataObject of data) {
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for (let i = 0; i < dataObjectArray.length; i++) {

            const cellElement = document.createElement("td")

            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }
        const checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", `checkbox${dataObjectArray[0][1]}`)
        checkbox.setAttribute("class", "checkbox");

        rowElement.appendChild(checkbox);

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                listaAEnviar.push(dataObjectArray[0][1]);
            } else {
                const index = listaAEnviar.indexOf(dataObjectArray[0][1]);
                listaAEnviar.splice(index, 1);
            }
        })

        impuestoTableBody.appendChild(rowElement);
    }

    impuestoTable.rows[0].style.backgroundColor = "#123873";
    impuestoTable.rows[0].style.color = "white";
    for (let i = 1, row; row = impuestoTable.rows[i]; i++) {
        if (i % 2 == 0) {
            row.style.backgroundColor = "#EEEEEE";
        }
    }
}

function cargarBodyImpuestosCrear(data) {
    for (let dataObject of data) {
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for (let i = 0; i < dataObjectArray.length; i++) {

            const cellElement = document.createElement("td")

            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }
        const checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", `checkbox${dataObjectArray[0][1]}`)
        checkbox.setAttribute("class", "checkbox");

        rowElement.appendChild(checkbox);

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                listaAEnviar.push(dataObjectArray[0][1]);
                console.log(listaAEnviar)
            } else {
                const index = listaAEnviar.indexOf(dataObjectArray[0][1]);
                listaAEnviar.splice(index, 1);
                console.log(listaAEnviar)
            }
        })

        impuestoTableBodyCrear.appendChild(rowElement);
    }

    impuestoTableCrear.rows[0].style.backgroundColor = "#123873";
    impuestoTableCrear.rows[0].style.color = "white";
    for (let i = 1, row; row = impuestoTableCrear.rows[i]; i++) {
        if (i % 2 == 0) {
            row.style.backgroundColor = "#EEEEEE";
        }
    }
}

async function refreshTableImpuestos(urlHeaders, urlBody) {
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();

    // Limpiar
    impuestoTableHead.innerHTML = "<tr></tr>";

    // Llenar
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        impuestoTableHead.querySelector("tr").appendChild(headerElement);
    }

    centerPanelServicio.style.display = "flex";

    // Body
    impuestoTableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        cargarBodyImpuestos(data);
    });
}

async function refreshTableImpuestosCrear(urlHeaders, urlBody) {
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();

    // Limpiar
    impuestoTableHeadCrear.innerHTML = "<tr></tr>";

    // Llenar
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        impuestoTableHeadCrear.querySelector("tr").appendChild(headerElement);
    }

    // Body
    impuestoTableBodyCrear.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        cargarBodyImpuestosCrear(data);
    });
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

    centerPanelServicio.style.display = "none";

    // Body
    tableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        cargarBody(data);
    });
}

refreshTable("./headers.json", lista)
refreshTableImpuestos("./impuesto-headers.json", "http://localhost:8080/impuesto/lista")
refreshTableImpuestosCrear("./impuesto-headers.json", "http://localhost:8080/impuesto/lista")

cerrarEdicionServicio.addEventListener("click", () => {
    centerPanelContainer.style.display = "none";
    centerPanelServicio.style.display = "none";
})

guardarEdicionServicio.addEventListener("click", async () => {
    let link = `http://localhost:8080/servicio/actualizar?servicio=${nombreServicio.value}&precio=${precioServicio.value}&cargo=${cargoSoporte.value}&id=${idServicio.value}&impuestosId=${listaAEnviar.toString()}`
    await fetch(link, {
        method: "POST"
    })
    centerPanelContainer.style.display = "none";
    centerPanelServicio.style.display = "none";
    refreshTable("./headers.json", lista)
})

function search() {
    event.preventDefault();
    let listaBusqueda = `http://localhost:8080/servicio/obtener_por_nombre?servicio=${nombreBuscado.value}`
    refreshTable("./headers.json", listaBusqueda)
}

botonCerrar.addEventListener("click", () => {
    open("../Login/Login.html", "_self");
})