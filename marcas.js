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

        });

});

function filtrarMarca(marcaSeleccionada) {

    const resultados = laptopsXML.filter(laptop => {

        const marca = laptop
            .getElementsByTagName("marca")[0]
            .textContent;

        return marca === marcaSeleccionada;

    });

    mostrarResultados(resultados);

}

function mostrarResultados(laptops) {

    const contenedor =
        document.getElementById("contenedor-marcas");

    contenedor.innerHTML = "";

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

function verDetalles(id) {

    window.location.href =
        `detalle.html?id=${id}`;

}

