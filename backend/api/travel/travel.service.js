const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const logger = require('../../services/logger.service');

module.exports = {
    query,
    getTravelById,
    createTravel,
    updateTravel,
    removeTravel
}

async function query(filterBy = '') {
    const travelDb = await dbService.getCollection('travel');
    const searchCriteria = _buildCriteria(filterBy);
    try {
        const travels = await travelDb.find({}).toArray();
        return travels;
    } catch (err) {
        throw 'Error is' + err;
    }
}

async function getTravelById(_id){
    const travelDb = await dbService.getCollection('travel');
    try{
        const travel = await travelDb.findOne({"_id":ObjectId(_id)});
        return travel;
    } catch (err) {
        throw 'Error is' + err;
    }
}

async function createTravel(travel){
    const travelDb = await dbService.getCollection('travel');
    travel.createdAt = new Date(Date.now()).toISOString();
    try{
        await travelDb.insertOne(travel);
        return travel;
    }catch (err) {
        throw 'Error is' + err;
    }
}

async function updateTravel(travel){
    const travelDb = await dbService.getCollection('travel');
    travel._id = ObjectId(travel._id);
    travel.updatedAt = new Date(Date.now()).toISOString();
    try{
        await travelDb.updateOne({ "_id" : ObjectId(travel._id) },{ $set: travel});
        return travel;
    }catch (err) {
        throw 'Error is' + err;
    }
}

async function removeTravel(_id){
    const travelDb = await dbService.getCollection('travel');
    try{
        await travelDb.deleteOne({"_id": ObjectId(_id)});
        return _id;
    }catch (err) {
        throw 'Error is' + err;
    }
}

function _buildCriteria(filterby) {

    return filterby;
}