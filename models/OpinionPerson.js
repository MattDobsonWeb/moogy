// user model with schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create opinion schema
const OpinionPersonSchema = new Schema(
  {
    names: [{ type: String }],
    replies: [{ type: String }]
  },
  { timestamps: true }
);

// export model
module.exports = OpinionPerson = mongoose.model(
  'OpinionPerson',
  OpinionPersonSchema
);
