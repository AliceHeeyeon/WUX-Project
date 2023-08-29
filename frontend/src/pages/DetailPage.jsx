import axios from 'axios'
import {useState, useEffect} from 'react'
import { useProjectsContext } from '../hooks/useProjectsContext'
import { useParams, useNavigate } from 'react-router-dom'

// react-icons
import {IoMdArrowRoundBack} from 'react-icons/io'

// custom alert(sweetalert)
import Swal from 'sweetalert2'

const DetailPage = () => {
  const {dispatch} = useProjectsContext()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const {id} = useParams()
  const navigate = useNavigate()

   // Editing State
   const [isEditing, setIsEditing] = useState(false)
   //state for our edit form:
   const [editTitle, setEditTitle] = useState(null)
   const [editImage, setEditImage] = useState(null)
   const [editPrototype_url, setEditPrototype_url] = useState(null)
   const [editDescription, setEditDescription] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:4000/api/projects/${id}`)
    .then((res) => {
      console.log(res.data);
      setProject(res.data[0])
      setEditTitle(res.data[0].title)
      setEditImage(res.data[0].image)
      setEditPrototype_url(res.data[0].prototype_url)
      setEditDescription(res.data[0].description)
      setLoading(false)
    }).catch((error) => {
      console.log(error);
    })
    
  },[id])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    if(project){
      setEditTitle(project.title)
      setEditImage(project.image)
      setEditPrototype_url(project.prototype_url)
      setEditDescription(project.description)
    }
    
    setIsEditing(false)
  }

  const handleSubmitEdit = async() => {
    const updateProject = {
      title: editTitle,
      image: editImage,
      prototype_url: editPrototype_url,
      description: editDescription
    }

    try {
      const response = await axios.patch(
        `http://localhost:4000/api/projects/${project._id}`,
        updateProject
      )
      
      if (response.status === 200) {
        const updatedData = response.data
        setProject(updatedData)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error updating project:',error);
    }
  }

  const deleteAlert = async () => {
    
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#cf3c0d',
      cancelButtonColor: '#aaa5a5',
      confirmButtonText: 'Yes, Delete it!'
    })
    
    if(result.isConfirmed) {
        Swal.fire(
        'Deleted!',
        'Your workout has been deleted',
        'success'
        ) 
        handleDelete()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('Delete cancelled');
      }
  }

  const handleDelete = async() => {
    const response = await axios.delete(`http://localhost:4000/api/projects/${project._id}`)
    const json = await response.data
    
    if(response.status === 200) {
      console.log(json, 'is deleted');
      dispatch({type: 'DELETE_PROJECT', payload: json})
    }
  }

  const goBack = () => {
    navigate('/')
  }

  const user = JSON.parse(localStorage.getItem('user'))
  const user_id = user ? user.username : null

  if(loading) {
    return <>loading...</>
  }
  return (
    <div className='project-page'>
    {isEditing ? (
      <div className='edit-detail'>

        <label>Edit Title</label>
        <input
          type='text'
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />

        <label>Edit Image</label>
        <input
          type='file'
          accept='image/*'
          onChange={(e) => setEditImage(e.target.files[0])}
        />

        <label>Link to Prototype</label>
        <input
          type='text'
          value={editPrototype_url}
          onChange={(e) => setEditPrototype_url(e.target.value)}
        />

        <label>Project Description</label>
        <input
          type='text'
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />

        <button className='save-edit' onClick={handleSubmitEdit}>Save</button>
        <button className='cancel-edit' onClick={handleCancelEdit}>Cancel</button>

      </div>
      ) : (
      <div className='detail-page'>
        <h3>{project.title}</h3>
        <p>Project Owner: {project.user_id}</p>
        {project.image && (
          <img
            src = {`http://localhost:4000/public/uploads/${project.image}`}
            alt = {project.title}
          />
        )}

        <p>{project.description}</p>
        <h5>Prototype</h5>
        <p>{project.prototype_url}</p>
        {user_id && project.user_id === user_id &&
        <>
          <p>
            <span className='edit' onClick={handleEdit} >
            Edit 
            </span>
            |
            <span className='delete' onClick={deleteAlert}> 
              Delete
            </span>
          </p>
        </>
        }
        <div className='goback-detailpage' onClick={goBack}>
          <IoMdArrowRoundBack/>
          <span>Go Back</span>
        </div>

      </div>
    )}
  </div>

  )
}

export default DetailPage
