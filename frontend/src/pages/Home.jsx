import {useEffect, useState} from 'react'
import axios from 'axios'
import { useProjectsContext } from '../hooks/useProjectsContext';
import { Link } from 'react-router-dom';

// Import components
import ProjectDetails from "../components/ProjectDetails";

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

      <div className='settings-filters'>

        <Link to="/addproject" className='add-new-btn'>
          <button>
            <i className="bi bi-pencil-fill"></i>
            Add new
          </button>
        </Link>
        
        <form id="search-bar">
          <input
            type="text"
            placeholder="Search by keyword"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <button id='search-bar-btn'>Search</button>
        </form>
        <div className="user-usernames">
          <p className='filter-title'>Filter by Author:</p>

          <ul>
            <li
              className={`user-name ${selectedUser === null ? 'selected' : ''}`}
              onClick={handleShowAllProjects}
            >
              All Projects
            </li> 
          
            {userUsernames.map(userUsername => (
              <li
                key={userUsername}
                className={`user-name ${selectedUser === userUsername ? 'selected' : ''}`}
                onClick={() => handleUserClick(userUsername)}
              >
                {userUsername}
              </li>
            ))}
          </ul>
        </div>
      
      </div>

      <div className="projects">
      
        {projects && projects.map((project) => {
          if (
          (!selectedUser || project.user_id === selectedUser) &&
          (project.user_id.includes(searchTerm) ||
                project.title.includes(searchTerm))
          ) {
              return <ProjectDetails key={project._id} project={project}/>
                }
                return null;
            })}
        </div>
    </div>
  )
}

export default Home
