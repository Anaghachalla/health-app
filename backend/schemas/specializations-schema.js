const mongoose = require('mongoose')

const specializationsSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required:true
    }
})


module.exports = mongoose.model('specializations_list', specializationsSchema, 'specializations_list')