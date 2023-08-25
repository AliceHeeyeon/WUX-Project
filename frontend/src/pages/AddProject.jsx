import axios from 'axios'
import {useState} from 'react'
import { useProjectsContext } from '../hooks/useProjectsContext'

const AddProject = () => {
  // Bring in dispatch
  // const {dispatch} = useProjectsContext()

  //form inputs state variables
  const [title, setTitle] = useState('')
  const [prototype_url, setPrototype_url] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)

  //submit
  const handleSubmit = async(e) => {
    e.preventDefault()

    // const user = JSON.parse(localStorage.getItem('user'))
    const user_id = 'test.com'
    const formData = new FormData()
    formData.append('title', title)
    formData.append('prototype_url', prototype_url)
    formData.append('description', description)
    formData.append('user_id', user_id)
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
      console.log('New Project added', response.data)
      // dispatch({type:'CREATE_PROJECTS', payload: response.data})
    } catch(error) {
      console.log(error.response);
      setError(error.message)
      
    }
  } 

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h3>Add a project</h3>
      <label>Project Title</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Link to Prototype</label>
      <input
        type='text'
        onChange={(e) => setPrototype_url(e.target.value)}
        value={prototype_url}
      />

      <label>Project Description</label>
      <input
        type='text'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <label>Project Mockup Image</label>
      <input
        type='file'
        accept='image/*'
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button>Add Project</button>
      {error && <div className='error'>{error}</div>}

    </form>
  )
}

export default AddProject
