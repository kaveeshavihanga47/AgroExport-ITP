const mongoose = require("mongoose");


// Replace <password> with your actual MongoDB password
const dbUrl = "mongodb+srv://imeshau:N3IeCr28MQcOR9Ss@cluster0.wc2wv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const JWT_SECRET = "secret";
// Setting Mongoose options (optional and depends on your use case)
mongoose.set("strictQuery", true);

const connection = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("MongoDB Connected~ ");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

module.exports = connection;