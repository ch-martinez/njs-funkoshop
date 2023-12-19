const {
    getAllProductsFromBD,
    getProductByIDFromBD
} = require('../models/productsModels')

const cart = [
    {
        product_id: 1,
        product_name: 'Producto 1 sdfsdf sdf sd sdf sdfsdfsd',
        product_price: '500.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 2
    },{
        product_id: 2,
        product_name: 'Producto 2',
        product_price: '499.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 1
    },{
        product_id: 3,
        product_name: 'Producto 3',
        product_price: '156.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 5
    },
    {
        product_id: 1,
        product_name: 'Producto 1 sdfsdf sdf sd sdf sdfsdfsd',
        product_price: '500.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 2
    },{
        product_id: 2,
        product_name: 'Producto 2',
        product_price: '499.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 1
    },{
        product_id: 3,
        product_name: 'Producto 3',
        product_price: '156.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 5
    },
    {
        product_id: 1,
        product_name: 'Producto 1 sdfsdf sdf sd sdf sdfsdfsd',
        product_price: '500.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 2
    },{
        product_id: 2,
        product_name: 'Producto 2',
        product_price: '499.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 1
    },{
        product_id: 3,
        product_name: 'Producto 3',
        product_price: '156.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 5
    },
    {
        product_id: 1,
        product_name: 'Producto 1 sdfsdf sdf sd sdf sdfsdfsd',
        product_price: '500.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 2
    },{
        product_id: 2,
        product_name: 'Producto 2',
        product_price: '499.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 1
    },{
        product_id: 3,
        product_name: 'Producto 3',
        product_price: '156.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 5
    },
    {
        product_id: 1,
        product_name: 'Producto 1 sdfsdf sdf sd sdf sdfsdfsd',
        product_price: '500.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 2
    },{
        product_id: 2,
        product_name: 'Producto 2',
        product_price: '499.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 1
    },{
        product_id: 3,
        product_name: 'Producto 3',
        product_price: '156.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 5
    },
    {
        product_id: 1,
        product_name: 'Producto 1 sdfsdf sdf sd sdf sdfsdfsd',
        product_price: '500.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 2
    },{
        product_id: 2,
        product_name: 'Producto 2',
        product_price: '499.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 1
    },{
        product_id: 3,
        product_name: 'Producto 3',
        product_price: '156.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 5
    },
    {
        product_id: 1,
        product_name: 'Producto 1 sdfsdf sdf sd sdf sdfsdfsd',
        product_price: '500.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 2
    },{
        product_id: 2,
        product_name: 'Producto 2',
        product_price: '499.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 1
    },{
        product_id: 3,
        product_name: 'Producto 3',
        product_price: '156.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 5
    },
    {
        product_id: 1,
        product_name: 'Producto 1 sdfsdf sdf sd sdf sdfsdfsd',
        product_price: '500.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 2
    },{
        product_id: 2,
        product_name: 'Producto 2',
        product_price: '499.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 1
    },{
        product_id: 3,
        product_name: 'Producto 3',
        product_price: '156.00',
        img_front: '/img/funkos/harry-potter/harry-1.webp',
        collection_name: 'COLLECTION',
        lot: 5
    }
]

const shopView = async (req, res) => {
    const page = {
        title: 'Funkos - FS'
    }
    const products = await getAllProductsFromBD()
    res.render('pages/shop/shop', {page, products})
}

const productView = async (req, res) => {
    const products = await getAllProductsFromBD()
    const [product] = await getProductByIDFromBD(req.params.id)
    console.log(product)
    const page = {
        title: `${product.product_name} - FS`,
        glide: true
    }
    res.render('pages/shop/product', {page, product, products})
}

const cartView = async (req, res) => {
    const page = {
        title: 'Carrito de compras - FS'
    }
    res.render('pages/shop/cart', {page, cart})
}

module.exports = {
    shopView,
    productView,
    cartView
}