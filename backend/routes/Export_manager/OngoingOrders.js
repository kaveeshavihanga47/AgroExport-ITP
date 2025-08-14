// backend/routes/OngoingOrders.js
const express = require("express");
const router = express.Router();
const OngoingOrder = require("../../models/Export_manager/OngoingOrders");
const Export = require("../../models/Export_manager/export");

// backend/routes/OngoingOrders.js
router.get("/", async (req, res) => {
    try {
      const ongoingOrders = await OngoingOrder.find();
      res.json(ongoingOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  });
  

router.post("/moveToOngoing/:id", async (req, res) => {
  try {
    // Find the order by ID from the export model
    const exportedOrder = await Export.findById(req.params.id);

    if (!exportedOrder) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // Create a new OngoingOrder using the exported order's data
    const newOngoingOrder = new OngoingOrder({
      UserID: exportedOrder.UserID,
      OrderID: exportedOrder.OrderID,
      Quantity: exportedOrder.Quantity,
      Item: exportedOrder.Item,
      Status: "shipped",
    });

    await newOngoingOrder.save();

    // Optionally, you can delete the order from the export collection if needed
    await Export.findByIdAndDelete(req.params.id);

    res.json({ msg: "Order moved to Ongoing Orders" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
