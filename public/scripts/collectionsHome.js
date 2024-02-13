const form = document.querySelector('.form-admin')
const tableBody = document.querySelector('.table-admin__body')

const collectionsHomeList = (list) => {
    const allRows = tableBody.querySelectorAll('tr')
    allRows.forEach( row => {
        let data = {
            collection_id: Number(row.dataset.id),
            ch_order: Number(row.querySelector('#ch_order').innerHTML),
            ch_active: row.querySelector('#ch_active > input').checked ? 1 : 0
        }
        list.push(data)
    })
    return list
}

const updateCollectionsHomeList = async (collectionsHomeList) => {
    const options = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(collectionsHomeList),
    }
    try {
        const res = await fetch('/admin/collections/home',options)
            if (!res.ok){
                throw new Error('Se produjo un error')
            }
    } catch (error) {
        console.log(error)
    }
}

form.addEventListener('submit', (e) => {
    let collectionsHome = []
    collectionsHome = collectionsHomeList(collectionsHome)
    updateCollectionsHomeList(collectionsHome)
})
