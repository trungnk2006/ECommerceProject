const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      productId: {
        type: Number,
      },
      quantity: {
        type: Number,
        default: 1,
      }
    }
  ]
})

const User = mongoose.model('User', userSchema)
module.exports = User