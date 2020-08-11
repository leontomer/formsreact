const router = require("express").Router();
let Field = require("../../models/field.model");
let Form = require("../../models/form.model");
let Inputs = require("../../models/inputs.model");

router.route("/addForm").post(async (req, res) => {
  try {
    const { formName, fields } = req.body;
    const newForm = new Form({ formName: formName });

    for (let i = 0; i < fields.length; i++) {
      const f = new Field(fields[i]);
      await f.save();
      newForm.fields.push(f._id);
    }
    await newForm.save();

    res.json("form added");
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Error: " + err);
  }
});

router.route("/getForms").get(async (req, res) => {
  try {
    forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

// router.route("/getFormName").get(async (req, res) => {
//   try {
//     form = Form.findById(req.query.id);
//     res.json(form);
//   } catch (error) {
//     res.status(400).json("Error: " + error);
//   }
// });

router.route("/getFormName").get((req, res) => {
  Form.findById(req.query.id)
    .then((form) => res.json(form))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getFormInputs").get(async (req, res) => {
  try {
    form = await Form.findById(req.query.id).populate("formInputs");
    res.json(form.formInputs);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.route("/getFormFields").get(async (req, res) => {
  try {
    form = await Form.findById(req.query.id).populate("fields");
    res.json(form.fields);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.route("/addFormInput").post(async (req, res) => {
  try {
    const formName = req.body.inputName;
    const formVal = Object.values(req.body.inputVal);
    const formId = req.body.id;

    const newInput = new Inputs({
      inputs: formVal,
    });
    await newInput.save();

    form = await Form.findById(formId);
    form.formInputs.push(newInput._id);
    await form.save();
    res.json("field input added!");
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
