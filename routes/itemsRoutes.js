const express = require('express');
const router = express.Router();



// testing of this API using browser done //

router.get('/', (req, res) => {
    res.status(200).json({
        msg: "fetching all the products and services here"
    })
    console.log("Welcone to the catalog page");
});


module.exports = router;


