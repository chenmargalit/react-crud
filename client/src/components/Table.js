import React from 'react';
import { Table, Popconfirm } from 'antd';
import { deleteEmployee } from '../utils/http-requests';

const showTable = ({ employees, setEmployeeRemoved, parentEdit }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      align: 'center',
      editable: true,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      align: 'center',
    },
    {
      title: 'Israeli ID',
      dataIndex: 'israeli_ID',
      align: 'center',
    },
    {
      title: 'StartDate',
      dataIndex: 'startDate',
      align: 'left',
      align: 'center',
    },
    {
      title: 'Delete',
      dataIndex: 'operation',
      render: (text, record) => (
        <Popconfirm
          title='This will delete the employee, are you sure?'
          onConfirm={() => handleDelete(record.id)}
        >
          <a style={{ color: 'red' }} href='#'>
            Delete
          </a>
        </Popconfirm>
      ),
      align: 'center',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      render: (text, record) => (
        <button
          onClick={() => editDetails(record)}
          style={{ border: 'none', background: 'white', color: '#0099cc' }}
        >
          Edit
        </button>
      ),
      align: 'center',
    },
  ];

  const editDetails = (record) => {
    parentEdit(record);
  };

  const handleDelete = async (id) => {
    const result = await deleteEmployee(id);
    // if (result === 'success') {
    setEmployeeRemoved((prevEmployeeRemoved) => prevEmployeeRemoved - 1);
    // }
  };
  return (
    <Table
      style={{ margin: 20 }}
      columns={columns}
      dataSource={employees}
      bordered
      rowKey={(record) => record.id}
      pagination={false}
      title={() => 'Employees details'}
      footer={() => 'End'}
    />
  );
};

export default showTable;
