import { createContext, useReducer } from "react";

export const ProjectsContext = createContext()

export const projectsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return {
                projects: action.payload // updates all the projets
            }
        case 'CREATE_PROJECTS':
            return {
                // creates an array with the new project at the front and prevous project
                projects: [action.payload, ...state.projects] 
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
        <ProjectsContext.Provider>
            {children}
        </ProjectsContext.Provider>
    )
}