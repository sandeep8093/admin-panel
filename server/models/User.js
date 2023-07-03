const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },

    isAdmin: {
      type: Boolean,
      default: true
    },

   
  },
  { timestamps: true },
  { minimize: false }
);

module.exports = mongoose.model('User', userSchema);
