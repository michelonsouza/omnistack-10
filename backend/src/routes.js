const {Router} = require('express');

const routes = new Router();
const DevController = require('./app/controllers/DevController');
const SearchController = require('./app/controllers/SearchController');

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs/:id', DevController.update);
routes.delete('/devs/:id', DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;
