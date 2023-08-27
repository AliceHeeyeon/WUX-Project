import React, { useState } from 'react';
import axios from 'axios'
//imoprt our Custom Context Hook
import { useProjectsContext } from '../hooks/useProjectsContext'
//import of date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ProjectDetails = ({project}) => {
  // bring in dispatch method
  const {dispatch} = useProjectsContext()

  // Editing State
  const [isEditing, setIsEditing] = useState(false)
  //state for our edit form:
  const [editTitle, setEditTitle] = useState(project.title)
  const [editImage, setEditImage] = useState(project.image)


  // EDIT IMAGE
  //const handleImageChange = (event) => {
    //const file = event.target.files[0];
    //if (file) {
      //const reader = new FileReader();
     // reader.onload = () => {
        //setEditImage(reader.result);
      //};
     // reader.readAsDataURL(file);
    //}
  //};


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditTitle(project.title);
    setEditImage(project.image)
    setIsEditing(false);
  };

  const handleSubmitEdit = async () => {
    const updatedProject = {
      title: editTitle,
      image: editImage
    };

  // axios
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/projects/${project._id}`,
        updatedProject
      );
      const updatedData = response.data;
  
      if (response.status === 200) {
        console.log(response);
        console.log(updatedData);
        dispatch({ type: 'UPDATE_PROJECT', payload: updatedData });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDelete = async () => {
    const response = await axios.delete(`http://localhost:4000/api/projects/${project._id}`)
    
    const json = await response.data

    if(response.status === 200) {
      console.log(json);
      dispatch({type: 'DELETE_PROJECT', payload: json})
    }
  }

  return (
   
    <div className="project-details">
      {isEditing ? (
        // EDIT FORM
        <div className="edit-modal">

          <label>Edit Project Title:</label>
          <input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
          />

          <label>Edit Project Image:</label>
          <input
            //type="text"
            type="file"
            //onChange={handleImageChange}
            //value={editImage}
            accept="image/*"
            onChange={(event) => setEditImage(event.target.value)}
            //onChange={(event) => setEditImage(event.target.files[0])}
          /> 

          <button onClick={handleSubmitEdit} className="save">Save</button>
          <button onClick={handleCancelEdit} className="cancel">Cancel</button>
          
        </div>
      ) 
      :  // ELSE
      // BELOW IS THE ORIGINAL DETAILS:
      (
        <>
         {project.image && (
                        <img className="project-image" src={`http://localhost:4000/public/uploads/${project.image}`} alt="Project" />
                    )}
            <h4>{project.title}</h4>
            <p><strong>Created by: </strong>{project.user_id}</p>
            <p>{formatDistanceToNow( new Date(project.createdAt), {includeSeconds: true}, {addSuffix: true} )} ago</p>
            
            <span onClick={handleDelete} className="delete"><i className="fa-regular fa-trash-can"></i></span>
            <span onClick={handleEdit} className="edit"><i className="fa-regular fa-pen-to-square"></i></span>
        </>
      )} 
			{/* END OF THE IF */}
    </div>
    
  )
}

export default ProjectDetails
