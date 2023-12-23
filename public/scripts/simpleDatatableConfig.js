const dataTable = new simpleDatatables.DataTable("#adminTable", {
    locale: 'es-ES',
    searchable: true,
    fixedHeight: true,
    labels: {
        placeholder: "Buscar...",
        searchTitle: "Search within table",
        pageTitle: "Pagina {page}",
        perPage: "productos por pagina",
        noRows: "No entries found",
        info: "Mostrando {start} a {end} de {rows} productos",
        noResults: "No hay resultados para tu busqueda",
    },
    columns: [
        // Sort the second column in ascending order
        { select: 0, sort: "asc" },
        // Disable sorting on the fourth and fifth columns
        { select: [6, 7], sortable: false },
    ],
    classes: {
        input: "datatable-input input--text",
        selector: "datatable-selector input--select input--select-table",
    }
})


