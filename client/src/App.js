import React from "react";
import FormList from "./components/FormList/FormsList";
import FormSubmit from "./components/FormSubmit/FormSubmit";
import FormSubmissions from "./components/FormSubmissions/FormSubmissions";
import FormBuilder from "./components/FormBuilder/FormBuilder";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={FormList} />
        <Route exact path="/FormBuilder" component={FormBuilder} />
        <Route exact path="/FormSubmit/:FormId" component={FormSubmit} />
        <Route
          exact
          path="/FormSubmissions/:FormId"
          component={FormSubmissions}
        />
      </Switch>
    </Router>
  );
}

export default App;
