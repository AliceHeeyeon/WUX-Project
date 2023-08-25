import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  //
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true); // disables button to stop requests
    setError(null); // ensure there are no errors

    // API call
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/signup",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      ); // end of URL

      if (response.status !== 200) {
        setIsLoading(false);
        setError(error.response.data.error);
      }

      // handle if response is ok
      // status = 200
      if (response.status === 200) {
        // save user local storage
        localStorage.setItem("user", JSON.stringify(response.data));

        // update the auth context - say user is signed in
        // dispatch with the relevant type - "LOGIN"
        dispatch({ type: "LOGIN", payload: response.data });

        // reenable the button
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error.response.data.error);
      // update the error state
      setError(error.response.data.error);
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error }; // signup function, isLoading state and error state
};
