import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ProjectDetails = ({project}) => {
  return (
    <div className="project-details">
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
