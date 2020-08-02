import axios from 'axios';

const ENDPOINT = 'http://localhost:5000/api';

export const createEmployee = async (data) => {
  try {
    await axios.post(`${ENDPOINT}/create`, data);
    return 'user added successfully';
  } catch (e) {
    console.log('hier', e.response);
    return e.response.data;
  }
};

export const fetchEmployees = async () => {
  try {
    const employees = await axios.get(`${ENDPOINT}/fetch`);
    return employees.data;
  } catch (e) {
    return 'problem fetching employees from DB';
  }
};

export const deleteAllFromEmployeesTable = async () => {
  try {
    const result = await axios.delete(`${ENDPOINT}/truncate`);
    return result.data;
  } catch (e) {
    return 'problem deleting employees from DB';
  }
};

export const deleteEmployee = async (id) => {
  try {
    const result = await axios.delete(`${ENDPOINT}/truncate/${id}`, { data: { id } });
    return result.data;
  } catch (e) {
    return 'problem deleting an Employee';
  }
};
