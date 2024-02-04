const express = require("express");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employeeModel");

const router = express.Router();

// post new Table

// JWT_REF_SECRET
// JWT_SECRET

router.post("/", async (req, res) => {
  const { userName, pswrd } = req.body;
  const employee = await Employee.findOne({ userName });
  try {
    if (employee) {
      if (await employee.matchPassword(pswrd)) {
        // creating access Token to access the pages
        const accessToken = jwt.sign(
          { userName: userName },
          process.env.JWT_SECRET,
          { expiresIn: "1m" }
        );

        // creating a refreshToken to recreact the access token when it expires
        const refreshToken = jwt.sign(
          { userName: userName },
          process.env.JWT_REF_SECRET,
          { expiresIn: "2m" }
        );

        // storing both tokens in cookies
        res.cookie(`accessToken`, accessToken, { maxAge: 60000 });
        res.cookie(`refreshToken`, refreshToken, {
          maxAge: 120000,
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });

        //Checking for the employee roles to grant access based on their roles.
        if (employee.isAdmin) {
          return res.json({ Login: true, Admin: true, employee });
        } else if (employee.isWaiter) {
          return res.json({ Login: true, Waiter: true, employee });
        } else if (employee.isCachier) {
          return res.json({ Login: true, Cashier: true, employee });
        } else if (employee.isKitchenManager) {
          return res.json({ Login: true, KitchenManager: true, employee });
        } else if (employee.isReceptionist) {
          return res.json({ Login: true, Receptionist: true, employee });
        }
        //If no role is selected, then the employee can only view and modify their own data.
        else {
          return res.json({
            Login: true,
            Admin: false,
            Waiter: false,
            Cachier: false,
            KitchenManager: false,
            Receptionist: false,
          });
        }
      }
      // if theres Incorrect Password then login credentials set to be false
      else {
        return res.json(
          {
            Login: false,
            Admin: false,
            Waiter: false,
            Cachier: false,
            KitchenManager: false,
            Receptionist: false,
          },
          `Incorrect Username or Password`
        );
      }
    }
    // and if no user or employee exists then also login credentials set to be false
    else {
      return res.json(
        {
          Login: false,
          Admin: false,
          Waiter: false,
          Cachier: false,
          KitchenManager: false,
          Receptionist: false,
        },
        `No record found`
      );
    }
  } catch (error) {
    res.status(500).json({ error: "Error Generated" });
  }
});

module.exports = router;
