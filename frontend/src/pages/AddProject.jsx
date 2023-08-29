import axios from 'axios'
import {useState} from 'react'
// import { useProjectsContext } from '../hooks/useProjectsContext'
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  // Bring in dispatch
  // const {dispatch} = useProjectsContext()
  const navigate = useNavigate()

  //form inputs state variables
  const [title, setTitle] = useState('')
  const [prototype_url, setPrototype_url] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)

  //submit
  const handleSubmit = async(e) => {
    e.preventDefault()

    const user_id = JSON.parse(localStorage.getItem('user'))
    const user = user_id.username
    console.log(user);
    const formData = new FormData()
    formData.append('title', title)
    formData.append('prototype_url', prototype_url)
    formData.append('description', description)
    formData.append('user_id', user_id.username)
    formData.append('image', image)

    try {
      const response = await axios.post('http://localhost:4000/api/projects', formData, 
      {
          headers: {
            'Content-Type' : 'multipart/form-data'
          }
      })
      setTitle('')
      setPrototype_url('')
      setDescription('')
      setImage(null)
      setError(null)
      // dispatch({type:'CREATE_PROJECTS', payload: response.data})

      if(response.status === 200) {
        console.log('New Project added', response.data)
        navigate('/')
      }

    } catch(error) {
      console.log(error.response);
      setError(error.message)
      
    }
  } 

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>Add a project</h3>

      <div>
        <label>Project Title</label>
        <input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>

      <div>
        <label>Link to Prototype</label>
        <input
          type='text'
          onChange={(e) => setPrototype_url(e.target.value)}
          value={prototype_url}
        />
      </div>

      <div>
        <label>Project Description</label>
        <input
          type='text'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className='file-upload'>
        <label>Project Mockup Image</label>
        <input
          type='file'
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <button className='add-btn'>Add Project</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default AddProject
