let sucursalesXML = [];

document.addEventListener("DOMContentLoaded", () => {

    fetch("sucursales.xml")
        .then(response => response.text())
        .then(data => {

            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "text/xml");

            sucursalesXML = Array.from(
                xml.getElementsByTagName("sucursal")
            );

            llenarEstados();

            mostrarSucursales(sucursalesXML);

        });

    document
        .getElementById("btnFiltrar")
        .addEventListener("click", filtrarSucursales);

});


function llenarEstados(){

    const estados = [...new Set(

        sucursalesXML.map(sucursal =>
            sucursal.getElementsByTagName("estado")[0].textContent)

    )];

    const select =
        document.getElementById("filtroEstado");

    estados.forEach(estado => {

        select.innerHTML += `
            <option value="${estado}">
                ${estado}
            </option>
        `;

    });

}


function filtrarSucursales(){

    const estado =
        document.getElementById("filtroEstado").value;

    const resultados = sucursalesXML.filter(sucursal => {

        const estadoSucursal =
            sucursal.getElementsByTagName("estado")[0].textContent;

        return estado === "" ||
               estadoSucursal === estado;

    });

    mostrarSucursales(resultados);

}


function mostrarSucursales(sucursales){

    const contenedor =
        document.getElementById("contenedor-sucursales");

    contenedor.innerHTML = "";

    if(sucursales.length === 0){

        contenedor.innerHTML = `
            <p class="sin-resultados">
                No se encontraron sucursales.
            </p>
        `;

        return;
    }

    sucursales.forEach(sucursal => {

        const nombre =
            sucursal.getElementsByTagName("nombre")[0].textContent;

        const estado =
            sucursal.getElementsByTagName("estado")[0].textContent;

        const direccion =
            sucursal.getElementsByTagName("direccion")[0].textContent;

        const telefono =
            sucursal.getElementsByTagName("telefono")[0].textContent;

        const horario =
            sucursal.getElementsByTagName("horario")[0].textContent;

        contenedor.innerHTML += `

        <div class="sucursal-card">

            <h3>${nombre}</h3>

            <p><strong>Estado:</strong> ${estado}</p>

            <p><strong>Dirección:</strong> ${direccion}</p>

            <p><strong>Teléfono:</strong> ${telefono}</p>

            <p><strong>Horario:</strong> ${horario}</p>

        </div>

        `;

    });

}