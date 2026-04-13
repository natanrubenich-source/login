import db from '../config/db.js';
import bcrypt from 'bcryptjs';

async function createUser(nome, email, senha, role_user) {
  try {
    // Convertendo a senha em Hash
    const senhaHash = await bcrypt.hash(senha, 10);
    const query = `
    INSERT INTO usuarios (nome, email, senha, role_user)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
    const values = [nome, email, senhaHash, role_user];
    const result = await db.query(query, values);
    return result.rows[0];
    
  } catch (error) {
      console.log(error);
      return (error)  
  }
}

async function findUserByEmail(email) {
  try{
    const result = await db.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }
  catch (error) {
    console.log(error);
    return (error)  
  }
}

async function findUserByID(id) {
  try{
    const result = await db.query(
      'SELECT * FROM usuarios WHERE id = $1',
      [id]
    );
    
    return result.rows[0];
  }
  catch (error) {
    console.log(error);
    return (error)  
  }
}

async function updateUserByID(id, novoNome, novoEmail, novaSenha) {
  try {
   const query = `
      UPDATE usuarios 
      SET nome = $1, email = $2, senha = $3 
      WHERE id = $4 
      RETURNING *;
    `;
    const values = [novoNome, novoEmail, novaSenha, id];
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return { message: 'Usuário não encontrado' }
    } 
    delete result.rows[0].senha;
    return result.rows[0];

  } catch (error) {
    console.log(error);
    return (error) 
  }
}
export { createUser, findUserByEmail, updateUserByID, findUserByID};