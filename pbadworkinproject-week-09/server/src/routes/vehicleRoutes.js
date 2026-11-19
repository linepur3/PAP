const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const {
    authenticateToken
} = require('../middleware/authMiddleware')

// POST - tambah kendaraan baru
router.post('/', vehicleController.createVehicle);


router.get("/all", authenticateToken, vehicleController.viewAllVehicles);
router.get("/single/:id", vehicleController.viewSingleVehicle);
router.put("/edit/:id", vehicleController.editVehicle);
router.delete("/delete/:id", vehicleController.deleteVehicle);

module.exports = router;