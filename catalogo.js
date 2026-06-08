document.addEventListener("DOMContentLoaded", cargarCatalogo);

let laptopsData = [];

function cargarCatalogo() {

    fetch("productos.xml")
        .then(response => response.text())
        .then(data => {

            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "text/xml");

            const laptops = xml.getElementsByTagName("laptop");

            const contenedor = document.getElementById("contenedor-productos");

            contenedor.innerHTML = "";

            laptopsData = [];

            let html = "";

            for (let laptop of laptops) {

                const id = laptop.getElementsByTagName("id")[0].textContent;
                const nombre = laptop.getElementsByTagName("nombre")[0].textContent;
                const procesador = laptop.getElementsByTagName("procesador")[0].textContent;
                const ram = laptop.getElementsByTagName("ram")[0].textContent;
                const almacenamiento = laptop.getElementsByTagName("almacenamiento")[0].textContent;
                const precio = laptop.getElementsByTagName("precio")[0].textContent;

                const item = {
                    id,
                    nombre,
                    procesador,
                    ram,
                    almacenamiento,
                    precio
                };

                laptopsData.push(item);

                html += `
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
            }

            contenedor.innerHTML = html;

        })
        .catch(error => {
            console.error("Error al cargar el XML:", error);
        });
}

function verDetalles(id) {
    window.location.href = `detalle.html?id=${id}`;
}