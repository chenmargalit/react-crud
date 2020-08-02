import React from 'react';
import 'antd/dist/antd.css';
import Dashboard from './components/Dashboard';
// import Navbar from './components/Navbar';
// import Signup from './components/authentication/Signup2';
// import Login from './components/authentication/Login';
// import Home from './components/Home';
import 'antd/dist/antd.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  console.log('app running');
  return (
    <Router>
      <div>
        <Route path='/' exact component={Dashboard} />
      </div>
    </Router>
  );
}

export default App;
