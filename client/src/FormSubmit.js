import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { getFormName } from "./actions/getFormName";
import { getFormFields } from "./actions/getFormFields";
import { addFormInput } from "./actions/addFormInput";

export default function FormSubmit(props) {
  const inputName = useState("");
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState("");
  const inputVal = useState({});
  let history = useHistory();

  useEffect(() => {
    (async function getName() {
      const formNameRes = await getFormName(props.match.params.FormId);
      setFormName(formNameRes.data.formName);
    })();
  });

  useEffect(() => {
    (async function getFields() {
      const fieldsRes = await getFormFields(props.match.params.FormId);
      setFields(fieldsRes.data);
    })();
  });

  const handleSubmit = () => {
    (async function addInputs() {
      await addFormInput(props.match.params.FormId, inputName, inputVal);
    })();
    history.push("/");
    history.go();
  };
  return (
    <Container fixed>
      <div>
        {formName}
        <br></br>

        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div>
              <label htmlFor="flabel"> {field.inputType}: </label>
              <br />
              <input
                required
                type={field.inputType}
                name={field.inputName}
                value={inputVal[field._id]}
                onChange={(name) => (inputVal[field._id] = name.target.value)}
              ></input>
              <br></br>
            </div>
          ))}
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </form>
      </div>
    </Container>
  );
}
