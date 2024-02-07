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

  const [addedItemsForOrder, setAddedItemsforOrder] = useState([
    { item: "", qty: "" },
  ]);
  const updateItemsForOrder = (item, qty) => {
    // Find if the item already exists in orderItems
    const existingItemIndex = addedItemsForOrder.findIndex(
      (addedItemsForOrder) => addedItemsForOrder.item === item
    );
    const emptyItemIndex = addedItemsForOrder.findIndex(
      (addedItemsForOrder) =>
        addedItemsForOrder.item === "" && addedItemsForOrder.qty === ""
    );
    if (emptyItemIndex !== -1) {
      const addFirstItem = [{ item, qty }];
      setAddedItemsforOrder(addFirstItem);
      console.log("first item", addFirstItem);
    }

    // If the item already exists, update its quantity
    else if (existingItemIndex !== -1) {
      const updatedOrderItems = [...addedItemsForOrder];
      updatedOrderItems[existingItemIndex].qty = qty;
      setAddedItemsforOrder(updatedOrderItems);
      console.log("Item updated:", updatedOrderItems);
    } else {
      // If the item doesn't exist, add it to orderItems
      setAddedItemsforOrder([...addedItemsForOrder, { item, qty }]);
      console.log("Item added:", [...addedItemsForOrder, { item, qty }]);
    }
  };

  const [selectedTable, setSelectedTable] = useState(null);
  const updateSelectedTable = (newSelectedTable) => {
    setSelectedTable(newSelectedTable);
  };

  return (
    <AppContext.Provider
      value={{
        employee,
        updateEmployee,
        user,
        updateUser,
        addedItemsForOrder,
        updateItemsForOrder,
        setAddedItemsforOrder,
        selectedTable,
        updateSelectedTable,
        setSelectedTable,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
