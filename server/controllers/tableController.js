const Table = require("../models/tableModel");

const getTables = async (req, res) => {
  try {
    const tables = await Table.find();

    if (!tables || tables.length === 0) {
      res.status(404).json({ message: "No tables found" });
    } else {
      res.status(200).json(tables);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTableById = async (req, res) => {
  try {
    const tableId = req.params.tableId;

    // Find the table by ID
    const table = await Table.findById(tableId);

    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }

    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the table" });
  }
};

const addTable = async (req, res) => {
  try {
    const newTable = new Table(req.body);

    if (!newTable.name || !newTable.seats) {
      return res
        .status(400)
        .json({ error: "Name and seats are required fields" });
    }

    const savedTable = await newTable.save();

    res.status(201).json(savedTable);
  } catch (error) {
    res.status(500).json({ error: "Error creating a new table" });
  }
};

const updateTable = async (req, res) => {
  try {
    const tableId = req.params.tableId;
    const updateData = req.body;

    // Check if the table exists
    const existingTable = await Table.findById(tableId);

    if (!existingTable) {
      return res.status(404).json({ error: "Table not found" });
    }

    // Update the table
    await Table.findByIdAndUpdate(tableId, updateData, { new: true });

    res.status(200).json({ message: "Table updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating the table" });
  }
};

const deleteTable = async (req, res) => {
  try {
    const tableId = req.params.tableId;
    const existingTable = await Table.findById(tableId);

    if (!existingTable) {
      return res.status(404).json({ error: "Table not found" });
    }

    await Table.findByIdAndDelete(tableId);

    res.status(204).send("table Deleted");
  } catch (error) {
    res.status(500).json({ error: "Error deleting the table" });
  }
};

module.exports = {
  getTableById,
  getTables,
  addTable,
  deleteTable,
  updateTable,
};
