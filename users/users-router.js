const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./users-model');
const restrict = require('../middleware/restrict');

const router = express.Router();

router.get('/users', restrict('super_admin'), async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

router.post('/users', async (req, res, next) => {
  try {
    const { username, password, department } = req.body;
    const user = await Users.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: 'Username is already taken',
      });
    }

    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 14),
      department,
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      {
        userID: user.id,
        userRole: user.department,
      },
      process.env.JWT_SECRET
    );

    res.cookie('token', token);
    res.json({
      message: `Welcome ${user.username}`,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/logout', async (req, res, next) => {
  try {
    // req.session.destroy((err) => {
    //   if (err) {
    //     next(err);
    //   } else {
    //     res.status(204).end();
    //   }
    // });

    res.clearCookie('token');
    res.end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
