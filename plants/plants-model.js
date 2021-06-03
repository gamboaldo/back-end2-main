const db = require('../api/db-config');

const getPlants = () => {
  return db('plants');
};

const getPlantById = (plant_id) => {
  return db('plants').where('plant_id', plant_id).first();
};

const getPlantsByUserId = (user_id) => {
  return db('plants').where('user_id', user_id);
};

const createPlant = (plant) => {
  console.log(plant);
  return db('plants').insert(plant, [
    'plant_id',
    'nickname',
    'species',
    'h2ofrequency',
    'user_id',
  ]);
};

const updatePlant = async (id, plant) => {
  return db('plants')
    .where('plant_id', id)
    .update(plant, ['plant_id', 'nickname', 'species', 'h2ofrequency']);
};

const deletePlant = async (plant_id) => {
  return db('plants').where('plant_id', plant_id).del();
};

module.exports = {
  getPlants,
  getPlantById,
  getPlantsByUserId,
  createPlant,
  updatePlant,
  deletePlant,
};
