import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { pool } from './config';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());

const getUsers = (req, res,) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
};

const addUser = (req, res) => {
  const { firstName, lastName, email, password, gender, jobRole, department, address, isAdmin } = req.body

  pool.query('INSERT INTO users (firstName, lastName, email, password, gender, jobRole, department, address, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [firstName, lastName, email, password, gender, jobRole, department, address, isAdmin], error => {
    if (error) {
      throw error
    }
    res.status(201).json({ status: 'success', message: 'User added.' });
  })
};

app.get('/users', getUsers);
app.post('/users', addUser);

module.exports = app;
