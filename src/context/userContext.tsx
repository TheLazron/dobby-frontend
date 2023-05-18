import React, { createContext, useContext, useState } from "react";

import {
  makeAuthenticatedRequest,
  makeAxiosPostRequest,
} from "../utils/axiosUtils";
interface AuthProviderProps {
  children: React.ReactNode;
}

export interface loggedUser {
  name?: string;
  id: string;
  profileUrl?: string;
  blogCount?: number;
  email?: string;
}

// Create the AuthContext

const AuthContext = createContext<any>(null);

// Create a custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);

// Create the AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<loggedUser | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  // Sign in logic
  const signUp = async (name: string, email: string, password: string) => {
    console.log("singup func", email);

    const data = await makeAxiosPostRequest(`http://localhost:3700/signup`, {
      username: name,
      email,
      password,
    });
    console.log(data);
    window.location.href = "/auth/login";
  };

  // Log in logic
  const logIn = async (email: string, password: string) => {
    const data = await makeAxiosPostRequest("http://localhost:3700/login", {
      email,
      password,
    });
    console.log("loggedUser Data", data);
    setJwtToken(data.user.token);
    setCurrentUser({ id: data.user.userId as string });
    if (currentUser) {
      console.log(currentUser.id);
    }

    // try {
    //   const jwtToken = data.user.token;
    //   const id = data.user.userId;

    //   const userData = await makeAuthenticatedRequest(
    //     `http://localhost:3700/get-user/${id}`,
    //     {},
    //     "GET",
    //     jwtToken
    //   );
    //   console.log("got User", userData.data.email);
    //   setCurrentUser((prevUser) => {
    //     return {
    //       ...prevUser,
    //       id: userData.data.id,
    //       name: userData.data.name,
    //       email: userData.data.email,
    //       profileUrl: userData.data.profileUrl,
    //       blogCount: userData.data.blogCount,
    //     };
    //   });
    // } catch (error) {
    //   // Handle error if the second request fails
    //   console.log("Error retrieving user data:", error);
    // }
  };

  // Sign out logic
  const signOut = () => {
    setCurrentUser(null);
    window.location.href = "/home";
  };

  // Get the current user
  const getCurrentUser = () => {
    // Implement your logic to get the current user here
    return currentUser;
  };

  // Create the auth context value
  const authContextValue = {
    signUp,
    logIn,
    signOut,
    getCurrentUser,
    jwtToken,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
