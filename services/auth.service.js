const config = require("../auth.config")
const UserModel = require('../models/user.model')
// const UserModel = db.user
// const Role = db.role

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")
const { request } = require('express')

exports.signup = async function (req, res) {
  if (req.body.email && req.body.password && req.body.name, req.body.role  ) {
    const existingUser = await UserModel.findOne({ email: req.body.email })
    if (!existingUser) {
      try {
        const { email, password, name, role } = req.body
        const user = new UserModel({ email, password, name, role})
        user.password = bcrypt.hashSync(req.body.password, 10)
        const data = await user.save()
        return res.status(200).json({
          message: 'Ok',
          data
        })
      } catch (error) {
        return res.status(500).json({
          message: error.message
        })
      }
    } else {
      return res.status(409).json({ message: 'Email telah terdaftar' });
    }
  } else  return res.status(401).json({ message: 'Lengkapi data' });
}

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
}

exports.signin = (req, res) => {
  UserModel.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' })
    }
    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      access_token: jwt.sign({ 
        email: user.email, 
        name: user.name,
        id: user._id }, config.secret, { expiresIn: '24h' })
    })
  })
}