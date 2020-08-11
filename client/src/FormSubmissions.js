import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getFormFields } from "./actions/getFormFields";
import { getFormInputs } from "./actions/getFormInputs";

export default function FormSubmissions(props) {
  const [formFields, setFormFields] = useState([]);
  const [formInputs, setFormInputs] = useState([]);

  useEffect(() => {
    (async function getFields() {
      const fieldsRes = await getFormFields(props.match.params.FormId);
      setFormFields(fieldsRes.data);
    })();
    (async function getInputs() {
      const inputsRes = await getFormInputs(props.match.params.FormId);
      setFormInputs(inputsRes.data);
    })();
  });

  return (
    <div className="FormsList">
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow key={formFields._id}>
              {formFields.map((field) => {
                return <TableCell>{field.inputName}</TableCell>;
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {formInputs.map((rows) => (
              <TableRow>
                {rows.inputs.map((input) => (
                  <TableCell>{input}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
