const DevModel = require('../models/Dev');

const parseStringAsArray = require('../../utils/parseStringAsArray');

class SearchController {
  async index(req, res) {
    try {
      const {latitude, longitude, techs} = req.query;

      const techsArray = parseStringAsArray(techs);

      const devs = await DevModel.find({
        techs: {
          $in: techsArray,
        },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            $maxDistance: 10000,
          },
        },
      });

      return res.json({data: devs});
    } catch (error) {
      return res.status(500).json({error: 'Internal server error'});
    }
  }
}

module.exports = new SearchController();
