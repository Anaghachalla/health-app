const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    items: {
        type: [Object],
        required: true,
    }

})

module.exports = mongoose.model('cart', cartSchema, 'cart')