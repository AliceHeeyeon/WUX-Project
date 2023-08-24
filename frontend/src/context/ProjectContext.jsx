import { createContext, useReducer } from "react";

export const ProjectsContext = createContext()

export const projectsReducer = (state, action) => {
    //switch statement
    switch (action.type) {
         // defining cases
        //if action.type is equal to
        case 'SET_PROJECTS':
            return {
                projects: action.payload // updates all the projects to the newly fetched projects
            }
        case 'CREATE_PROJECTS':
            return {
                // creates an array with the new project at the front and previous projects
                projects: [action.payload, ...state.projects] 
            }
            case 'DELETE_PROJECT':
            return {
                projects: state.projects.filter((project) => project._id !== action.payload._id)
								// filters over the existing state projects and makes sure that their _id does not
								// match our deleted projects _id
								// We only want to keep what doesnt match
            }

            case 'UPDATE_PROJECT': {
                const updatedProject = action.payload;
                const updatedProjects = state.projects.map(project => {
                  if (project._id === updatedProject._id) {
										// swap the project for the updated on if id's matach
                    return updatedProject;
                  }
								
								// Return the project for every project in the projects
								// array
                  return project;
                });
          
								// last return returns the map of updatedProjects
                return {
                  workouts: updatedProjects,
                };
              }
        default:
            return state // return state unchanged
    }
}

export const ProjectsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(projectsReducer, {
        projects: null
    })
    return (
        <ProjectsContext.Provider value={{...state,dispatch}}>
            {children}
        </ProjectsContext.Provider>
    )
}