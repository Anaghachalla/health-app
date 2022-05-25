const express = require('express')
const axios = require('axios').default

fdaKey = //enter your key

const Cart = require('../schemas/cart-schema')
const Order = require('../schemas/order-schema')

const router = express.Router()


router.post('/order/new', async(req, res)=>{
    var order_details = req.body
    try
    {
        var new_order = Order.create(order_details)
        res.send({status: 'success', data: new_order})
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }
})

router.get('/order/:username', async(req, res)=>{
    try
    {
        var orders = await Order.find({username: req.params.username})
        if(orders.length>0)
        {
            res.send({status: 'success', data: orders})
        }
        else
        {
            res.send({status: 'success', data: ''})
        }
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }
})



router.get('/cart/:uname', async(req, res)=>{
    username = req.params.uname
    try
    {
        var cart = await Cart.findOne({username: username})
        if(cart)
        {
            res.send({status: 'success', data: {...cart}})
        }
        else
        {
            res.send({status: 'success', data:''})
        }
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }
})

router.delete('/cart/:uname', async(req, res)=>{
    username = req.params.uname
    try
    {
        var del_cart = await Cart.deleteOne({username: username})
        res.send({status: 'success'})
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }
})

//update cart details
router.post('/cart/:uname', async(req, res)=>{
    username = req.params.uname
    items = req.body
    try
    {
        var cart = await Cart.findOne({username: username})
        if(cart)
        {
            cart.items = items
            cart.save()
        }
        else
        {
            cart = await Cart.create({
                username: username,
                items: items
            })
        }

        res.send({status: 'success', data: cart})
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }
})

router.get('/details/:unii', async(req, res)=>{
    var unii = req.params.unii
    axios.get(`https://api.fda.gov/drug/label.json?api_key=${fdaKey}&search=openfda.unii:${unii}&limit=1`)
    .then(response=>{
        res.send(response.data.results)
    })
    .catch(err=>{
        console.log(err.message);
    })
})

//search for med
router.get('/:name', async(req, res)=>{
    var search_string = req.params.name
    search_string.toLowerCase()
    if(search_string.includes(' '))
    {
        search_string = search_string.split(' ')
        search_string.forEach(ele => {
            ele = `"${ele}"`
        });
        search_string.join('+')
    }
    else
    {
        search_string = `"${search_string}"`
    }
    axios.get(`https://api.fda.gov/drug/label.json?api_key=${fdaKey}&search=${search_string}&limit=10`)
    .then(response=>{
        res.send(response.data.results)
    })
    .catch(err=>{
        console.log(err.message);
    })
})




module.exports = router
