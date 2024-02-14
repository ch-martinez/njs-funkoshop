const form = document.querySelector('#product')

/* Funciones auxiliares */
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

const setResumeCart = (cart) => {
}

const isItemInCart = (cart, id) => {
    return cart.list.map(product => product.product_id).indexOf(id)
}

/* Principales */
const addItemToCart = (id,quantity) => {
    initializeCart()
    let cart = JSON.parse(localStorage.cart)
    const product_index = isItemInCart(cart,id)

    if (product_index === -1) {
        const product = {product_id: id, product_quantity: quantity}
        cart.list.push(product)
    } else {
        cart.list[product_index].product_quantity += quantity
    }

    cart.items = setQuantityItemsCart(cart.list)
    localStorage.setItem('cart',JSON.stringify(cart))
}

/* BD */
const sendCartToBD = async () => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(localStorage.cart),
        credentials: omit,
    };
    try {
        const res = await fetch('/api/cart',options)
            if (!res.ok){
                throw new Error('Se produjo un error')
            }
    } catch (error) {
        console.log(error)
    }
}

/* Eventos */
form.onsubmit = (e) => {
    e.preventDefault()
    let id = Number(e.target.dataset.id)
    let quantity = Number(e.target[1].value)
    addItemToCart(id, quantity)
}