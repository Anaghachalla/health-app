const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
    },
    items: {
        type: [Object],
        required: true,
    },
    order_total:{
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('orders', orderSchema, 'orders')