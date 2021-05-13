import { Switch, Route } from 'react-router-dom';
import React from 'react';

import Patients from '../pages/patients';
import Patient from '../pages/patient';

const Routes : React.FC = () => {
  return (
      <Switch>
        <Route path="/" exact component={Patients} />
        <Route path="/patient" component={Patient} />
      </Switch>
  );
}

export default Routes;