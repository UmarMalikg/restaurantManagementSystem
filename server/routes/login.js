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
        const accessToken = jwt.sign(
          { userName: userName },
          process.env.JWT_SECRET,
          { expiresIn: "1m" }
        );

        const refreshToken = jwt.sign(
          { userName: userName },
          process.env.JWT_REF_SECRET,
          { expiresIn: "2m" }
        );

        res.cookie(`accessToken`, accessToken, { maxAge: 60000 });
        res.cookie(`refreshToken`, refreshToken, {
          maxAge: 120000,
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });

        if (employee.isAdmin) {
          return res.json({ Login: true, Admin: true });
        } else if (employee.isWaiter) {
          return res.json({ Login: true, Waiter: true });
        } else if (employee.isCachier) {
          return res.json({ Login: true, Cashier: true });
        } else if (employee.isKitchenManager) {
          return res.json({ Login: true, KitchenManager: true });
        } else if (employee.isReceptionist) {
          return res.json({ Login: true, Receptionist: true });
        } else {
          return res.json({
            Login: true,
            Admin: false,
            Waiter: false,
            Cachier: false,
            KitchenManager: false,
            Receptionist: false,
          });
        }
      } else {
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
    } else {
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
