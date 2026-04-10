import express from 'express';
import { register, login, atualizar} from '../controller/authController.js';
import { autenticarJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register); // Rota publica
router.post('/login', login); // Rota publica

router.put('/atualizar', autenticarJWT, atualizar); // Rota privada

export default router;