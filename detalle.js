document.addEventListener("DOMContentLoaded", cargarDetalle);

function cargarDetalle() {

    const parametros = new URLSearchParams(window.location.search);
    const idBuscado = parametros.get("id");

    fetch("productos.xml")
        .then(response => response.text())
        .then(data => {

            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "text/xml");

            const laptops = xml.getElementsByTagName("laptop");

            const contenedor = document.getElementById("detalle-laptop");

            for (let laptop of laptops) {

                const id = laptop.getElementsByTagName("id")[0].textContent;

                if (id === idBuscado) {

                    const nombre = laptop.getElementsByTagName("nombre")[0].textContent;
                    const marca = laptop.getElementsByTagName("marca")[0].textContent;
                    const procesador = laptop.getElementsByTagName("procesador")[0].textContent;
                    const ram = laptop.getElementsByTagName("ram")[0].textContent;
                    const almacenamiento = laptop.getElementsByTagName("almacenamiento")[0].textContent;
                    const pantalla = laptop.getElementsByTagName("pantalla")[0].textContent;
                    const precio = laptop.getElementsByTagName("precio")[0].textContent;
                    const stock = laptop.getElementsByTagName("stock")[0].textContent;

                    contenedor.innerHTML = `
<div class="detalle-card">

    <img src="imagenes/imagen-default.avif" alt="${nombre}">

    <div class="detalle-info">

        <h1>${nombre}</h1>

        <p><strong>Marca:</strong> ${marca}</p>

        <p><strong>Procesador:</strong> ${procesador}</p>

        <p><strong>RAM:</strong> ${ram}</p>

        <p><strong>Almacenamiento:</strong> ${almacenamiento}</p>

        <p><strong>Pantalla:</strong> ${pantalla}</p>

        <p><strong>Stock:</strong> ${stock}</p>

        <div class="detalle-precio">
            $${precio}
        </div>

        <a href="catalogo.html" class="btn-volver">
            Volver al catálogo
        </a>

    </div>

</div>
`;
                }
            }

        });

}