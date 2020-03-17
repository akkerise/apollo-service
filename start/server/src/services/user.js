const Base = require('./base')
user = require('../models/user');

class User extends Base {
  constructor(){
    super(user)
  }
}

module.exports = User;