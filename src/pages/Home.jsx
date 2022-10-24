import { Table, Button, Space } from "antd";
import { useContext } from "react";
import { useState } from "react";
import { stateContext, dispatchContext } from "../Contexts";
import { addItem, deleteItem, editItem } from "../Actions";
import CollectionCreateForm from "./CollectionCreateForm";
import { useCallback } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState(undefined);
  const state = useContext(stateContext);
  const dispatch = useContext(dispatchContext);

  const onCreate = (values) => {
    if (record) {
      dispatch(editItem(values));
      setRecord(undefined);
    } else {
      const length = state.dataSource.length;
      values.id = state.dataSource[length - 1].id + 1;

      values.key = values.id.toString();
      dispatch(addItem(values));
    }
    setOpen(false);
  };

  const deleteData = (data) => {
    dispatch(deleteItem(data.id));
  };

  const handleAddNewItem = useCallback(() => {
    setOpen(true);
  }, []);

  const editData = (data) => {
    handleAddNewItem();
    setRecord(data);
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
          <Button
            onClick={() => {
              deleteData(record);
            }}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="Home-div">
      <div className="Home-add-btn-div">
        <Button
          type="primary"
          className="add-new-btn"
          onClick={handleAddNewItem}
        >
          Add new
        </Button>
      </div>
      <CollectionCreateForm
        record={record}
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Table dataSource={state.dataSource} columns={columns} />
    </div>
  );
}
