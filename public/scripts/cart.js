const form = document.querySelector('#product') || undefined
const cartItems = document.querySelector('.navbar__cart-items')
const btnDelet = document.querySelectorAll('.cart-item__delet')
const btnShop = document.querySelector('#btnShop')
const lotInputs = document.querySelectorAll('.lot__inputs')

/* Funciones auxiliares */
async function getProductsTotalQuantity () {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const fetchRes = await fetch('/api/getProductsTotalQuantity',options)
        let resJson = await fetchRes.json()
        return resJson.productsTotalQuantity
    } catch (error) {
        return 0
    }
}

// ***************************************

const addItemToCart = async (product_id, product_quantity) => {
    const product = {product_id: product_id, product_quantity: product_quantity}
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    }
    const fetchRes = await fetch('/api/addProduct',fetchOptions)
    const resJson = await fetchRes.json()
    notify(fetchRes.status, {text: resJson.message})
}

const deletItemInCart = async (product_id) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({product_id: product_id})
    }
    const fetchRes = await fetch('/api/deletProduct', fetchOptions)
    if (fetchRes.ok){
        const resJson = await fetchRes.json()
        notify('delet', {text: resJson.message})
        setTimeout(() => {
            window.location.href = ('/cart') // Redirije al carrito para refrescar los datos
        }, 1500);
    } else {
        const resJson = await fetchRes.json()
        notify(fetchRes.status, {text: resJson.message})
    }
}

const setProductsTotalQuantity = async () => {
    const productsTotalQuantity = await getProductsTotalQuantity()
    if (productsTotalQuantity != 0) {
        cartItems.classList.remove("--hide")
        cartItems.innerHTML = productsTotalQuantity
    }
}

/* const purchase = async () => {
    const fetchRes = await fetch('/purchaswe')
    if (fetchRes.ok) {
        window.location.href = ('/purchase')
    } else {
        const resJson = await fetchRes.json()
        notify(fetchRes.status, {text: resJson.message})
    }
} */

/* Eventos */

// Muestra la cantidad de productos en carrito, en la barra de navegacion
window.onload = () => {
    setProductsTotalQuantity()
}
// Escucha cuando se realiza la compra

lotInputs.forEach( input => {
    input.addEventListener('click', (e) => {
        const id = e.target.parentNode.dataset.id
        if (e.target.classList.contains('lot__btn--substract')) {
            let input = e.target.nextElementSibling
            if (input.value > 1) input.value-- 
        }
        if (e.target.classList.contains('lot__btn--add')) {
            let input = e.target.previousElementSibling
            if (input.value < input.max) input.value++ 
        }
    })
})

// Escucha cuando se borra un elemento
btnDelet.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const product_id = Number(btn.dataset.id)
        deletItemInCart(product_id)
    })
});

// Escucha cuando se agrega un elemto
if (form != null) {form.addEventListener('submit', (e) => {
    e.preventDefault()
    let id = Number(e.target.dataset.id)
    let quantity = Number(e.target[1].value)
    addItemToCart(id, quantity)
    setProductsTotalQuantity()
})}

btnShop.addEventListener('click', (e) => {
    console.log('COMPRAR!');
})