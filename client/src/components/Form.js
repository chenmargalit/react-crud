import React, { useEffect, useState, isValidElement } from 'react';
import { Form, Input, Button } from 'antd';
import {
  createEmployee,
  fetchEmployees,
  deleteAllFromEmployeesTable,
  editEmployee,
} from '../utils/http-requests';

const EmployeesForm = ({ editedEmployee, editMode }) => {
  const [presentForm, setPresentForm] = useState(true);
  const [startDate, setStartDate] = useState();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState();
  const [result, setResult] = useState('');
  const [employees, setEmployees] = useState([]);
  const [employeeAdded, setEmployeeAdded] = useState(0);
  const [employeeRemoved, setEmployeeRemoved] = useState(0);
  const [mysqlId, setMysqlId] = useState('');
  const [israeli_ID, setIsraeli_ID] = useState();

  useEffect(() => {
    async function getEmployees() {
      const employeesList = await fetchEmployees();
      setEmployees(employeesList);
    }
    getEmployees();
  }, [employeeAdded, employeeRemoved, name]);

  const toggleEmployeeAddForm = () => {
    presentForm ? setPresentForm(false) : setPresentForm(true);
  };

  const onFinish = async (values) => {
    if (!editMode) {
      const httpResult = await createEmployee(values);
      console.log('result', httpResult);
      setResult(httpResult);
    }
  };

  const editDetails = () => {
    const data = {
      name: editedEmployee.name,
      department: editedEmployee.department,
      startDate: editedEmployee.startDate,
      israeli_ID: editedEmployee.setIsraeli_ID,
    };

    editEmployee(data);
  };

  const validateId = (rule, value) => {
    if (value.length != 9) {
      return Promise.reject('');
    }
    return Promise.resolve();
  };

  const deleteAll = async () => {
    console.log('delete all');
    const deleteResults = await deleteAllFromEmployeesTable();
    if (deleteResults === 'success') {
      setEmployeeAdded((employeeAdded) => employeeAdded + 1);
    }
    setResult(deleteResults);
  };

  return (
    console.log('name is', name),
    (
      <div>
        <Form name='basic' onFinish={onFinish}>
          <Form.Item
            initialValue={name}
            label='Full Name'
            name='name'
            rules={[{ required: true, message: 'Please provide a Full name' }]}
            onChange={(e) => setName(e.target.value)}
          >
            <Input allowClear value={editedEmployee.name} />
            {/* <Input hidden /> */}
          </Form.Item>
          <Form.Item
            label='Department'
            name='department'
            rules={[{ required: true, message: 'Please provide a department' }]}
            initialValue={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <Input
              placeholder='Please specify the department'
              allowClear
              value={editedEmployee.department}
            />
            <Input hidden />
          </Form.Item>
          <Form.Item
            label='Israeli_id'
            name='israeli_id'
            rules={[
              {
                validator: validateId,
                required: true,
                message: 'Please provide a 9 digits id',
              },
            ]}
            initialValue={israeli_ID}
            onChange={(e) => setIsraeli_ID(e.target.value)}
          >
            <Input
              placeholder='Please specify the id'
              allowClear
              value={editedEmployee.israeli_ID}
            />
            <Input hidden />
          </Form.Item>
          <Form.Item
            label='Start Date'
            name='startDate'
            rules={[{ required: true, message: 'Please provide a start date' }]}
            initialValue={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          >
            <Input
              placeholder='Please specify a the starting date in the form of yyyy/d/m'
              allowClear
              value={editedEmployee.startDate}
            />
            <Input hidden />
          </Form.Item>
          <Form.Item>
            {editMode === false ? (
              <Button size='large' type='primary' htmlType='submit'>
                Add Employee
              </Button>
            ) : (
              <div>
                <Button size='large' onClick={() => editDetails(editedEmployee)}>
                  Edit
                </Button>
              </div>
            )}
            <Button
              danger
              type='primary'
              size='small'
              onClick={deleteAll}
              style={{ float: 'right' }}
            >
              Delete All Employees
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  );
};

export default EmployeesForm;
