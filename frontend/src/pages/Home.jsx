import {useEffect} from 'react'
import axios from 'axios'
import { useProjectsContext } from '../hooks/useProjectsContext';


// Import components
import ProjectDetails from "../components/ProjectDetails";

const Home = () => {
  //const [projects, setProjects] = useState(null)
  const {projects, dispatch} = useProjectsContext()

  useEffect(() => {
       
    const fetchProjects = async () => {
      // axios call
      const response = await axios.get('http://localhost:4000/api/projects')

      if (response.status === 200) {
        //setProjects(response.data)
        dispatch({type: 'SET_PROJECTS', payload: response.data})
      }
    }
    fetchProjects()

  }, [])


  return (
    <div className="home">
        <div className="projects">
           
            {projects && projects.map((project) => {
                return (
                    
                  <ProjectDetails key={project._id} project={project}/>
                )
            })}
        </div>
    </div>
  )
}

export default Home
