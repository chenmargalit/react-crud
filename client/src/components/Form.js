import React, { useEffect, useState, isValidElement } from 'react';
import { Form, Input, Button } from 'antd';
import { createEmployee, deleteAllFromEmployeesTable } from '../utils/http-requests';

const EmployeesForm = ({ setEmployeeAdded }) => {
  const ID_LENGTH = 9;

  const [startDate, setStartDate] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [result, setResult] = useState('');
  const [israeli_ID, setIsraeli_ID] = useState();

  const onFinish = async (values) => {
    // on form submit
    const createEmployeeResult = await createEmployee(values);
    // show server response
    setResult(createEmployeeResult);
    // refresh list
    setEmployeeAdded((employeeAdded) => employeeAdded + 1);
  };

  const deleteAll = async () => {
    // delete everything in table
    const deleteResults = await deleteAllFromEmployeesTable();
    if (deleteResults === 'success') {
      setEmployeeAdded((employeeAdded) => employeeAdded + 1);
    }
    setResult(deleteResults);
  };

  return (
    <div>
      {result ? <h3>{result}</h3> : null}
      <Form name='basic' onFinish={onFinish}>
        <Form.Item
          initialValue={name}
          label='Full Name'
          name='name'
          rules={[
            {
              required: true,
              message: 'Please provide a Full name',
              max: 80,
            },
          ]}
          onChange={(e) => setName(e.target.value)}
        >
          <Input allowClear placeholder='Please specify the full name' />
        </Form.Item>
        <Form.Item
          label='Department'
          name='department'
          rules={[
            {
              required: true,
              message: 'Please provide a department',
              max: 55,
            },
          ]}
          initialValue={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <Input placeholder='Please specify the department' allowClear />
        </Form.Item>
        <Form.Item
          label='Israeli_id'
          name='israeli_id'
          rules={[
            {
              len: ID_LENGTH,
              required: true,
              message: `Please provide a ${ID_LENGTH} digits id`,
            },
          ]}
          initialValue={israeli_ID}
          onChange={(e) => setIsraeli_ID(e.target.value)}
        >
          <Input placeholder='Please specify the id' allowClear type='number' />
        </Form.Item>
        <Form.Item
          label='Start Date'
          name='startDate'
          rules={[{ required: true, message: 'Please provide employee start date' }]}
          initialValue={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        >
          <Input
            placeholder='Please specify a the starting date in the form of yyyy/d/m'
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Button size='large' type='primary' htmlType='submit'>
            Add Employee
          </Button>

          <Button danger type='primary' size='small' onClick={deleteAll} style={{ float: 'right' }}>
            Delete All Employees
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EmployeesForm;
