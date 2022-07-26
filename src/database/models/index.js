const usuarioSchema = require('./schemas/Usuario');
const bcrypt = require('bcrypt');

const connection = require('../index');


const Usuario = connection.define('Usuario', usuarioSchema);

Usuario.beforeSave('Encrypt Password', async(usuario) => {
    const hashedPassword = await bcrypt.hash( usuario.senha, 10);
    usuario.senha = hashedPassword
});

module.exports = {
    Usuario
}