// const express = require("express");

// const app = express();

// app.get("/", async(req,res)=> {
//     await 
//     res.send("hi")
// })

// app.listen(3000, ()=> {
//     console.log(`Server running on port 3000`)
// })


const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT =  3001;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB Connection String
// Replace 'localhost:27018' with your MongoDB host if it's different.
// 'todo-back' is your database name, and 'todo-app' is your collection name.
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error:', err));const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose Schema for your Todo items
// Based on your screenshot, the documents in 'todo-app' collection
// have an '_id' and a 'todos' field which is an Array.
// We'll define a schema that reflects this structure.
const budgetSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true // Make it required if an item name is always needed
    },
    price: {
        type: Number,
        required: true
    },
    balanceLeft: {
        type: Number,
        required: true
    },
    createdAt: { // Optional: Add a timestamp
        type: Date,
        default: Date.now
    }
});

const BudgetApp = mongoose.model('BudgetApp', budgetSchema, 'budget-app');


// Define your API route to fetch data
app.get("/", async (req, res) => {
    try {
        
        const allBudgetDocuments = await BudgetApp.find({});

        // Send the fetched data as a JSON response
        res.status(200).json(allBudgetDocuments);
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching todo data:", error);
        // Send an error response to the client
        res.status(500).json({ message: "Failed to fetch todo data", error: error.message });
    }
});

app.post("/", async (req, res)=>{
  const {item, price, balanceLeft } = req.body;
  try {
    const newBudget = await BudgetApp.create({
      item,
      price,
      balanceLeft
    })
    res.status(201).json({newBudget})
  } catch (error) {
    res.status(500).json({message: "Failed to create budget entry", error: error.message})
  }
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access your API at http://localhost:${PORT}`);
});