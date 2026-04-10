import jwt from 'jsonwebtoken';

export async function autenticarJWT(req, res, next) {
    try {
        const Auth = req.headers['Authorization'];
        // Verificando o Authorization no Header
        if(!Auth || !Auth.startWith['Bearer']){
            return res.status(401).json({erro: 'Token Invalido'});
        }
        // Tratando o Token 
        const Token = Auth.split(' ')[1];

        // Verificar (verify) o token
        const resVerify = jwt.verify(Token, process.env.JWT_SECRET);
        req.body= resVerify;
        next();

    } catch (error) {
        res.status(401).json({ erro: 'Token inválido ou expirado' });
    }
}