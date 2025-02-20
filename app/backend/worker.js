const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
const SECRET_KEY = process.env.JWT_SECRET;

async function signupUser(req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );
    res.json({ message: 'User Registered Successfully! :)' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ERROR :(" });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    if (result.rows.length === 0)
      return res.status(400).json({ message: 'User Not Found!' });

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: 'Invalid Credentials!' });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: '1h',
    });
    res.json({ message: 'Login Successful, Welcome & Bye! :)' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'ERROR :(' });
  }
}

module.exports = { signupUser, loginUser };
