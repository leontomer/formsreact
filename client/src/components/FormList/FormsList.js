import React, { useEffect, useState } from "react";
import { getForms } from "./actions/getForms";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import "./styles/formListLoader.css";

function FormsList(props) {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let index = 1;

  useEffect(() => {
    (async function getFormsFunc() {
      const formsRes = await getForms();
      setForms(formsRes.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    })();
  }, [isLoading]);

  const showContent = () => {
    if (isLoading) {
      return (
        <div className="box">
          <CircularProgress />
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/FormBuilder">create new form</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="FormsList">
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Form Id</TableCell>

                    <TableCell align="right">Form Name</TableCell>

                    <TableCell align="right"># Submissions</TableCell>

                    <TableCell align="right">Submit Page </TableCell>

                    <TableCell align="right">Submissions Page</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {forms.map((form) => {
                    return (
                      <TableRow key={form._id}>
                        <TableCell component="th" scope="row">
                          {index++}
                        </TableCell>

                        <TableCell align="right">{form.formName}</TableCell>

                        <TableCell align="right">
                          {form.formInputs.length}
                        </TableCell>

                        <TableCell align="right">
                          <Link
                            to={{
                              pathname: `/FormSubmit/${form._id}`,
                            }}
                          >
                            Add
                          </Link>
                        </TableCell>

                        <TableCell align="right">
                          <Link
                            to={{
                              pathname: `/FormSubmissions/${form._id}`,
                            }}
                          >
                            View
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      );
    }
  };

  return <div>{showContent()}</div>;
}
export default FormsList;
