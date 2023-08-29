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
    <div className="project-details" onClick={routeChange}>
        <>
         {project.image && (
                      <img className="project-image" 
                      src={`http://localhost:4000/public/uploads/${project.image}`} 
                      alt="Project" 
                      />
                    )}
            <h4>{project.title}</h4>
            <p><strong>Created by: </strong>{project.user_id}</p>
            <p>{formatDistanceToNow(new Date(project.createdAt), 
            {includeSeconds: true}, {addSuffix: true} )} ago</p>

        </>
    </div>
  )
}

export default ProjectDetails
