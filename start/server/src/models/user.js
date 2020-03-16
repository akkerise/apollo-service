const mongoose = require('mongoose'),
{ Schema , SchemaTypes} = mongoose,
bcrypt = require('bcrypt'),
SALT = 10;

const schema = new Schema(
{
  username: {type: String, index: true, unique: true},
  email: {type: String, index: true, unique: true},
  password: String,
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
},  
{ timestamps: true }
);

schema.pre('save', function (next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
})

schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('users', schema);