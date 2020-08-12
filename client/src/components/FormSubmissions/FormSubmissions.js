import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import { getFormFields, getFormInputs } from "./actions/FormSubmissionsActions";

export default function FormSubmissions(props) {
  const [formFields, setFormFields] = useState([]);
  const [formInputs, setFormInputs] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async function getFields() {
      const fieldsRes = await getFormFields(props.match.params.FormId);
      setFormFields(fieldsRes.data);
    })();
    (async function getInputs() {
      const inputsRes = await getFormInputs(props.match.params.FormId);
      setFormInputs(inputsRes.data);
    })();
  }, []);

  const ReturnToMainPage = () => {
    history.push("/");
    history.go();
  };

  return (
    <div className="FormsList">
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {formFields.map((field, index) => {
                return <TableCell key={index}>{field.inputName}</TableCell>;
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {formInputs.map((rows, index) => (
              <TableRow key={index}>
                {rows.inputs.map((input, index) => (
                  <TableCell key={index}>{input}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={ReturnToMainPage}
          style={{ marginTop: "3vh" }}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
