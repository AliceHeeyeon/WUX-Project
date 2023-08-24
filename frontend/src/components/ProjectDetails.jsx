import React from 'react'

const ProjectDetails = ({project}) => {
  return (
    <div>
          {project.image && (
            <img 
              src={`http://localhost:4000/public/uploads/${project.image}`}
              alt={project.title}
            />
          )}
            <h4>{project.title}</h4>
            <p>{project.createdAt}</p>
    </div>
  )
}

export default ProjectDetails
