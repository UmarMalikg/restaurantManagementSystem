const express = require("express");
const Category = require("../models/categoryModel");

const router = express.Router();

// Gettng the categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
      res.status(404).json({ message: "No categories found" });
    } else {
      res.status(200).json(categories);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// post new category

router.post("/", async (req, res) => {
  try {
    const newCategory = new Category(req.body);

    if (!newCategory.name) {
      return res.status(400).json({ error: "Name is required field" });
    }

    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: "Error creating a new Category" });
  }
});

// Deletng a category
router.delete("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    await Category.findByIdAndDelete(categoryId);

    res.status(204).send("Category Deleted");
  } catch (error) {
    res.status(500).json({ error: "Error deleting the Category" });
  }
});

//Updatng a category
router.put("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updateData = req.body;

    // Check if the table exists
    const existingCategory = await Table.findById(categoryId);

    if (!existingCategory) {
      return res.status(404).json({ error: "Table not found" });
    }

    // Update the table
    await Category.findByIdAndUpdate(categoryId, updateData, { new: true });

    res.status(200).json({ message: "Table updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating the table" });
  }
});

// Getting a single category
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.tableId;

    // Find the table by ID
    const category = await Table.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the category" });
  }
});

module.exports = router;
