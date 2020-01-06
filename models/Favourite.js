// user model with schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create opinion schema
const FavouriteSchema = new Schema(
  {
    values: [{ type: String }],
    replies: [
      {
        message: {
          type: String
        },
        sentiment: {
          type: String
        }
      }
    ]
  },
  { timestamps: true }
);

// export model
module.exports = Favourite = mongoose.model('Favourite', FavouriteSchema);
