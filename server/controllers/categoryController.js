const Category = require("../models/categoryModel");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    res.status(200).json(categories);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching the employees with err ${err}" });
  }
};

const addCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    if (!newCategory.name) {
      res.status(400).json({ message: "Please enter the name of Category" });
    }
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    return res.status(500).json({ message: `Error adding Category ${err}` });
  }
};

const deleteCategory = async (req, res) => {
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
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Find the table by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the category" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updateData = req.body;

    // Check if the table exists
    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      return res.status(404).json({ error: "category not found" });
    }

    // Update the table
    await Category.findByIdAndUpdate(categoryId, updateData, { new: true });

    res.status(200).json({ message: "category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating the category" });
  }
};

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
