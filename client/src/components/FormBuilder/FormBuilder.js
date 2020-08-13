import React, { useState } from "react";
import { addForm } from "./actions/FormBuilderActions";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function FormBuilder(props) {
  const [fieldLabel, setFieldLabel] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputType, setInputType] = useState("text");
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const types = ["text", "color", "date", "email", "tel", "number"];
  const history = useHistory();

  const onSave = () => {
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

  const BackToMainPage = () => {
    history.push("/");
    history.go();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100vh",
      }}
    >
      <div>
        <h1>Create a form</h1>
        <div>
          <form onSubmit={onSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
                height: "200px",
              }}
            >
              <div>
                <label htmlFor="flabel"> field label: </label>

                <input
                  required
                  type="text"
                  id="flabel"
                  label="Required"
                  value={fieldLabel}
                  onChange={(text) => setFieldLabel(text.target.value)}
                />
              </div>
              <div>
                <label htmlFor="iname">input name: </label>
                <input
                  required
                  type="text"
                  id="iname"
                  name="iname"
                  value={inputName}
                  onChange={(text) => setInputName(text.target.value)}
                />
              </div>
              <div>
                <Select
                  required
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={inputType}
                  onChange={(text) => setInputType(text.target.value)}
                  label="Type"
                  labelWidth={50}
                  style={{ width: "200px" }}
                >
                  {types.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
              >
                Add
              </Button>
            </div>
          </form>
        </div>
        <div>
          <form onSubmit={onSave}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "100px",
              }}
            >
              <div>
                <label htmlFor="formname">form name: </label>

                <input
                  required
                  type="text"
                  id="formname"
                  name="formname"
                  value={formName}
                  onChange={(text) => setFormName(text.target.value)}
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  type="submit"
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={BackToMainPage}
                >
                  Back
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div>
          {fields.map((field, index) => (
            <div key={index}>
              <TextField
                key={index}
                label={field.fieldLabel}
                name={field.inputName}
                type={field.inputType}
              />

              <Button
                variant="contained"
                style={{ marginTop: "20px" }}
                color="primary"
                size="small"
                type="submit"
                startIcon={<DeleteIcon />}
                onClick={() =>
                  setFields(
                    fields.filter(function (ele) {
                      return ele != field;
                    })
                  )
                }
              ></Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
