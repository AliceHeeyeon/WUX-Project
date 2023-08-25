const express = require('express')
const multer = require("multer");
const path = require('path')

// configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // store uploads in this directory
  },
  // unique filename for each file
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cb(null, uniqueSuffix + ext)
  }
})

const upload = multer({storage})

const router = express.Router()

// import controller functions:
const {
    getProjects,
    getProject,
    createProject,
    deleteProject,
    updateProject
} = require('../controllers/projectController')

// GET all projects
router.get('/', getProjects)

// GET a single project
router.get('/:id', getProject)

// POST a single project
router.post('/', upload.single('image'), createProject)

// DELETE a single project
router.delete('/:id', deleteProject)

// PATCH a single project
router.patch('/:id', updateProject)

module.exports = router