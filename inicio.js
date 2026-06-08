document.addEventListener("DOMContentLoaded", cargarDestacadas);

function cargarDestacadas() {

    fetch("productos.xml")
        .then(response => response.text())
        .then(data => {

            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "text/xml");

            const laptops = xml.getElementsByTagName("laptop");

            const contenedor = document.querySelector(".products-container");

            contenedor.innerHTML = "";

            let count = 0;

            for (let laptop of laptops) {

                if (count >= 3) break; // solo 3 destacadas

                const id = laptop.getElementsByTagName("id")[0].textContent;
                const nombre = laptop.getElementsByTagName("nombre")[0].textContent;
                const precio = laptop.getElementsByTagName("precio")[0].textContent;

                contenedor.innerHTML += `
                    <div class="product-card">

                        <img src="imagenes/imagen-default.avif" alt="${nombre}">

                        <h3>${nombre}</h3>

                        <p class="price">$${precio}</p>

                        <button onclick="verDetalles('${id}')">
                            Ver detalles
                        </button>

                    </div>
                `;

                count++;
            }

        })
        .catch(error => {
            console.error("Error cargando destacadas:", error);
        });
}

function verDetalles(id) {
    window.location.href = `detalle.html?id=${id}`;
}