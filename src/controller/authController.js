import { createUser, findUserByEmail, updateUserByEmail } from '../models/userModel.js';

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
      return res.status(401).json({ 
        message: 'Credenciais inválidas' });
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

async function atualizar(req, res) {
  try{
    const {email, novoNome, novoEmail, novaSenha} = req.body;
    if (!email || !novoNome || !novoEmail || !novaSenha){
      return res.status(404).json({ 
          message: 'Requisição incompleta!' })
    }
    // Verificando se o usuario existe
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return res.status(400).json({ message: 'Usuario não existe' });
    };
    const updateUser = await updateUserByEmail(email, novoNome, novoEmail, novaSenha)
    return res.status(201).json(updateUser);
    
  }catch (error){
    return res.status(404).json({erro: error})
  }
}
export { register, login , atualizar };