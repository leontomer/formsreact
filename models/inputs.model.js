const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inputsSchema = new Schema({
  inputs: [
    {
      type: String,
    },
  ],
});
const Inputs = mongoose.model("inputs", inputsSchema);
module.exports = Inputs;
