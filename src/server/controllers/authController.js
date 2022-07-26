const { Usuario } = require('../../database/models'),
      bcrypt = require('bcrypt'),
      crypto = require('crypto'),
      mailer = require('../../modules/mailer'),
      twilio = require('../../modules/twilio')
     





module.exports = {

    async Cadastro(req, res) {

        const { nome, email, senha, celular = ''} = req.body

        try {
            if (await Usuario.findOne({ where: { email } })) {

                return res.status(409).send({ message: 'Usuario já Existe' });

            }

            const usuario = await Usuario.create({ nome, email, senha, celular });

            usuario.senha = undefined;

            return res.status(201).send({ message: 'Usuario Criado Com Sucesso' });

        } catch (err) {

            return res.status(400).send({ message: 'Falha ao Criar Usuario' });

        }


    },

    async Login(req, res) {

        const { email, senha } = req.body;

        try {

            const usuario = await Usuario.findOne({ where: { email } })

            if (!usuario) {
                return res.status(400).send({ message: 'Usuario Não Encontrado' })
            }

            if (!await bcrypt.compare(senha, usuario.senha)) {
                return res.status(400).send({ message: 'Senha Incorreta' })
            }

            usuario.senha = undefined;
            usuario.senha_token_reset = undefined;
            usuario.senha_expira_reset = undefined;

            res.status(200).send({usuario});

        } catch (err) {
            return res.status(400).send({ message: 'Falha ao Logar' });
        }
        
    },

    async RecuperarSenha(req, res){

        const { email } = req.body;
        const { _type } = req.query;
    
        try {

            const usuario = await Usuario.findOne({ where: { email } });

            if(!usuario){
                return res.status(400).send({ message: 'Usuario Não Encontrado'})
            }

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await Usuario.update({ senha_token_reset: token, senha_expira_reset: now }, {
                where: {
                    email
                }
            });

            switch (_type){
                case 'whatsapp':
                    twilio.messages 
                    .create({ 
                        body: `Olá ${usuario.nome} Seu Token de alteração de senha é: ${token}`, 
                        from: 'whatsapp:+14155238886',       
                        to: 'whatsapp:+5511942488674' 
                    }) 
                    .then(
                        res.status(200).send({ message: 'Token Gerado Com Sucesso, Verifique Seu Whatsapp'})
                    ) 
                    .done();

                break;
                
                default:
                    mailer.sendMail({
                        to: email,
                        from: 'ImpactusEvents@gmail.com',
                        template: 'auth/forgot_password',
                        subject: 'Alterar Senha',
                        context: { token, nome: usuario.nome },
                    }, (err) => {
        
                        if(err){
                            return res.status(400).send({ message: 'Erro ao Enviar Email, Tente Novamente', err})
                        }
        
                        res.status(200).send({ message: 'Token Gerado Com Sucesso, Verifique Seu Email'})
                    })
                break;
            }

        } catch (err) {
            res.status(400).send({ message: 'Erro Ao Gerar Redefinição De Senha, Tente Novamente'+ err });
        }
    },

    async AlterarSenha(req, res) {
        const { _token } = req.query;
        const { email, senha } = req.body;

        try {

            const usuario = await Usuario.findOne({ where: { email } })


            if(!usuario) {
                return res.status(400).send({ message: 'Usuario Não Encontrado'});
            }

            if( _token !== usuario.senha_token_reset ){
                return res.status(400).send({ message: 'Token Invalido'});
            }

            const now = new Date();

            if( now > usuario.senha_expira_reset){
                return res.status(400).send({ message: 'Token Expirado, Gere Um Novo Token'});
            }


            usuario.senha = senha

            await usuario.save();

            res.status(200).send({ message: 'Senha Alterada Com Sucesso' });
            
        }catch(err) {
            res.status(400).send({ message: 'Erro Ao Alterar Senha, Tente Novamente'+ err });
        }
    }
    
}