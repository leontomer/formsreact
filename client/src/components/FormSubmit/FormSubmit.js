import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import {
  getFormName,
  getFormFields,
  addFormInput,
} from "./actions/FormSubmitActions";

export default function FormSubmit(props) {
  const [inputName] = useState("");
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState("");
  const [inputVal] = useState({});
  const history = useHistory();

  useEffect(() => {
    (async function getFormNameFunc() {
      const formNameRes = await getFormName(props.match.params.FormId);
      setFormName(formNameRes.data.formName);
    })();
  });

  useEffect(() => {
    getFormFields(props.match.params.FormId).then((res) => {
      setFields(res.data);
      for (let i = 0; i < fields.length; i++) {
        inputVal[fields[i]._id] = "";
      }
    });
  }, []);

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
        <br></br>
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index}>
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
