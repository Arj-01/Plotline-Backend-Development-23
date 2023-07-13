const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8001;


// importing routes //
const itemsRoutes = require('./routes/itemsRoutes.js');



// connecting mongodb remotely with the current project in VS-CODE using string URL//
const dbUrl = "mongodb+srv://aarjitgiri:billingservice@billingcluster.hwne6nc.mongodb.net/"; 

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
  
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



// creating Middleware //
app.use(express.json());



// routes //
app.use('/', itemsRoutes);


// catalog page //



// server listening at port 8001 //
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

