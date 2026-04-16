import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, findUserByID, updateUserByID} from '../models/userModel.js';

// Cadastro
async function register(req, res) {
  const { nome, email, senha, role_user } = req.body;
  const new_role_user = role_user.toLowerCase().trim();

  try {
    // Verifica de o usuario já existe
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email já existe' });
    }
    // Caso nao exista, ele cria um novo usuário
    const user = await createUser(nome, email, senha, new_role_user);
    delete user.senha;

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Login
async function login(req, res) {  
  const { email, senha } = req.body;

  try {
    const user = await findUserByEmail(email);
    const comparandoHash = bcrypt.compare(senha, user.senha)
    if (!comparandoHash) {
      return res.status(401).json({ 
        message: 'Credenciais inválidas' });
    };
    delete user.senha;
    // Assinando o token
    const userToken = jwt.sign(
      user, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN},
    );

    res.json({token: userToken, user: user});
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function atualizar(req, res) {
  try{
    const {id, novoNome, novoEmail, novaSenha} = req.body;
    if (!id || !novoNome || !novoEmail || !novaSenha){   
      return res.status(404).json({ 
          message: 'Requisição incompleta!' })
    }
    // Verificando se o usuario existe
    const existingUser = await findUserByID(id);
    if (!existingUser) {
      return res.status(400).json({ message: 'Usuario não existe' });
    };

    const updateUser = await updateUserByID(id, novoNome, novoEmail, novaSenha)
    return res.status(201).json(updateUser);

  }catch (error){
    return res.status(404).json({erro: error})
  }
}

export { register, login , atualizar };