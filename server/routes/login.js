const express = require("express");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employeeModel");
const User = require("../models/userModel");

const router = express.Router();

// JWT_REF_SECRET
// JWT_SECRET

router.post("/", async (req, res) => {
  const { userName, pswrd } = req.body;
  const employee = await Employee.findOne({ userName });
  const user = await User.findOne({ userName });
  try {
    if (employee || user) {
      // if both user and employee exsists then user have extra feature to select that either he/she wanna go to user page or employee page
      // this logic will implemented later
      // if(employee && user){

      // }

      // if there's employee
      if (employee) {
        if (await employee.matchPassword(pswrd)) {
          // creating access Token to access the pages
          const accessToken = jwt.sign(
            { userName: userName },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          // creating a refreshToken to recreact the access token when it expires
          const refreshToken = jwt.sign(
            { userName: userName },
            process.env.JWT_REF_SECRET,
            { expiresIn: "2d" }
          );

          // storing both tokens in cookies
          res.cookie(`accessToken`, accessToken, {
            maxAge: 86400000,
            httpOnly: true,
            // secure: true,
            // sameSite: "none",
          });
          res.cookie(`refreshToken`, refreshToken, {
            maxAge: 172800000,
            httpOnly: true,
            // secure: true,
            // sameSite: "none",
          });

          //Checking for the employee roles to grant access based on their roles.
          if (employee.isAdmin) {
            return res.json({
              Login: true,
              Admin: true,
              employee,
            });
          } else if (employee.isWaiter) {
            return res.json({
              Login: true,
              Waiter: true,
              employee,
            });
          } else if (employee.isCachier) {
            return res.json({
              Login: true,
              Cashier: true,
              employee,
            });
          } else if (employee.isKitchenManager) {
            return res.json({
              Login: true,
              KitchenManager: true,
              employee,
            });
          } else if (employee.isReceptionist) {
            return res.json({
              Login: true,
              Receptionist: true,
              employee,
            });
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
      }
      // if there's a user exsit
      else if (user) {
        if (await user.matchPassword(pswrd)) {
          // creating access Token to access the pages
          const accessToken = jwt.sign(
            { userName: userName },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          // creating a refreshToken to recreact the access token when it expires
          const refreshToken = jwt.sign(
            { userName: userName },
            process.env.JWT_REF_SECRET,
            { expiresIn: "2d" }
          );

          // storing both tokens in cookies
          res.cookie(`accessToken`, accessToken, {
            maxAge: 86400000,
            httpOnly: true,
            // secure: true,
            // sameSite: "none",
          });
          res.cookie(`refreshToken`, refreshToken, {
            maxAge: 172800000,
            httpOnly: true,
            // secure: true,
            // sameSite: "none",
          });

          //Checking for the employee roles to grant access based on their roles.

          return res.json({ Login: true, user });

          //If no role is selected, then the employee can only view and modify their own data.
        }
      }

      // if theres Incorrect Password then login credentials set to be false
      else {
        return res.status(400).json(
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
      return res.status(404).json(
        {
          Login: false,
          Admin: false,
          Waiter: false,
          Cachier: false,
          KitchenManager: false,
          Receptionist: false,
        },
        {
          message: "No record found",
        }
      );
    }
  } catch (error) {
    res.status(500).json({ error: "Error Generated" });
  }
});

module.exports = router;
