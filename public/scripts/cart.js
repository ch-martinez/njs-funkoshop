const form = document.querySelector('#product')
const cartNavbar = document.querySelector('#cartNavbar')
const btnDelet = document.querySelectorAll('.cart-item__delet')
const lotInputs = document.querySelectorAll('.lot__inputs')
const cartResumeSubtotal = document.querySelector('#resumeSubtotal')
const cartResumeTotal = document.querySelector('#resumeTotal')

/* Funciones auxiliares */

// Inicializa el carrito si no tiene productos
const initializeCart = () => {
    if (!localStorage.cart){
        let cart = {
            list: [],
            resume: {
                subtotal: 0,
                ship: 0,
                coupon: 0,
                total: 0
            },
            items: 0
        }
        localStorage.setItem('cart',JSON.stringify(cart))
    }
}

const setQuantityItemsCart = (list) => {
    return list.reduce((acum, item) => acum + item.product_quantity, 0)
}

const setSubtotalCart = (list) => {
    return list.reduce((acum, item) => acum + (item.product_quantity * item.product_price), 0)
}

const setCart = async (cart) => {
    let cartDB = cart
        cartDB.resume.subtotal = setSubtotalCart(cart.list),
        cartDB.resume.total = setSubtotalCart(cart.list)
        cartDB.items = setQuantityItemsCart(cart.list)

    console.log(cartDB)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cartDB.resume)
    }

    const res = await fetch('/api/updateCart',options)
    if(res.ok){
        cart = cartDB
    } else {
        throw new Error('Se produjo un error al actualizar el carrito en DB')
    }
}

// Devuelve la posicion del producto en el carrito. Si el producto no existe devuelve -1
const isItemInCart = (cart, id) => {
    return cart.list.map(product => product.product_id).indexOf(id)
}

/* Principales */
const addItemToCart = async (id,quantity,price) => {
    initializeCart()

    let cart = JSON.parse(localStorage.cart)
    const product_index = isItemInCart(cart,id)
    const product = {product_id: id, product_quantity: quantity, product_price: price}
    // Optiones para fetch
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    }

    if (product_index === -1) { //Si se carga un producto nuevo
        const res = await fetch('/api/addProduct',options)

        if (res.ok){
            cart.list.push(product)
            setCart(cart)
            localStorage.setItem('cart',JSON.stringify(cart))
        } else {
            throw new Error('Se produjo un error al añadir producto en DB')
        }
    } else { //Si se actualiza un producto
        product.product_quantity = cart.list[product_index].product_quantity + quantity //Actualiza el total de productos
        options.body = JSON.stringify(product) //Actualiza el body de la peticion fetch

        const res = await fetch('/api/updateProduct',options)
        if (res.ok){
            cart.list[product_index].product_quantity = product.product_quantity
            setCart(cart)
            localStorage.setItem('cart',JSON.stringify(cart))
        } else {
            throw new Error('Se produjo un error al actualizar producto en DB')
        }
    }
}

const deletItemInCart = async (product_id) => {
    let cart = JSON.parse(localStorage.cart)
    const product_index = isItemInCart(cart,product_id)

    // Optiones para fetch
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({product_id: product_id})
    }

    const res = await fetch('/api/deletProduct', options)
    if (res.ok){
        cart.list.splice(product_index,1)
        setCart(cart)
        localStorage.setItem('cart',JSON.stringify(cart))

        window.location.href = ('/cart') // Redirije al carrito para refrescar los datos
    } else {
        throw new Error('Se produjo un error al eliminar producto en DB')
    }
}


/* Eventos */
lotInputs.forEach( input => {
    input.addEventListener('click', (e) => {
        const id = e.target.parentNode.dataset.id
        if (e.target.classList.contains('lot__btn--substract')) {
            let input = e.target.nextElementSibling
            if (input.value > 1) input.value-- 
            console.log(id)
        }
        if (e.target.classList.contains('lot__btn--add')) {
            let input = e.target.previousElementSibling
            if (input.value < input.max) input.value++ 
            console.log(id)
        }
    })
})
cartNavbar.addEventListener('click', () => {
    console.log('ingreso')
})

btnDelet.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const product_id = btn.dataset.id
        deletItemInCart(product_id)
    })
});

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let id = Number(e.target.dataset.id)
    let quantity = Number(e.target[1].value)
    let price = Number(e.target.dataset.price)
    addItemToCart(id, quantity, price)
})

