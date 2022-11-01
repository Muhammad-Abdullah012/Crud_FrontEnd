import { Table, Button, Space, Card } from "antd";
import { useContext, useState, useCallback } from "react";
import { stateContext, dispatchContext } from "../Contexts";
import { Popconfirm } from "antd";
import {
  sendDataAction,
  sendEditedDataAction,
  sendDeleteDataRequest,
  getDataById,
} from "../Actions";
import CollectionCreateForm from "./CollectionCreateForm";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState(null);

  const state = useContext(stateContext);
  const dispatch = useContext(dispatchContext);

  const onCreate = async (values) => {
    record
      ? sendEditedDataAction({ ...values, id: record.id }, dispatch)
      : sendDataAction(values, dispatch);

    setOpen(false);
  };

  const deleteData = (data) => {
    sendDeleteDataRequest(data.id, dispatch);
  };

  const handleAddNewItem = useCallback(() => {
    setOpen(true);
  }, []);

  const editData = async (data) => {
    setOpen(true);
    setRecord(await getDataById(data.id));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Profession",
      dataIndex: "profession",
      key: "profession",
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              editData(record);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            placement="top"
            title="Are you sure?"
            onConfirm={() => {
              deleteData(record);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="Home-div">
      <CollectionCreateForm
        record={record}
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Card
        title="Users Information"
        extra={
          <Button
            type="primary"
            className="add-new-btn"
            onClick={handleAddNewItem}
          >
            Add new
          </Button>
        }
      >
        <Table dataSource={state.dataSource} columns={columns} />
      </Card>
    </div>
  );
}
