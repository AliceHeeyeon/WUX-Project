import {useEffect} from 'react'
import axios from 'axios'
import { useProjectsContext } from '../hooks/useProjectsContext';
import { Link } from 'react-router-dom';


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
        console.log(response.data);
      }
    }
    fetchProjects()

  }, [])

  
  return (
    <div className="home">
      
        <div className="projects">

        <Link to="/addproject">
        <button>Add new</button>
        </Link>
      
        {projects && projects.map((project) => {
              return (
                    
                  <ProjectDetails key={project._id} project={project}/>
                )
            })
          }
        </div>
    </div>
  )
}

export default Home
