import express from 'express';
import { register, login, atualizar} from '../controller/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/atualizar', atualizar)
export default router;