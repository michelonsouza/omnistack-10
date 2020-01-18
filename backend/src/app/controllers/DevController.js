const DevModel = require('../models/Dev');
const api = require('../../services/api');

const { findConnections, sendMessage } = require('../../websocket');
const parseStringAsArray = require('../../utils/parseStringAsArray');

class Dev {
  async index(req, res) {
    try {
      const devs = await DevModel.find();

      return res.json({data: devs});
    } catch (error) {
      return res.status(404).json({errors: 'Não existem usuários no momento!'});
    }
  }

  async store(req, res) {
    try {
      const {github_username, techs, latitude, longitude} = req.body;
      let dev = await DevModel.findOne({ github_username });

      if (!dev) {
        const {data: response} = await api.get(`/users/${github_username}`);

        const {name = login, avatar_url, bio} = response;
        const techsArray = parseStringAsArray(techs);
        const location = {
          type: 'Point',
          coordinates: [longitude, latitude],
        };

        dev = await DevModel.create({
          github_username,
          name,
          avatar_url,
          bio,
          location,
          techs: techsArray,
        });

        const sendSocketMessageTo = findConnections(
          { latitude, longitude },
          techsArray
        );

        sendMessage(sendSocketMessageTo, 'new-dev', dev);
      }

      return res.json({data: dev});
    } catch (error) {
      return res.json([error]);
    }
  }

  async update(req, res) {
    try {
      const {name, avatar_url, bio, latitude, longitude} = req.body;

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }

      const dev = await DevModel.findByIdAndUpdate(req.params.id, {
        name,
        avatar_url,
        bio,
        location,
      }, {new: true});

      return res.json({data: dev});
    } catch (error) {
      return res.status(404).json({error: 'Dev not found :('});
    }
  }

  async destroy(req, res) {
    try {
      const dev = await DevModel.findByIdAndDelete(req.params.id);

      return res.json({data: dev});
    } catch (error) {
      return res.status(500).json({error: 'Internal server error'});
    }
  }
}

module.exports = new Dev();
