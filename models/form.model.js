const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema({
  formName: { type: String },
  fields: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "field",
    },
  ],

  formInputs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "inputs",
    },
  ],
});

const Form = mongoose.model("form", formSchema);
module.exports = Form;
