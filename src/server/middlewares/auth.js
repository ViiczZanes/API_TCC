module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader) return res.status(401).send({message: 'Nenhum Token Fornecido'});

    const parts = authHeader.split(' ');

    if(!parts.length === 2) return res.status(401).send({message: 'Erro Token'});

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)) return res.status(401).send({message: 'Token Mal Formatado'});

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send({message: 'Token Invalido'});

        req.userID = decoded.id
        
        next();
    } )

}