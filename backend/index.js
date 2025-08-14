const express = require("express");

const dbConnection = require("./config/db"); // Ensure this file connects to MongoDB
const financialRoutes = require("./routes/Finance_manager/financial.js"); // Assuming this is your financial route handler
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/User/userRoute.js"); // Assuming this is your user route handler
const destributorRoutes = require("./routes/Finance_manager/destributorRoute.js")

const routes = require("./routes/Delivery_manager/farmer.js");

const disRoute = require("./routes/Distribution_manager/distribution.js");

const inventory = require("./routes/Inventory_manager/inventory.js");

const receivedOrderRoutes = require("./routes/Export_manager/ReceivedOrders.js");
const ongoingOrderRoutes = require("./routes/Export_manager/OngoingOrders.js");
const user = require("./routes/Export_manager/User.js");
const exportRoutes = require("./routes/Export_manager/exports.js")

const orderRoute = require("./routes/Order_manager/ordermanagements.js");

const collecting = require("./routes/Collecting_manager/collecting.js");

const supplierRoute = require("./routes/Supplier/SupplierRoute.js")

const collecting2  = require("./routes/Delivery_manager/collecting.js")

const paymentReturn = require("./routes/Finance_manager/PaymentReturnRoute.js")




const app = express();

// Enable CORS with credentials
app.use(cors({ origin: true, credentials: true }));

// Connect to MongoDB (ensure this is working properly)
dbConnection();

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json()); // to parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // to parse application/x-www-form-urlencoded

// Default route to check server status
app.get("/", (req, res) => {
  res.send("Welcome imaa...");
});

// Financial routes for handling financial transactions
app.use("/api/financial", financialRoutes);
app.use("/api/user", userRoutes);
app.use("/api/destributor", destributorRoutes)
app.use("/api/FarmerPayments",routes);
app.use("/api/distribution", disRoute);

app.use("/api/ReceivedOrders", receivedOrderRoutes);
app.use("/api/OngoingOrders", ongoingOrderRoutes);
app.use("/api/users", user);
app.use("/api/exports", exportRoutes);

app.use("/api/inventory",inventory);

app.use("/api/ordermanagement",orderRoute);

app.use("/api/collecting", collecting); 

app.use("/api/supplier", supplierRoute);

app.use("/api/collectings", collecting2 );

app.use("/api/paymentreturn", paymentReturn);


// Start the server on a port that is not already in use
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

