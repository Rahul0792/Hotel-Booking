// src/context/AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Logged-in user
  const [registeredUsers, setRegisteredUsers] = useState([]); // Users from signup

  // Signup: store user
  const signup = (newUser) => {
    // Check if email already exists
    const exists = registeredUsers.find(u => u.email === newUser.email);
    if (exists) return false;

    setRegisteredUsers([...registeredUsers, newUser]);
    return true;
  };

  // Login: check credentials
  const login = (email, password) => {
    const foundUser = registeredUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
