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
    } else if (existingItemIndex !== -1) {
      const updatedOrderItems = [...addedItemsForOrder];
      updatedOrderItems[existingItemIndex].qty = qty;
      setAddedItemsforOrder(updatedOrderItems);
      console.log("Item updated:", updatedOrderItems);
    } else {
      // If the item doesn't exist, add it to orderItems
      setAddedItemsforOrder([...addedItemsForOrder, { item, qty, itemStatus }]);
      console.log("Item added:", [
        ...addedItemsForOrder,
        { item, qty, itemStatus },
      ]);
    }
  };
  // states that keep track of added Items for order
  const [updatedAddedItemsForOrder, setUpdatedAddedItemsforOrder] = useState([
    { item: "", qty: "", itemStatus: "Pending" },
  ]);
  const updateUpdatedItemsForOrder = (item, qty, itemStatus) => {
    // Find if the item already exists in orderItems
    const existingItemIndex = updatedAddedItemsForOrder.findIndex(
      (updatedAddedItemsForOrder) => updatedAddedItemsForOrder.item === item
    );

    // Find if there's an empty item index in addedItemsForOrder
    const emptyItemIndex = updatedAddedItemsForOrder.findIndex(
      (updatedAddedItemsForOrder) =>
        updatedAddedItemsForOrder.item === "" &&
        updatedAddedItemsForOrder.qty === ""
    );

    if (emptyItemIndex !== -1) {
      // If an empty item exists, update it
      const addFirstItem = [{ item, qty, itemStatus }];
      setUpdatedAddedItemsforOrder(addFirstItem);
      console.log("first item", addFirstItem);
    } else if (existingItemIndex !== -1) {
      const updateUpdatedItemsForOrder = [...updatedAddedItemsForOrder];
      updateUpdatedItemsForOrder[existingItemIndex].qty = qty;
      setUpdatedAddedItemsforOrder(updateUpdatedItemsForOrder);
      console.log("Item updated:", updateUpdatedItemsForOrder);
    } else {
      // If the item doesn't exist, add it to orderItems
      setUpdatedAddedItemsforOrder([
        ...updatedAddedItemsForOrder,
        { item, qty, itemStatus },
      ]);
      console.log("Item added:", [
        ...updatedAddedItemsForOrder,
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
        updatedAddedItemsForOrder,
        updateUpdatedItemsForOrder,
        setUpdatedAddedItemsforOrder,
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
