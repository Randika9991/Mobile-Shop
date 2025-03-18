const express = require('express');

// Import CORS
const cors = require('cors');

// Import the database connection
const connectDB = require('./src/config/db');

// Import task routes
const adminRoutes = require('./src/routes/adminRoutes');
const adminUserRoutes = require('./src/routes/adminUserRoutes');
const userRoutes = require('./src/routes/userRoutes');

// Initialize Express app
const app = express();

// Use CORS middleware to handle CORS issues

app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Parse incoming JSON requests
app.use(express.json());
app.use('/api', adminRoutes); // Use task routes for '/api' path
app.use('/api', adminUserRoutes); // Use task routes for '/api' path
app.use('/api', userRoutes); // Use task routes for '/api' path


//connect db
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
