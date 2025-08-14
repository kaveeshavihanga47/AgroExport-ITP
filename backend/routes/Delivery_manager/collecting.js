const express = require('express');
const router = express.Router();
const Collecting = require('../../models/Delivery_manager/Collecting.js');
const CollectingModel1 = require('../../models/Collecting_manager/collecting.js'); 
const CollectingModel2 = require('../../models/Delivery_manager/Collecting.js'); 

// Route to insert random collectings

router.post("/", (req, res) => {
  Collecting.create(req.body) // Change from employee to Farmer
      .then(() => res.json({ msg: "Farmer created successfully!" }))
      .catch(() => res.status(400).json({ msg: "Farmer not created!" }));
});

router.get('/insert-collectings', async (req, res) => {
    try {
        const collectingsData = Array.from({ length: 2 }, generateRandomCollecting);
        await Collecting.insertMany(collectingsData);
        res.send('Inserted 2 random collectings.');
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send('Error inserting data.');
    }
});

// Route to get collectings
router.get('/', async (req, res) => {
    try {
        const collectingsData = await Collecting.find({ DeliverAction: "Pending" });
        res.json(collectingsData);
    } catch (error) {
        res.status(500).send('Error fetching data.');
    }
});

// Route to update DeliverAction to "Reject"
router.put('/:id/reject', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCollecting = await Collecting.findByIdAndUpdate(
            id, 
            { DeliverAction: "Reject" },
            { new: true }
        );
        if (!updatedCollecting) {
            return res.status(404).send('Order not found');
        }
        res.json(updatedCollecting);
    } catch (error) {
        res.status(500).send('Error updating order status.');
    }
});

// Route to update DeliverAction to "Finish"
router.put('/:id/finish', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCollecting = await Collecting.findByIdAndUpdate(
            id, 
            { DeliverAction: "Finish" },
            { new: true }
        );
        if (!updatedCollecting) {
            return res.status(404).send('Order not found');
        }
        res.json(updatedCollecting);
    } catch (error) {
        res.status(500).send('Error updating order status.');
    }
});

// Route to update DeliverAction to "Accept"
router.put('/:id/accept', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCollecting = await Collecting.findByIdAndUpdate(
            id, 
            { DeliverAction: "Accept" },
            { new: true }
        );
        if (!updatedCollecting) {
            return res.status(404).send('Order not found');
        }
        res.json(updatedCollecting);
    } catch (error) {
        res.status(500).send('Error updating order status.');
    }
});

// Route to update address
router.put('/:id/update-address', async (req, res) => {
    const { id } = req.params;
    const { newAddress } = req.body;

    try {
        const updatedCollecting = await Collecting.findByIdAndUpdate(
            id,
            { $push: { Address: newAddress } },
            { new: true }
        );
        if (!updatedCollecting) {
            return res.status(404).send('Collecting not found.');
        }
        res.json(updatedCollecting);
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).send('Error updating address.');
    }
});


// Route to transfer data from Table 1 to Table 2
router.post('/transfer-data', async (req, res) => {
    try {
        // Fetch data from Table 1
        const collectingData = await CollectingModel1.find({});

        // Process and insert into Table 2
        const transformedData = collectingData.map(item => {
            return {
                TrackingNo: generateTrackingNumber(),    
                farmerNIC: item.farmerNIC,              
                Name: item.Name,                       
                Address: [
                    {
                        warehouse: generateWarehouseName(),  
                        date: item.Date.toISOString().split('T')[0],  
                        time: item.Time,                     
                    }
                ],
                CNumber: item.CNumber,                 
                Category: item.Category,                 
                Quantity: item.Quantity,                
                Date: item.Date.toISOString().split('T')[0], 
                Time: item.Time,                        
                HarID: item.HarID,                      
                DeliverAction: 'Pending'                 
            };
        });

        // Insert data into Table 2
        await CollectingModel2.insertMany(transformedData);

        res.json({ msg: 'Data transferred successfully!' });
    } catch (error) {
        console.error('Error transferring data:', error);
        res.status(500).json({ msg: 'Error transferring data' });
    }
});

// Helper function to generate a random tracking number
function generateTrackingNumber() {
    return 'TR-' + Math.floor(Math.random() * 100000);
}

// Helper function to generate a random warehouse name
function generateWarehouseName() {
    const warehouses = ['Warehouse A', 'Warehouse B', 'Warehouse C'];
    return warehouses[Math.floor(Math.random() * warehouses.length)];
}

module.exports = router;
