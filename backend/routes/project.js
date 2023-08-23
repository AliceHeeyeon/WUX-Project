const express = require('express')

const router = express.Router()

// import controller functions:
const {
    getProjects,
    getProject,
    createProject,
    deleteProject
} = require('../controllers/projectController')

// GET all projects
router.get('/', getProjects)

// GET a single project
router.get('/:id', getProject)

// POST a single project
router.post('/', createProject)

// DELETE a single project
router.delete('/:id', deleteProject)

module.exports = router