CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  role_user VARCHAR(10) NOT NULL CHECK (role_user IN ('admin', 'user'))
);