import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import { ReptiRomance } from './ReptiRomance';
import 'semantic-ui-css/semantic.min.css'



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ReptiRomance />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
