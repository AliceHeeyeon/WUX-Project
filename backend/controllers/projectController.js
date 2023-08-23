//project model
const Project = require('../models/projectModel')

//import mongoose
const mongoose = require('mongoose')

//Get all projects 
const getProjects = async(req, res) => {
    const projects = await Project.find({}).sort({createdAt: -1})
    res.status(200).json(projects)
}

// Get single project by id
const getProject = async(req, res) => {
    const {id} = req.params

    // is the given id valid?
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such Project: Id Invalid"})
    }

    // find the project using the valid id
    const project = await Project.find({_id: id})

    // does the given id have an attached project
    if (!project) {
        return res.status(404).json({error: "No such Project: Project does not exist"})
    }
    res.status(200).json(project)
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

const deleteProject = async (req, res) => {
    const {id} = req.params

    // is the given id valid?
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such Project: Id Invalid"})
    }

    // find the project using the valid id
    const project = await Project.findOneAndDelete({_id: id})

    // does the given id have an attached project
    if (!project) {
        return res.status(404).json({error: "No such Project: Project does not exist"})
    }
    res.status(200).json(project)
}

module.exports = {
    getProjects,
    getProject,
    createProject,
    deleteProject
}

