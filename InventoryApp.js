import React, { useState, useEffect } from 'react';

const InventoryApp = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Optimized Fetching Logic
    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/inventory');
            const result = await response.json();
            if (result.success) {
                setItems(result.data);
            }
        } catch (error) {
            console.error("Integration Error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading InventoryHub...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>InventoryHub Dashboard</h1>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Stock Level</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryApp;
