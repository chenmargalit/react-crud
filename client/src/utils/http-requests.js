import axios from 'axios';

const ENDPOINT = 'http://localhost:5000/api';

export const createEmployee = async (data) => {
  try {
    await axios.post(`${ENDPOINT}/create`, data);
    return 'user added successfully';
  } catch (e) {
    return e.response.data;
  }
};

export const fetchEmployees = async () => {
  try {
    const employees = await axios.get(`${ENDPOINT}/fetch`);
    return employees.data;
  } catch (e) {
    console.log('problem fetching in client - ', e.response.data);
    return 'problem fetching employees from DB';
  }
};

export const deleteAllFromEmployeesTable = async () => {
  try {
    console.log('delete arrived at http-requests');
    const result = await axios.delete(`${ENDPOINT}/truncate`);
    return result.data;
  } catch (e) {
    console.log('problem deleting employees from DB', e);
    return 'problem deleting employees from DB';
  }
};

export const deleteEmployee = async (id) => {
  try {
    const result = await axios.delete(`${ENDPOINT}/truncate/${id}`, { data: { id } });
    return result.data;
  } catch (e) {
    console.log('problem with deleting one user');
  }
};

export const editEmployee = async (data) => {
  const { id } = data;
  try {
    const result = await axios.put(`${ENDPOINT}/edit/${id}`, { data });
    return result.data;
  } catch (e) {
    console.log('problem with editing an employee', e);
  }
};
