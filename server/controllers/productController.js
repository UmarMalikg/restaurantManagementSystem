const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  const selectedCategory = req.query.category;

  try {
    if (!selectedCategory) {
      const products = await Product.find();
      return res.status(200).json(products);
    }

    const products = await Product.find({ category: selectedCategory });
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the given category" });
    }

    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addProduct = async (req, res) => {
  try {
    // Extract data from the request body
    const { name, description, price, qty, category, img } = req.body;
    // Check if all required fields are provided
    if (!name || !description || !price || !img) {
      return res.status(400).json({
        error: "Name, description, and price are required fields",
      });
    }

    // Create a new Product instance with the extracted data
    const newProduct = new Product({
      name,
      description,
      img, // Multer will add this property to the request object
      price,
      qty,
      category,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating a new ssssss:", error);
    res.status(500).json({ error: "Error creating a new product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.findByIdAndDelete(productId);

    res.status(204).send("Product Deleted");
  } catch (error) {
    res.status(500).json({ error: "Error deleting the product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const updateData = req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.findByIdAndUpdate(productId, updateData, { new: true });

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating the product" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the product" });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
