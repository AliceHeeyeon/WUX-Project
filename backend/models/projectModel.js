const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Define all rules for project data
const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    prototype_url: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('Project', projectSchema)