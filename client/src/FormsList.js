import React, { useEffect, useState } from "react";
import { getForms } from "./actions/getForms";
import FormBuilder from "./FormBuilder";
import FormSubmit from "./FormSubmit";
import FormSubmissions from "./FormSubmissions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import "./styles/formListLoader.css";

function FormsList(props) {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let index = 1;
  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  //

  // const getforms = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/forms/getForms");
  //     setForms(res.data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getforms();

  //   // axios.get("http://localhost:5000/forms/getForms").then((res) => {
  //   //console.log(res);

  //   // setForms(res.data);
  //   // sleep(500).then(() => {
  //   //   setIsLoading(false);
  //   // });

  //   // if (history) {
  //   //   history.push("/");
  //   //   history.go();
  //   // }
  //   // window.location.reload();
  //   //});
  //   //window.location.reload();
  // }, []);

  //

  useEffect(() => {
    (async function getFormsFunc() {
      const formsRes = await getForms();
      setForms(formsRes.data);
      sleep(500).then(() => {
        setIsLoading(false);
      });
    })();

    // if (history) {
    //   history.push("/");
    //   history.go();
    // }
    // window.location.reload();

    //window.location.reload();
  }, [isLoading]);

  // useEffect(() => {
  //   setForms(forms);
  //   // window.location.reload();
  // }, [forms]);

  const showContent = () => {
    if (isLoading) {
      return (
        <div class="box">
          <CircularProgress />
        </div>
      );
    } else {
      return (
        <Router>
          <div>
            {" "}
            <nav>
              <ul>
                <li>
                  <Link to="/FormBuilder">create new form</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <Switch>
              <Route path="/FormBuilder">
                <FormBuilder />
              </Route>
              <Route path="/FormSubmit/:FormId" component={FormSubmit} />

              <Route
                path="/FormSubmissions/:FormId"
                component={FormSubmissions}
              />

              <Route path="/">
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

                              <TableCell align="right">
                                {form.formName}
                              </TableCell>

                              <TableCell align="right">
                                {form.formInputs.length}
                              </TableCell>

                              <TableCell align="right">
                                {" "}
                                <Link
                                  to={{
                                    pathname: `/FormSubmit/${form._id}`,
                                  }}
                                >
                                  Add
                                </Link>
                              </TableCell>

                              <TableCell align="right">
                                {" "}
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
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
  };

  return <div>{showContent()}</div>;
}
export default FormsList;
