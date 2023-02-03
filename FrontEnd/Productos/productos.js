const tableBody = document.querySelector("#tbody")
const tableHead = document.querySelector("#thead")
const nombre = document.querySelector("#nombre")
const precio = document.querySelector("#precio")
const stock = document.querySelector("#stock")
const fecha = document.querySelector("#fecha")
const guardarBtn = document.querySelector("#guardar")
const guardar = 'http://localhost:8080/producto/guardar_producto'
const lista = 'http://localhost:8080/producto/lista'
let resultados = ''
const contenedor = document.querySelector("#data")
const btnEditar = document.querySelector("#editar")
const btnEliminar = document.querySelector("#eliminar")

const idProdructo = document.querySelector("#id-producto")
const nombreProducto = document.querySelector("#nombre-producto");
const precioProducto = document.querySelector("#precio-producto");
const fechaProducto = document.querySelector("#fecha-producto");
const cantidadProducto = document.querySelector("#cantidad-producto");
const centerPanelContainer = document.querySelector("#centerpanel-container");
const centerPanelProducto = document.querySelector("#centerpanel-producto");
const guardarEdicionProducto = document.querySelector("#guardar-edicion-producto");
const cerrarEdicionProducto = document.querySelector("#cerrar-edicion-producto");
const nombreBuscado = document.querySelector("#nombre-busqueda")
const botonCerrar = document.querySelector("#boton-cerrar")




//registro de productos
async function registroProducto() {
    const data = {
        producto: nombre.value,
        precio: precio.value,
        fecha: fecha.value,
        stock: stock.value,
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

guardarBtn.addEventListener("click", registroProducto)


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
        for (let i = 0; i < dataObjectArray.length; i++) {

            if(i == 5) {
                let listaAMostrar = [];
                let listaImpuestos = dataObjectArray[i][1];
                for(let j of listaImpuestos) {
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
            centerPanelProducto.style.display = "flex";
            console.log(dataObjectArray[0][1])
            idProdructo.value = dataObjectArray[0][1];
            nombreProducto.value = dataObjectArray[1][1];
            precioProducto.value = dataObjectArray[2][1];
            fechaProducto.value = dataObjectArray[3][1];
            cantidadProducto.value = dataObjectArray[4][1];
        })

        borrar.addEventListener("click", () => {
            if (confirm("¿Desea eliminar?") == false) {
                return
            }
            let producto = dataObjectArray[0][1];
            console.log
            let linkBorrar = `http://localhost:8080/producto/borrar?id=${producto}`
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

    centerPanelProducto.style.display = "none";

    // Body
    tableBody.innerHTML = "";
    fetchDataFromDB(urlBody).then(data => {
        cargarBody(data);
    });
}

refreshTable("./headers.json", lista)

cerrarEdicionProducto.addEventListener("click", () => {
    centerPanelContainer.style.display = "none";
    centerPanelProducto.style.display = "none";
})

guardarEdicionProducto.addEventListener("click", async () => {
    let link = `http://localhost:8080/producto/actualizar?producto=${nombreProducto.value}&precio=${precioProducto.value}&fecha=${fechaProducto.value}&stock=${cantidadProducto.value}&id=${idProdructo.value}`
    await fetch(link, {
        method: "POST"
    })
    centerPanelContainer.style.display = "none";
    centerPanelProducto.style.display = "none";
    refreshTable("./headers.json", lista)
})

function search() {
    event.preventDefault();
    let listaBusqueda = `http://localhost:8080/producto/obtener_por_nombre?producto=${nombreBuscado.value}`
    refreshTable("./headers.json", listaBusqueda)
}

botonCerrar.addEventListener("click", () => {
    open("../Login/Login.html", "_self");
})