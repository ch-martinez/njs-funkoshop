const dataTable = new simpleDatatables.DataTable("#adminTable", {
    locale: 'es-ES',
    searchable: true,
    fixedHeight: true,
    labels: {
        placeholder: "Buscar...",
        searchTitle: "Search within table",
        pageTitle: "Pagina {page}",
        perPage: "registros por pagina",
        noRows: "No entries found",
        info: "Mostrando {start} a {end} de {rows} registros",
        noResults: "No hay resultados para tu busqueda",
    },
    columns: [
        // Sort the second column in ascending order
        { select: 0, sort: "asc" },
    ],
    classes: {
        input: "datatable-input input",
        selector: "datatable-selector input input--select input--select-table",
        active: "datatable-active  pagination--table",
        paginationList: "datatable-pagination-list"
    }
})


