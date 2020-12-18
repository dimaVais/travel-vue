const express = require('express');
const router = express.Router();

const {
    query,
    getTravelById,
    createTravel,
    updateTravel,
    removeTravel
} = require('./travel.controller');

// const {requireAuth,requireOwner} = require('../../middlewares/requireAuth.middleware');

router.get('/', query);
router.post('/', createTravel);
router.get('/:id', getTravelById);
router.put('/:id', updateTravel);
router.delete('/:id', removeTravel);

module.exports = router;