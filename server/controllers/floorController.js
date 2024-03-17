const Floor = require("../models/floorModel");

const getFloor = async (req, res) => {
  try {
    const floors = await Floor.find();
    if (!floors || floors.length === 0) {
      return res.status(404).json({ message: `No Floor found` });
    }
    res.status(200).json(floors);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching the employees with err ${err}" });
  }
};

const addFloor = async (req, res) => {
  try {
    const newFloor = new Floor(req.body);
    if (!newFloor.name) {
      return res.status(400).json({ message: `name is required` });
    }
    const savedFloor = await newFloor.save();
    res.status(200).json(savedFloor);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching the employees with err ${err}" });
  }
};

const getFloorById = async (req, res) => {
  try {
    const floorId = req.params.floorId;
    const floor = await Floor.findById(floorId);
    if (!floor) {
      return res.status(404).json({ message: `No floor found with this id` });
    }
    return res.status(200).json(floor);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching the employees with err ${err}" });
  }
};

const deleteFloor = async (req, res) => {
  try {
    const floorId = req.params.floorId;
    const exsistingFloor = await Floor.findById(floorId);
    if (!exsistingFloor) {
      return res.status(404).json({ message: `Floor not found` });
    }
    await Floor.findByIdAndDelete(floorId);
    return res.status(204).json({ message: `Floor Deleted` });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching the employees with err ${err}" });
  }
};

const updateFloor = async (req, res) => {
  try {
    const floorId = req.params.floorId;
    const updateData = req.body;

    const exsistingFloor = await Floor.findById(floorId);
    if (!exsistingFloor) {
      return res.status(404).json({ message: `Floor not found` });
    }

    await Floor.findByIdAndUpdate(floorId, updateData, { new: true });

    return res.status(200).json({ message: "Floor updated" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching the employees with err ${err}" });
  }
};

module.exports = {
  addFloor,
  getFloor,
  getFloorById,
  deleteFloor,
  updateFloor,
};
