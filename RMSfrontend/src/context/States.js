import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const updateEmployee = (newEmployee) => {
    setEmployee(newEmployee);
  };

  const [user, setUser] = useState(null);
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const [orderItems, setOrderItems] = useState([{ item: "", qty: "" }]);
  const updateOrderItems = (item, qty) => {
    // Find if the item already exists in orderItems
    const existingItemIndex = orderItems.findIndex(
      (orderItem) => orderItem.item === item
    );
    const emptyItemIndex = orderItems.findIndex(
      (orderItem) => orderItem.item === "" && orderItem.qty === ""
    );
    if (emptyItemIndex !== -1) {
      const addFirstItem = [{ item, qty }];
      setOrderItems(addFirstItem);
      console.log("first item", addFirstItem);
    }

    // If the item already exists, update its quantity
    else if (existingItemIndex !== -1) {
      const updatedOrderItems = [...orderItems];
      updatedOrderItems[existingItemIndex].qty = qty;
      setOrderItems(updatedOrderItems);
      console.log("Item updated:", updatedOrderItems);
    } else {
      // If the item doesn't exist, add it to orderItems
      setOrderItems([...orderItems, { item, qty }]);
      console.log("Item added:", [...orderItems, { item, qty }]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        employee,
        updateEmployee,
        user,
        updateUser,
        orderItems,
        updateOrderItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
