import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Mongoose from 'mongoose'
import Form from './Form'

const passwordToken = process.env.privateKey || 'place-holder-key'

if (passwordToken === 'place-holder-key') {
  console.warn(
    '[Warning] Add "privateKey" to your .env in order to register or login users.'
  )
}

const userSchema = new Mongoose.Schema({
  username: 'string',
  password: 'string',
})

userSchema.methods.findForms = async function () {
  const relatedForms = await Form.find({ author: this._id }).exec()
  return relatedForms
}

/**
 * Logs the user in with the password, and if it matches, it returns a token.
 * @param  {The password that was entered.} password
 * @returns {[data, error]}
 */
userSchema.methods.login = async function (password) {
  const passwordIsVerified = this.isPasswordCorrect(password)
  if (passwordIsVerified) {
    const jwtObject = { username: this.username, _id: this._id }
    const token = jwt.sign(jwtObject, passwordToken)

    return [
      {
        token,
        userId: this._id,
      },
      null,
    ]
  }

  return [null, new Error('Token was not verified.')]
}

/**
 * Compares the password, and the salted password.
 * @param  {String} password
 * @returns {Boolean} whether it passed the check or not.
 */
userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compareSync(password, this.password)
}

/**
 * Creates an user, and hashes the password.
 * @param  {String} username
 * @param  {String} password
 * @return {[String, Error]} It returns the token, or the error that was generated from it.
 */
userSchema.statics.createUser = async function (username, password) {
  const results = await this.findOne({
    username,
  })

  // If user exists.
  if (results) {
    return [null, new Error('User already exists.')]
  }

  const createdUser = await this.create({
    username,
    password: bcrypt.hashSync(password, 12),
  })

  const jwtObject = {
    username: createdUser.username,
    _id: createdUser._id,
  }

  const newToken = jwt.sign(jwtObject, passwordToken)

  return [
    {
      token: newToken,
      userId: createdUser._id,
    },
    null,
  ]
}

userSchema.statics.verifyToken = async function (token) {
  if (!jwt.verify(token, passwordToken)) {
    return [null, new Error('Unusable token')]
  }

  const { username, _id } = jwt.decode(token)
  if (!username || !_id) {
    return [null, new Error('Unusable token')]
  }

  const user = await this.findOne({ username })

  if (!user) {
    return [null, new Error(`User ${user} found`)]
  }

  if (user.username !== username || user._id.toString() !== _id.toString()) {
    return [null, new Error(`User ${user} doesn't match data`)]
  }

  return [
    {
      token,
      username,
      _id,
    },
    null,
  ]
}

const User = Mongoose.models.User || Mongoose.model('User', userSchema)

export default User
