import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import ShowTable from './Table';
import EmployeesForm from './Form';

import { fetchEmployees } from '../utils/http-requests';

const Dashboard = () => {
  const [presentForm, setPresentForm] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [employeeAdded, setEmployeeAdded] = useState(0);
  const [employeeRemoved, setEmployeeRemoved] = useState(0);

  useEffect(() => {
    // get employees from DB
    async function getEmployees() {
      const employeesList = await fetchEmployees();
      setEmployees(employeesList);
    }
    getEmployees();
  }, [employeeAdded, employeeRemoved]);

  // toggle form
  const toggleEmployeeAddForm = () => {
    presentForm ? setPresentForm(false) : setPresentForm(true);
  };

  return (
    <div style={{ margin: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Welcome to the employees table</h1>
      {presentForm && <EmployeesForm setEmployeeAdded={setEmployeeAdded} />}
      <div style={{ marginTop: '2em' }}></div>
      <div style={{ margin: 20 }}>
        <Button onClick={toggleEmployeeAddForm}>
          {presentForm ? 'Hide form' : 'Add employee'}
        </Button>
      </div>
      <ShowTable employees={employees} setEmployeeRemoved={setEmployeeRemoved} />
    </div>
  );
};

export default Dashboard;
