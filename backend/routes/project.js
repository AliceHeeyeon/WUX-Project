const express = require('express')

const router = express.Router()

// import controller functions:
const {
    getProjects,
    createProject
} = require('../controllers/projectController')

router.get('/', getProjects)

router.post('/', createProject)

module.exports = router