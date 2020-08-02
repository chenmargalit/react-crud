import React from 'react';
import { Table, Popconfirm } from 'antd';
import { deleteEmployee } from '../utils/http-requests';

const showTable = ({ employees, setEmployeeRemoved }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      align: 'center',
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
  ];

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    setEmployeeRemoved((prevEmployeeRemoved) => prevEmployeeRemoved - 1);
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
