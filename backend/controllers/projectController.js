//project model
const Project = require('../models/projectModel')

//import mongoose
const mongoose = require('mongoose')

//Get all projects 
const getProjects = async(req, res) => {
    const projects = await Project.find({}).sort({createdAt: -1})
    res.status(200).json(projects)
}

const createProject = async (req, res) => {
    const {title, prototype_url, description, image} = req.body

    try {
        const project = await Project.create({title, prototype_url, description, image})
        res.status(200).json(project)
    }
    catch (err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    getProjects,
    createProject
}

