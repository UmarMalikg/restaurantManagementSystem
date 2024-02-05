import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [user, setUser] = useState(null);

  const updateEmployee = (newEmployee) => {
    setEmployee(newEmployee);
  };

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <AppContext.Provider value={{ employee, updateEmployee, user, updateUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
