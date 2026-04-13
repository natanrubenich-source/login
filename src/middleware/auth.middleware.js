import jwt from 'jsonwebtoken';

export async function autenticarJWT(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ erro: 'Token não fornecido ou formato inválido' });
        }

        const token = authHeader.split(' ')[1];
        // Verifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();

    } catch (error) {
        return res.status(401).json({ erro: 'Token inválido ou expirado' });
    }
}

export function checkRole(roles) {
    return (req, res, next) => {
        const userRole = req.user.role_user;
        console.log(req.user);
        
        console.log(`\nClient: ${userRole} | Usuario: ${userRole}`);
        
        if (!req.user || !roles.includes(userRole)) {
            return res.status(403).json({ erro: 'Acesso negado: permissão insuficiente' });
        }
        next();
    };
}