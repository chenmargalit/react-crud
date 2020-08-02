import React from 'react';
import 'antd/dist/antd.css';
import Dashboard from './components/Dashboard';
import 'antd/dist/antd.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Route path='/' exact component={Dashboard} />
      </div>
    </Router>
  );
}

export default App;
