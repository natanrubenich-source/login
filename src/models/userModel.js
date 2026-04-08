import db from '../config/db.js';

async function createUser(nome, email, senha) {
  try {
    const query = `
    INSERT INTO usuarios (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
    const values = [nome, email, senha];
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

async function updateUserByEmail(email, novoNome, novoEmail, novaSenha) {
  try {
   const query = `
      UPDATE usuarios 
      SET nome = $1, email = $2, senha = $3 
      WHERE email = $4 
      RETURNING *;
    `;
    const values = [novoNome, novoEmail, novaSenha, email];
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
export { createUser, findUserByEmail, updateUserByEmail };