import {useEffect, useState} from 'react'
import axios from 'axios'
import { useProjectsContext } from '../hooks/useProjectsContext';
import { Link } from 'react-router-dom';

// Import components
import ProjectDetails from "../components/ProjectDetails";

// Import pages
import DetailPage from './DetailPage'

const Home = () => {
  //const [projects, setProjects] = useState(null)
  const {projects, dispatch} = useProjectsContext()

  const [selectedUser, setSelectedUser] = useState(null);
  const [userUsernames, setUserUsernames] = useState([]);

  // useState definitions for input:
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
       
    const fetchProjects = async () => {
      try {
      // axios call
      const response = await axios.get('http://localhost:4000/api/projects')

      if (response.status === 200) {
        //setProjects(response.data)
        dispatch({type: 'SET_PROJECTS', payload: response.data})
        console.log(response.data);

        const uniqueUserUsernames = [...new Set(response.data.map(project => project.user_id))];
        setUserUsernames(uniqueUserUsernames);
      }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchProjects()

  }, [dispatch])

  const handleUserClick = (userUsername) => {
    setSelectedUser(userUsername);
  }

  const handleShowAllProjects = () => {
    setSelectedUser(null);
  };
  
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="home">

        <Link to="/addproject">
        <button>Add new</button>
        </Link>
      
        <div className="search-bar">
        <input
          type="text"
          placeholder="Search by username or project title"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
       <div className="user-usernames">
         <div
          className={`user-name ${selectedUser === null ? 'selected' : ''}`}
          onClick={handleShowAllProjects}
        >
          All Projects
        </div> 
        
        

        {userUsernames.map(userUsername => (
          <div
            key={userUsername}
            className={`user-name ${selectedUser === userUsername ? 'selected' : ''}`}
            onClick={() => handleUserClick(userUsername)}
          >
            {userUsername}
          </div>
        ))}
      </div>

      <div className="projects">
      
        {projects && projects.map((project) => {
          if (
          (!selectedUser || project.user_id === selectedUser) &&
          (project.user_id.includes(searchTerm) ||
                project.title.includes(searchTerm))
          ) {
              return (
                <Link to={`/${project._id}`} key={project._id}>
                  <ProjectDetails project={project}/>
                </Link>  
              ) 
              }
                return null;
            })}
        </div>
    </div>
  )
}

export default Home
