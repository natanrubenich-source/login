import express from 'express';
import { register, login, atualizar} from '../controller/authController.js';
import { autenticarJWT, checkRole} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register); // Rota publica
router.post('/login', login); // Rota publica

router.put('/atualizar', autenticarJWT, checkRole(['admin']), atualizar); // Rota privada e com role

export default router;