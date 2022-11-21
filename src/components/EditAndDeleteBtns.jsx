import { Button, Space, Popconfirm } from "antd";
import { sendDeleteDataRequest, getDataById } from "../Actions";
import { dispatchContext } from "../Contexts";
import { useContext } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const editData = async (data, setOpen, setRecord, path) => {
  setOpen(true);
  setRecord(await getDataById(data.id, path));
};

const deleteData = (data, dispatch, path) => {
  sendDeleteDataRequest(data.id, dispatch, path);
};

export const EditAndDeleteBtns = ({ props }) => {
  const dispatch = useContext(dispatchContext);
  const { record, setOpen, setRecord, path } = props;
  return (
    <Space size="middle">
      <Button
        onClick={() => {
          editData(record, setOpen, setRecord, path);
        }}
        icon={<EditOutlined />}
      >
        {/* Edit */}
      </Button>
      <Popconfirm
        placement="top"
        title="Are you sure?"
        onConfirm={() => {
          deleteData(record, dispatch, path);
        }}
        okText="Yes"
        cancelText="No"
      >
        <Button danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </Space>
  );
};
