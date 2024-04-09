import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const storedEmployee = localStorage.getItem("employee");
  const initialEmployee = storedEmployee ? JSON.parse(storedEmployee) : null;
  // state that keep track of logined employee
  const [employee, setEmployee] = useState(initialEmployee);
  const updateEmployee = (newEmployee) => {
    setEmployee(newEmployee);
  };

  // state that keep track of logined user
  const [user, setUser] = useState(null);
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  // states that keep track of added Items for order
  const [addedItemsForOrder, setAddedItemsforOrder] = useState([
    { item: "", qty: "", itemStatus: "Pending" },
  ]);
  const updateItemsForOrder = (item, qty, itemStatus) => {
    // Find if the item already exists in orderItems
    const existingItemIndex = addedItemsForOrder.findIndex(
      (addedItemsForOrder) => addedItemsForOrder.item === item
    );

    // If the item already exists, show an alert message and return
    if (existingItemIndex !== -1) {
      alert("Item already added");
      return;
    }

    // Find if there's an empty item index in addedItemsForOrder
    const emptyItemIndex = addedItemsForOrder.findIndex(
      (addedItemsForOrder) =>
        addedItemsForOrder.item === "" && addedItemsForOrder.qty === ""
    );

    if (emptyItemIndex !== -1) {
      // If an empty item exists, update it
      const addFirstItem = [{ item, qty, itemStatus }];
      setAddedItemsforOrder(addFirstItem);
      console.log("first item", addFirstItem);
    } else {
      // If the item doesn't exist, add it to orderItems
      setAddedItemsforOrder([...addedItemsForOrder, { item, qty, itemStatus }]);
      console.log("Item added:", [
        ...addedItemsForOrder,
        { item, qty, itemStatus },
      ]);
    }
  };

  // states for checking the actived admin link
  const [adminActivedLink, setAdminActivedLink] = useState("Dashboard");
  const updateAdminActivedLink = (link) => {
    setAdminActivedLink(link);
  };

  // state for selecting the table for order
  const [selectedTable, setSelectedTable] = useState(null);
  const updateSelectedTable = (newSelectedTable) => {
    setSelectedTable(newSelectedTable);
  };

  // return
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
        adminActivedLink,
        updateAdminActivedLink,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
