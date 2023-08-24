import { ProjectsContext } from "../context/ProjectContext";
import { useContext } from "react";

export const useProjectsContext = () => {
    const context = useContext(ProjectsContext) // provides both state and dispatch

    if (!context) {
        throw Error('useProjectsContext hook must be used inside ProjectsContextProvider')
    } // There is only context when this is invoked inside ProjectsContextProvider

    return context
}