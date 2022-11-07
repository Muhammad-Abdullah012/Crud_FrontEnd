import { Button, Space, Popconfirm } from "antd";
import { sendDeleteDataRequest, getDataById } from "../Actions";
import { dispatchContext } from "../Contexts";
import { useContext } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const editData = async (data, setOpen, setRecord) => {
  setOpen(true);
  setRecord(await getDataById(data.id));
};

const deleteData = (data, dispatch) => {
  sendDeleteDataRequest(data.id, dispatch);
};

export const EditAndDeleteBtns = ({ props }) => {
  const dispatch = useContext(dispatchContext);
  const { record, setOpen, setRecord } = props;
  return (
    <Space size="middle">
      <Button
        onClick={() => {
          editData(record, setOpen, setRecord);
        }}
        icon={<EditOutlined />}
      >
        {/* Edit */}
      </Button>
      <Popconfirm
        placement="top"
        title="Are you sure?"
        onConfirm={() => {
          deleteData(record, dispatch);
        }}
        okText="Yes"
        cancelText="No"
      >
        <Button danger icon={<DeleteOutlined />}>
          {/* Delete */}
        </Button>
      </Popconfirm>
    </Space>
  );
};
