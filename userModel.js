// models/userModel.js
const db = require('../db');

const createUser = (full_name, email, hashedPassword, phone, callback) => {
  const sql = `INSERT INTO users (full_name, email, password, phone) VALUES (?, ?, ?, ?)`;
  db.query(sql, [full_name, email, hashedPassword, phone], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = `SELECT * FROM users WHERE email = ?`;
  db.query(sql, [email], callback);
};

module.exports = {
  createUser,
  findUserByEmail
};
