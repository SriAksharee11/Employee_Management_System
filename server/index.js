const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserLogin = require('./models/UserLogin');
const UserModel = require('./models/User'); // Ensure your model is correctly required
const Port = 3001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/employee")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Login Route
app.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserLogin.findOne({ email });

    if (user) {
      if (user.password === password) {
        return res.json({
          loginStatus: true,
          message: "Login successful",
          username: email,
        });
      } else {
        return res.json({ loginStatus: false, error: "Invalid password" });
      }
    } else {
      return res.json({ loginStatus: false, error: "User not found" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get All Users
app.get('/', async (req, res) => {
  try {
    const users = await UserModel.find({});
    console.log(users)
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving users", error: err });
  }
});


// Get User by ID
app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});



// Update User by ID
app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate({ _id: id }, {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

// Delete User by ID
app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

// Create New User with Unique f_Id
app.post("/createUser", async (req, res) => {
  try {
    // Check if f_Id already exists
    const existingUser = await UserModel.findOne({ f_Id: req.body.f_Id });
    if (existingUser) {
      return res.status(400).json({ message: "f_Id already exists. Use a unique f_Id." });
    }

    // Create a new user with a unique f_Id if not provided
    const newUser = {
      ...req.body,
      f_Id: req.body.f_Id || new Date().getTime().toString(), // Generate unique ID if not provided
    };

    const user = await UserModel.create(newUser);
    console.log("User created:", user);
    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    if (err.code === 11000) {
      res.status(400).json({ message: "Duplicate f_Id value. Please use a unique f_Id." });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// Server Setup
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
