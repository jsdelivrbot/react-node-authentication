const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
})

// on save hook, encrypt password
// before saving
userSchema.pre('save', function (next) {
  const user = this // instance of user model

  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    // hash (encrypt) the password using the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)

      // overwrite plain text password with encrypted pass
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err)

    callback(null, isMatch)
  })
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema)

// Export model
module.exports = ModelClass
