let laptopsXML = [];

document.addEventListener("DOMContentLoaded", () => {

    fetch("productos.xml")
        .then(response => response.text())
        .then(data => {

            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "text/xml");

            laptopsXML = Array.from(
                xml.getElementsByTagName("laptop")
            );

            llenarFiltros();

            mostrarResultados(laptopsXML);

        });

    document
        .getElementById("btnBuscar")
        .addEventListener("click", filtrarLaptops);

});


function llenarFiltros(){

    const marcas = [...new Set(
        laptopsXML.map(laptop =>
            laptop.getElementsByTagName("marca")[0].textContent)
    )];

    const ram = [...new Set(
        laptopsXML.map(laptop =>
            laptop.getElementsByTagName("ram")[0].textContent)
    )];

    const almacenamiento = [...new Set(
        laptopsXML.map(laptop =>
            laptop.getElementsByTagName("almacenamiento")[0].textContent)
    )];

    const selectMarca =
        document.getElementById("filtroMarca");

    marcas.forEach(marca => {

        selectMarca.innerHTML +=
        `<option value="${marca}">
            ${marca}
        </option>`;

    });

    const selectRam =
        document.getElementById("filtroRam");

    ram.forEach(valor => {

        selectRam.innerHTML +=
        `<option value="${valor}">
            ${valor}
        </option>`;

    });

    const selectAlmacenamiento =
        document.getElementById("filtroAlmacenamiento");

    almacenamiento.forEach(valor => {

        selectAlmacenamiento.innerHTML +=
        `<option value="${valor}">
            ${valor}
        </option>`;

    });

}


function filtrarLaptops(){

    const marca =
        document.getElementById("filtroMarca").value;

    const ram =
        document.getElementById("filtroRam").value;

    const almacenamiento =
        document.getElementById("filtroAlmacenamiento").value;

    const precioMax =
        document.getElementById("filtroPrecio").value;

    const resultados = laptopsXML.filter(laptop => {

        const marcaLaptop =
            laptop.getElementsByTagName("marca")[0].textContent;

        const ramLaptop =
            laptop.getElementsByTagName("ram")[0].textContent;

        const almacenamientoLaptop =
            laptop.getElementsByTagName("almacenamiento")[0].textContent;

        const precioLaptop =
            parseFloat(
                laptop.getElementsByTagName("precio")[0].textContent
            );

        return (
            (marca === "" || marcaLaptop === marca) &&
            (ram === "" || ramLaptop === ram) &&
            (almacenamiento === "" || almacenamientoLaptop === almacenamiento) &&
            (precioMax === "" || precioLaptop <= precioMax)
        );

    });

    mostrarResultados(resultados);

}

function mostrarResultados(laptops){

    const contenedor =
        document.getElementById("contenedor-resultados");

    contenedor.innerHTML = "";

    if(laptops.length === 0){

        contenedor.innerHTML =
        `<p class="sin-resultados">
            No se encontraron resultados.
        </p>`;

        return;
    }

    laptops.forEach(laptop => {

        const id =
            laptop.getElementsByTagName("id")[0].textContent;

        const nombre =
            laptop.getElementsByTagName("nombre")[0].textContent;

        const procesador =
            laptop.getElementsByTagName("procesador")[0].textContent;

        const ram =
            laptop.getElementsByTagName("ram")[0].textContent;

        const almacenamiento =
            laptop.getElementsByTagName("almacenamiento")[0].textContent;

        const precio =
            laptop.getElementsByTagName("precio")[0].textContent;

        contenedor.innerHTML += `

        <div class="product-card">

            <img src="imagenes/imagen-default.avif" alt="${nombre}">

            <h3>${nombre}</h3>

            <p>${procesador}</p>

            <p>${ram} | ${almacenamiento}</p>

            <p class="price">$${precio}</p>

            <button onclick="verDetalles(${id})">
                Ver detalles
            </button>

        </div>

        `;
    });

}


function verDetalles(id){

    window.location.href =
        `detalle.html?id=${id}`;

}