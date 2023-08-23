import React from 'react'

const Home = () => {
  const [projects, setProjects] = useState(null)

  useEffect(() => {
       
    const fetchProjects = async () => {
      const response = await axios.get('http://localhost:4000/api/projects')
    }

    if (response.status === 200) {
      setProjects(response.data)
  }

    fetchProjects()

  }, [])


  return (
    <div className="home">
        <div className="projects">
           
            {projects && projects.map((project) => {
                return (
                    <>
                        <p key={project._id}>{project.title}</p>
                    </>
                )
            })}
        </div>
    </div>
  )
}

export default Home
