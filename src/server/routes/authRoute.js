const authController = require('../controllers/authController');

const  routes  = require('express').Router();

// import all controllers


// Add routes
// routes.get('/', SessionController.store);
routes.post('/cadastro', authController.Cadastro);
routes.post('/', authController.Login);
routes.post('/recuperar', authController.RecuperarSenha);
routes.post('/alterar', authController.AlterarSenha);

// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

module.exports = routes;
