import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';

import ShowTable from './Table';
import EmployeesForm from './Form';

import {
  createEmployee,
  fetchEmployees,
  deleteAllFromEmployeesTable,
  editEmployee,
} from '../utils/http-requests';

const Dashboard = () => {
  console.log('Dashboard running');
  const [error, setError] = useState('');
  const [presentForm, setPresentForm] = useState(true);
  const [startDate, setStartDate] = useState();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState();
  const [result, setResult] = useState('');
  const [employees, setEmployees] = useState([]);
  const [employeeAdded, setEmployeeAdded] = useState(0);
  const [employeeRemoved, setEmployeeRemoved] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [mysqlId, setMysqlId] = useState('');
  const [editedEmployee, setEditedEmployee] = useState({});
  const [israeli_ID, setIsraeli_ID] = useState();

  useEffect(() => {
    // Create an scoped async function in the hook
    async function getEmployees() {
      const employeesList = await fetchEmployees();
      setEmployees(employeesList);
    }
    getEmployees();
  }, [employeeAdded, employeeRemoved]);

  const editDetails = (record) => {
    console.log('name is 123', record.name);
    setName(record.name);
    setDepartment(department);
    setStartDate(startDate);
    setIsraeli_ID(israeli_ID);
    // const data = { name, department, startDate, israeli_ID, id };
    // editEmployee(data);
  };

  const toggleEmployeeAddForm = () => {
    presentForm ? setPresentForm(false) : setPresentForm(true);
  };

  const deleteAll = async () => {
    console.log('delete all');
    const deleteResults = await deleteAllFromEmployeesTable();
    if (deleteResults === 'success') {
      setEmployeeAdded((employeeAdded) => employeeAdded + 1);
    }
    setResult(deleteResults);
  };

  const edit = (record) => {
    console.log('edit in dashboard activated', record);
    const { name, department, id, startDate, israeli_ID } = record;
    setEditMode(true);
    setMysqlId(id);
    setName(name);
    setDepartment(department);
    setStartDate(startDate);
    setIsraeli_ID(israeli_ID);
    if (!presentForm) {
      setPresentForm(true);
    }
    setEditedEmployee({ ...record });
  };

  const onFinish = async (values) => {
    if (!editMode) {
      const httpResult = await createEmployee(values);
      console.log('result', httpResult);
      setResult(httpResult);
    }
  };

  const validateId = (rule, value) => {
    if (value.length != 9) {
      return Promise.reject('');
    }
    return Promise.resolve();
  };

  // const showForm = () => {
  //   return (
  //     <Form name='basic' onFinish={onFinish}>
  //       <Form.Item
  //         label='Full Name'
  //         name='name'
  //         rules={[{ required: true, message: 'Please provide a Full name' }]}
  //         onChange={(e) => setName(e.target.value)}
  //       >
  //         <Input allowClear value={name} />
  //         <Input value={name} hidden />
  //       </Form.Item>
  //       <Form.Item
  //         label='Department'
  //         name='department'
  //         rules={[{ required: true, message: 'Please provide a department' }]}
  //         initialValue={department}
  //         onChange={(e) => setDepartment(e.target.value)}
  //       >
  //         <Input placeholder='Please specify the department' allowClear value={department} />
  //         <Input value={department} hidden />
  //       </Form.Item>
  //       <Form.Item
  //         label='Israeli_id'
  //         name='israeli_id'
  //         rules={[
  //           {
  //             validator: validateId,
  //             required: true,
  //             message: 'Please provide a 9 digits id',
  //           },
  //         ]}
  //         initialValue={israeli_ID}
  //         onChange={(e) => setIsraeli_ID(e.target.value)}
  //       >
  //         <Input placeholder='Please specify the id' allowClear value={israeli_ID} />
  //         <Input hidden />
  //       </Form.Item>
  //       <Form.Item
  //         label='Start Date'
  //         name='startDate'
  //         rules={[{ required: true, message: 'Please provide a start date' }]}
  //         initialValue={startDate}
  //         onChange={(e) => setStartDate(e.target.value)}
  //       >
  //         <Input
  //           placeholder='Please specify a the starting date in the form of yyyy/d/m'
  //           allowClear
  //           value={startDate}
  //         />
  //       </Form.Item>
  //       <Form.Item>
  //         {!editMode ? (
  //           <Button size='large' type='primary' htmlType='submit'>
  //             Add Employee
  //           </Button>
  //         ) : (
  //           <div>
  //             <Button size='large' onClick={() => editDetails(editedEmployee)}>
  //               Edit
  //             </Button>
  //           </div>
  //         )}
  //         <Button danger type='primary' size='small' onClick={deleteAll} style={{ float: 'right' }}>
  //           Delete All Employees
  //         </Button>
  //       </Form.Item>
  //     </Form>
  //   );
  // };

  return (
    <div style={{ margin: 20 }}>
      <EmployeesForm editMode={editMode} editedEmployee={editedEmployee} />
      <div style={{ marginTop: '2em' }}>
        <h1 style={{ textAlign: 'center' }}>Welcome to the employees table</h1>
      </div>
      <div style={{ margin: 20 }}>
        {result ? result : null}
        {/* {presentForm ? showForm() : null} */}
        {!editMode && (
          <Button onClick={toggleEmployeeAddForm}>
            {presentForm ? 'Hide employee add form' : 'Add employee'}
          </Button>
        )}
      </div>
      <ShowTable employees={employees} setEmployeeRemoved={setEmployeeRemoved} parentEdit={edit} />
    </div>
  );
};

export default Dashboard;
