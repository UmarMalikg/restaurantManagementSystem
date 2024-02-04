import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);

  const updateEmployee = (newEmployee) => {
    setEmployee(newEmployee);
  };

  return (
    <AppContext.Provider value={{ employee, updateEmployee }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
