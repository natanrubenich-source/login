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

export { createUser, findUserByEmail };