import { createUser, findUserByEmail } from '../models/userModel.js';

// Cadastro
async function register(req, res) {
  const { nome, email, senha } = req.body;

  try {
    // Verifica de o usuario já existe
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email já existe' });
    }
    // Caso nao exista, ele cria um novo usuário
    const user = await createUser(nome, email, senha);
    // Responde a requisição com o novo usuario criado
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

    if (!user || user.senha !== senha) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    delete user.senha;
    
    res.json({
      message: 'Login realizado com sucesso',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { register, login };