const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock Database
let inventory = [
    { id: 1, name: "Laptop", quantity: 10, price: 999.99 },
    { id: 2, name: "Wireless Mouse", quantity: 50, price: 25.50 }
];

// GET: Optimized retrieval of inventory
app.get('/api/inventory', (req, res) => {
    try {
        // Structured JSON response
        res.status(200).json({
            success: true,
            count: inventory.length,
            data: inventory
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// POST: Adding items with basic validation
app.post('/api/inventory', (req, res) => {
    const { name, quantity, price } = req.body;
    if (!name || !quantity) {
        return res.status(400).json({ success: false, message: "Please provide name and quantity" });
    }
    const newItem = { id: inventory.length + 1, name, quantity, price };
    inventory.push(newItem);
    res.status(201).json({ success: true, data: newItem });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
