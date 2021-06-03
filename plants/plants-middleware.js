const { getPlantById } = require('./plants-model');
//
const checkPlantId = async (req, res, next) => {
  try {
    const plant = await getPlantById(req.params.id);
    if (!plant) {
      res.status(404).json({ message: 'this plant was not found' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkPlantPayload = (req, res, next) => {
  if (!req.body.nickname || !req.body.species || !req.body.h2ofrequency) {
    res.status(400).json({ message: 'please enter info for all fields' });
  } else {
    next();
  }
};

module.exports = { checkPlantId, checkPlantPayload };
