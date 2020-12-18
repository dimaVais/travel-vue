const travelService = require('./travel.service.js');

module.exports = {
    query,
    getTravelById,
    createTravel,
    updateTravel,
    removeTravel
}

async function query (req, res) {
    const filterBy = req.query;
    try {
        const travels = await travelService.query(filterBy);
        res.json(travels);
    } catch (err) {
        res.status(500).send(`Somthing Went Wrong ${err}`);
    }
}

async function getTravelById(req, res){
    const travelId = req.params.id;
    try {
        const travel = await travelService.getTravelById(travelId);
        res.json(travel);
    } catch (err) {
        res.status(500).send(`Somthing Went Wrong ${err}`);
    }
}

async function createTravel(req, res){
    const travel = req.body;
    try {
        const createdTravel = await travelService.createTravel(travel);
        res.json(createdTravel);
    } catch (err) {
        res.status(500).send(`Somthing Went Wrong ${err}`);
    }
}

async function updateTravel(req, res){
    const travel = req.body;
    try {
        const updatedTravel = await travelService.updateTravel(travel);
        res.json(updatedTravel);
    } catch (err) {
        res.status(500).send(`Somthing Went Wrong ${err}`);
    }
}

async function removeTravel(req, res){
    const travelRemoveId = req.params.id;
    try {
        const removedId = await travelService.removeTravel(travelRemoveId);
        res.end(`Travel with id ${removedId} removed well`);
    } catch (err) {
        res.status(500).send(`Somthing Went Wrong ${err}`);
    }
}

