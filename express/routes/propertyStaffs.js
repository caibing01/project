// routes/propertyStaffs.js

const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  const query = 'SELECT name FROM proinfo';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving property staffs:', error);
      res.status(500).send('Internal server error');
    } else {
      const propertyStaffs = results.map(result => result.name);
      res.json(propertyStaffs);
    }
  });
});

module.exports = router;
