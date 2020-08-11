const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fieldSchema = new Schema({
  fieldLabel: { type: String },
  inputName: { type: String },
  inputType: { type: String },
});

const Field = mongoose.model("field", fieldSchema);
module.exports = Field;
