import React, { useState } from "react";
import { addForm } from "./actions/addForm";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function FormBuilder(props) {
  const [fieldLabel, setFieldLabel] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputType, setInputType] = useState("text");
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const types = ["text", "color", "date", "email", "tel", "number"];
  let history = useHistory();

  const onSave = () => {
    console.log(fields);
    (async function addFormFunc() {
      await addForm(formName, fields);
    })();

    history.push("/");
    history.go();
  };

  const onSubmit = (e) => {
    setFields([
      ...fields,
      { fieldLabel: fieldLabel, inputName: inputName, inputType: inputType },
    ]);
    e.preventDefault();
  };

  return (
    <Container fixed>
      <div>
        <form onSubmit={onSubmit}>
          <br></br>
          <label htmlFor="flabel"> field label: </label>

          <input
            required
            type="text"
            id="flabel"
            label="Required"
            value={fieldLabel}
            onChange={(text) => setFieldLabel(text.target.value)}
          />
          <br />

          <label htmlFor="iname">input name: </label>
          <input
            required
            type="text"
            id="iname"
            name="iname"
            value={inputName}
            onChange={(text) => setInputName(text.target.value)}
          />
          <br />

          <Select
            required
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={inputType}
            onChange={(text) => setInputType(text.target.value)}
            label="Type"
          >
            {types.map((type) => (
              <MenuItem value={type}>{type}</MenuItem>
            ))}
          </Select>
          <br></br>

          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
          >
            Add
          </Button>
        </form>
        <br></br>
        <form onSubmit={onSave}>
          <label htmlFor="formname">form name: </label>
          <input
            required
            type="text"
            id="formname"
            name="formname"
            value={formName}
            onChange={(text) => setFormName(text.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </form>
        <br></br>
        {fields.map((field) => (
          <div>
            <TextField
              label={field.fieldLabel}
              name={field.inputName}
              type={field.inputType}
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
