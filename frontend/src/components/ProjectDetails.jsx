import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useNavigate } from 'react-router-dom';



const ProjectDetails = ({project}) => {
  const navigate = useNavigate()

  const routeChange = () => {
    let path = `/${project._id}`
    navigate(path)
  }

  return (
    <div className="project-card" onClick={routeChange}>
        <>
          {project.image && (
            <img className="project-img" 
            src={`http://localhost:4000/public/uploads/${project.image}`} 
            alt="Project" 
            />
          )}
          
          <div>
            <h4 className='project-title'>{project.title}</h4>
            <p className='project-author'>Created by: <span>{project.user_id}</span></p>
            <p className='project-time'>{formatDistanceToNow(new Date(project.createdAt), 
            {includeSeconds: true}, {addSuffix: true} )} ago</p>
          </div>
        </>
    </div>
  )
}

export default ProjectDetails
