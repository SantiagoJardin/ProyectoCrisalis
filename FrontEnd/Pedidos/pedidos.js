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
const detalleTable = document.querySelector("#detalle-table")
const detalleTableHead = document.querySelector("#detalle-thead")
const detalleTableBody = document.querySelector("#detalle-tbody")
const productoTable = document.querySelector("#productos-table")
const productoTableHead = document.querySelector("#productos-thead")
const productoTableBody = document.querySelector("#productos-tbody")
const servicioTable = document.querySelector("#servicios-table")
const servicioTableHead = document.querySelector("#servicios-thead")
const servicioTableBody = document.querySelector("#servicios-tbody")
const pedidosTable = document.querySelector("#pedidos-table")
const pedidosTableHead = document.querySelector("#pedidos-thead")
const pedidosTableBody = document.querySelector("#pedidos-tbody")
const detalleTabla = document.querySelector(".detalle-tabla")
const clienteExistenteBtn = document.querySelector("#cliente-existente")
const panelGrande = document.querySelector("#panel-grande")
const panelChico = document.querySelector("#panel-chico")
const detalleDiv = document.querySelector(".detalle-div");
const cantidadInput = document.querySelector("#cantidad-input")
const totalDiv = document.querySelector(".total-div");
const total = document.querySelector("#total");
const panelGrandeDetalle = document.querySelector(".panel-grande-detalle");
const panelChicoDetalle = document.querySelector(".panel-chico-detalle")
const pedidoDetalleTable = document.querySelector("#pedido-detalle-table")
const pedidoDetalleTableHead = document.querySelector("#pedido-detalle-thead")
const pedidoDetalleTableBody = document.querySelector("#pedido-detalle-tbody")
let clienteId;
let elementoSeleccionado;


//Cerrar sesion
const botonCerrar = document.querySelector("#boton-cerrar")

const btnCerrar = document.querySelector("#btn-cerrar")


//Registro Empresa
function registroClienteEmpresa() {
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
        const response = fetch(guardar, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
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
            es_empresa: false,
            nombre: nombreP.value,
            identificacion: identificacionP.value,
            apellido: apellidoP.value,
            direccion: direccionP.value,
            email: emailP.value,
            razonSocial: null,
            fechaInicio: null
        };
        const response = fetch(guardar, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
        alert("Persona registrada")
    }
}
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

        tableBody.appendChild(rowElement);
    }

    for (let i = 1, row; row = table.rows[i]; i++) {
        table.rows[0].style.backgroundColor = "#123873";
        table.rows[0].style.color = "white";
        if (i % 2 == 0) {
            row.style.backgroundColor = "#EEEEEE";
        }
        row.addEventListener("click", async () => {
            table.style.animationName = "slide-left"
            table.style.animationDuration = ".5s"
            table.style.display = "none"
            detalleDiv.style.animationName = "slide-right"
            detalleDiv.style.animationDuration = ".5s"
            detalleDiv.style.display = "inline"
            refreshTableDetalle("./detalle-headers.json")
            detalleTabla.style.display = "inline"
            detalleTabla.style.animationName = "slide-right"
            detalleTabla.style.animationDuration = ".5s"
            document.querySelector("#detalle-titulo").style.display = "inline"
            document.querySelector("#detalle-titulo").style.animationName = "slide-right"
            document.querySelector("#detalle-titulo").style.animationDuration = ".5s"
            totalDiv.style.display = "flex";
            totalDiv.style.animationName = "slide-right"
            totalDiv.style.animationDuration = ".5s"
            document.querySelector("#btn-guardar-pedido").style.display = "inline"

            await fetch(`http://localhost:8080/cliente/obtener_por_identificacion?identificacion=${row.cells[2].innerHTML}`)
                .then(res => res.json())
                .then(data => clienteId = data)

            clienteId = clienteId.id

            for (let p = 1, row; row = detalleTabla.rows[p]; p++) {
                if (p % 2 == 0) {
                    row.style.backgroundColor = "#EEEEEE";
                }
            }
        })
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

function cargarDetalles(tipo, id, nombre, precioUnitario, cantidad, subtotal) {
    const fila = document.createElement("tr")
    let element;

    element = document.createElement("td")
    element.innerHTML = tipo
    fila.appendChild(element)

    element = document.createElement("td")
    element.innerHTML = id
    fila.appendChild(element)

    element = document.createElement("td")
    element.innerHTML = nombre
    fila.appendChild(element)

    element = document.createElement("td")
    element.innerHTML = precioUnitario
    fila.appendChild(element)

    if (tipo == "Producto") {
        element = document.createElement("td")
        element.innerHTML = cantidad
        fila.appendChild(element)
        element = document.createElement("td")
        element.innerHTML = subtotal
        fila.appendChild(element)
    } else {
        element = document.createElement("td")
        element.innerHTML = 1
        fila.appendChild(element)
        element = document.createElement("td")
        element.innerHTML = precioUnitario
        fila.appendChild(element)
    }




    detalleTable.appendChild(fila)
}

async function calcularImpuestos(precioUnitario, impuestos) {
    let listaImpuestos = impuestos.split(",")
    let precio = parseFloat(precioUnitario);
    let responseData;
    for (let impuesto of listaImpuestos) {
        const response = await fetch(`http://localhost:8080/impuesto/obtener_por_nombre?impuesto=${impuesto}`)
            .then(res => res.json())
            .then(data => responseData = data);

        let responseDataArray = Object.entries(responseData)
        let cargo = precio * (parseFloat(responseDataArray[0][1].porcentaje)) / 100
        precio = precio + cargo;
    }
    return precio;
}

function sumarTotal() {
    let total = 0;
    for (let i = 1, row; row = detalleTable.rows[i]; i++) {
        total = total + parseFloat(row.cells[5].innerHTML)
    }
    return total;
}

function cargarBodyProductos(data) {
    for (let dataObject of data) {

        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for (let i = 0; i < dataObjectArray.length; i++) {

            if (i == 5) {
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

        productoTableBody.appendChild(rowElement);
    }
    for (let i = 1, row; row = productoTable.rows[i]; i++) {
        productoTable.rows[0].style.backgroundColor = "#123873";
        productoTable.rows[0].style.color = "white";
        if (i % 2 == 0) {
            row.style.backgroundColor = "#EEEEEE";
        }
        row.addEventListener("click", async () => {
            document.querySelector(".panel-grande-lista").style.display = "none"
            document.querySelector(".panel-chico-productos").style.display = "none"
            document.querySelector("#detalle-titulo").style.display = "none";
            let precio = await calcularImpuestos(row.cells[2].innerHTML, row.cells[5].innerHTML)
            if (cantidadInput.value == "") {
                cantidadInput.value = 1;
            }
            precio = precio * cantidadInput.value
            cargarDetalles("Producto", row.cells[0].innerHTML, row.cells[1].innerHTML, await calcularImpuestos(row.cells[2].innerHTML, row.cells[5].innerHTML), cantidadInput.value, precio)
            let suma = sumarTotal()
            total.innerHTML = suma

        })
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

function cargarBodyServicios(data) {
    for (let dataObject of data) {

        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for (let i = 0; i < dataObjectArray.length; i++) {

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

        servicioTableBody.appendChild(rowElement);
    }
    for (let i = 1, row; row = servicioTable.rows[i]; i++) {
        servicioTable.rows[0].style.backgroundColor = "#123873";
        servicioTable.rows[0].style.color = "white";
        if (i % 2 == 0) {
            row.style.backgroundColor = "#EEEEEE";
        }
        row.addEventListener("click", async () => {
            document.querySelector(".panel-grande-lista").style.display = "none"
            document.querySelector(".panel-chico-servicios").style.display = "none"
            document.querySelector("#detalle-titulo").style.display = "none";
            let precio = await calcularImpuestos(row.cells[2].innerHTML, row.cells[4].innerHTML)
            if (cantidadInput.value == "") {
                cantidadInput.value = 1;
            }
            precio = (precio * cantidadInput.value) + parseFloat(row.cells[3].innerHTML)
            cargarDetalles("Servicio", row.cells[0].innerHTML, row.cells[1].innerHTML, await calcularImpuestos(row.cells[2].innerHTML, row.cells[4].innerHTML) + parseFloat(row.cells[3].innerHTML), cantidadInput.value, precio)
            let suma = sumarTotal()
            total.innerHTML = suma

        })
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

    // Body
    tableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        console.log(data)
        cargarBody(data);
    });
}

async function refreshTableProductos(urlHeaders, urlBody) {
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();

    // Limpiar
    productoTableHead.innerHTML = "<tr></tr>";

    // Llenar
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        productoTableHead.querySelector("tr").appendChild(headerElement);
    }

    // Body
    productoTableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        cargarBodyProductos(data);
    });
}

async function refreshTableServicios(urlHeaders, urlBody) {
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();

    // Limpiar
    servicioTableHead.innerHTML = "<tr></tr>";

    // Llenar
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        servicioTableHead.querySelector("tr").appendChild(headerElement);
    }

    // Body
    servicioTableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        cargarBodyServicios(data);
    });
}

async function refreshTableDetalle(urlHeaders) {
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();

    // Limpiar
    detalleTableHead.innerHTML = "<tr></tr>";
    // Llenar
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        detalleTableHead.querySelector("tr").appendChild(headerElement);
    }

    detalleTableBody.innerHTML = "";
}

function cargarBodyPedidos(data) {
    for (let dataObject of data) {
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for (let i = 0; i < dataObjectArray.length - 1; i++) {
            if (i == 1) {
                const cellElement = document.createElement("td")
                cellElement.textContent = dataObjectArray[i][1].nombre + " " + dataObjectArray[i][1].apellido;
                rowElement.appendChild(cellElement);
                continue;
            }
            if (i == 2) {
                const cellElement = document.createElement("td")
                cellElement.textContent = dataObjectArray[3][1];
                rowElement.appendChild(cellElement);
                continue;
            }
            if (i == 3) {
                const cellElement = document.createElement("td")
                cellElement.textContent = dataObjectArray[2][1];
                rowElement.appendChild(cellElement);
                continue;
            }
            const cellElement = document.createElement("td")
            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }

        pedidosTableBody.appendChild(rowElement);
    }
    pedidosTable.rows[0].style.backgroundColor = "#123873";
    pedidosTable.rows[0].style.color = "white";
    for (let i = 1, row; row = pedidosTable.rows[i]; i++) {
        if (i % 2 == 0) {
            row.style.backgroundColor = "#EEEEEE";
        }
        row.addEventListener("click", () => {
            panelGrandeDetalle.style.display = "flex"
            panelChicoDetalle.style.display = "flex"
            elementoSeleccionado = row.cells[0].innerHTML
            document.querySelector("#total-texto").innerHTML = row.cells[3].innerHTML;
            refreshTableDetalles("./detalle-pedido-headers.json", `http://localhost:8080/pedido/get_detalles?id=${row.cells[0].innerHTML}`)
        })
    }
}

async function refreshTablePedidos(urlHeaders, urlBody) {
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();

    // Limpiar
    pedidosTableHead.innerHTML = "<tr></tr>";

    // Llenar
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        pedidosTableHead.querySelector("tr").appendChild(headerElement);
    }

    // Body
    pedidosTableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        cargarBodyPedidos(data);
    });
}

function cargarBodyDetalles(data) {
    for (let dataObject of data) {
        const rowElement = document.createElement("tr");
        let dataObjectArray = Object.entries(dataObject);
        for (let i = 0; i < dataObjectArray.length; i++) {
            if (i == 1 || i == 2) {
                if (dataObjectArray[i][1] == null) {
                    continue;
                } else {
                    const cellElement = document.createElement("td")
                    if (i == 1) {
                        cellElement.textContent = dataObjectArray[i][1].producto;
                    } else {
                        cellElement.textContent = dataObjectArray[i][1].servicio;
                    }
                    rowElement.appendChild(cellElement);
                    continue;
                }
            }
            if (i == 3) {
                const cellElement = document.createElement("td")
                cellElement.textContent = dataObjectArray[5][1];
                rowElement.appendChild(cellElement);
                continue;
            }
            if (i == 5) {
                const cellElement = document.createElement("td")
                cellElement.textContent = dataObjectArray[3][1];
                rowElement.appendChild(cellElement);
                continue;
            }
            const cellElement = document.createElement("td")
            cellElement.textContent = dataObjectArray[i][1];
            rowElement.appendChild(cellElement);
        }

        pedidoDetalleTableBody.appendChild(rowElement);
    }
    pedidoDetalleTable.rows[0].style.backgroundColor = "#123873";
    pedidoDetalleTable.rows[0].style.color = "white";
    for (let i = 1, row; row = pedidoDetalleTable.rows[i]; i++) {
        if (i % 2 == 0) {
            row.style.backgroundColor = "#EEEEEE";
        }
        row.addEventListener("click", () => {

        })
    }
}

async function refreshTableDetalles(urlHeaders, urlBody) {
    // Headers
    const headersResponse = await fetch(urlHeaders);
    const { headers } = await headersResponse.json();

    // Limpiar
    pedidoDetalleTableHead.innerHTML = "<tr></tr>";

    // Llenar
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        pedidoDetalleTableHead.querySelector("tr").appendChild(headerElement);
    }

    // Body
    pedidoDetalleTableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        console.log(data)
        cargarBodyDetalles(data);
    });
}


clienteExistenteBtn.addEventListener("click", () => {
    refreshTable("./headers.json", 'http://localhost:8080/cliente/lista')
    panelGrande.style.display = "flex";
    panelChico.style.display = "flex";
})

botonCerrar.addEventListener("click", () => {
    open("../Login/Login.html", "_self");
})

btnCerrar.addEventListener("click", () => {
    panelGrande.style.display = "none"
    panelChico.style.display = "none"
    window.location.reload()
})

refreshTable("./headers.json", "http://localhost:8080/pedido/lista")
refreshTablePedidos("./pedido_headers.json", "http://localhost:8080/pedido/lista")


document.querySelector("#btn-producto").addEventListener("click", () => {
    document.querySelector(".panel-grande-lista").style.display = "flex"
    document.querySelector(".panel-chico-productos").style.display = "flex"
    refreshTableProductos("./producto_headers.json", "http://localhost:8080/producto/lista")
    cantidadInput.value = 1
})

document.querySelector("#btn-servicio").addEventListener("click", () => {
    document.querySelector(".panel-grande-lista").style.display = "flex"
    document.querySelector(".panel-chico-servicios").style.display = "flex"
    refreshTableServicios("./servicio_headers.json", "http://localhost:8080/servicio/lista")
    cantidadInput.value = 1
})

document.querySelector("#btn-guardar-pedido").addEventListener("click", async () => {
    let responseData;
    let data;
    let listaDetalles = [];

    for (let i = 1, row; row = detalleTable.rows[i]; i++) {

        if (row.cells[0].innerHTML == "Producto") {
            data = {
                producto: {
                    id: row.cells[1].innerHTML
                },
                servicio: null,
                precioVenta: row.cells[5].innerHTML,
                cantidad: row.cells[4].innerHTML,
                precioUnidad: row.cells[3].innerHTML
            }
        } else {
            data = {
                producto: null,
                servicio: {
                    id: row.cells[1].innerHTML
                },
                precioVenta: row.cells[5].innerHTML,
                cantidad: 1,
                precioUnidad: row.cells[3].innerHTML
            }
        }

        await fetch("http://localhost:8080/pedido_detalle/new", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => responseData = data)

        let detalle = {
            id: responseData.id
        }
        listaDetalles.push(detalle)
    }

    data = {
        cliente: {
            id: clienteId
        },
        total: parseFloat(total.innerHTML),
        fecha: new Date().toJSON(),
        pedidoDetalles: listaDetalles
    }

    await fetch("http://localhost:8080/pedido/new", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => console.log(data))

    refreshTablePedidos("./pedido_headers.json", "http://localhost:8080/pedido/lista")

})

document.querySelector("#eliminar-pedido-btn").addEventListener("click", async () => {
    await fetch(`http://localhost:8080/pedido/borrarPedido/${elementoSeleccionado}`, {
        method: "DELETE"
    })
    window.location.reload()
})

document.querySelector("#cerrar-detalle-btn").addEventListener("click", () => {
    panelGrandeDetalle.style.display = "none"
    panelChicoDetalle.style.display = "none"
})
