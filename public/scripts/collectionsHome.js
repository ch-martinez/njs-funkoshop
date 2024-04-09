/* Sortable config */
let ul = document.querySelector('.ch__ul')
new Sortable(ul, {
    animation: 150
});

/* Page config */
const fetchData = async (collections_home) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(collections_home)
    }
    const fetchRes = await fetch('/admin/collections/home',fetchOptions)
    const resJson = await fetchRes.json()
    notify(fetchRes.status, {text: resJson.message})
}

const submit = document.querySelector('.form-ch')

document.addEventListener('submit', (e) => {
    e.preventDefault()
    let listCh = document.querySelectorAll(".ch__li")
    let listChToSend = []
    listCh.forEach((li, i) => {
        const data = {
            collection_id: li.dataset.id,
            ch_order: i,
            ch_active: li.children[3].children[0].children[0].checked
        }
        listChToSend.push(data)
    })
    fetchData(listChToSend)
})