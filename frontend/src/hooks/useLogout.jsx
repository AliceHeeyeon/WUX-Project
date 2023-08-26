import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext()

    const logout = () => {
        //remove user in localstorage
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        alert('Logged out🚪👋 successfully')
    }

    return {logout}
}