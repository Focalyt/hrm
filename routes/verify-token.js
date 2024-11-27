const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/verify-token', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const verified = jwt.verify(token, 'Rahul HRM Software'); // Secret key ko apne config me rakhna hoga
    const role = verified.role
    res.json({ role,token
     }); // Return token if valid
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
