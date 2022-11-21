import { useContext, useState } from "react";
import axios from "axios";
import { Table, Card, Space, Tooltip, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { dispatchContext, stateContext } from "../Contexts";
import { filterData, openNotification } from "../Actions";
import { BASE_URL, USERS_PATH } from "../Constants";
import { EditAndDeleteBtns } from "../components/EditAndDeleteBtns";
import { SearchBar } from "../components/Search";

export default function UserInfo({ setRecord, setOpen, handleAddNewItem }) {
  const [filter, setFilter] = useState(false);
  const dispatch = useContext(dispatchContext);
  const state = useContext(stateContext);

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
      title: "Organization",
      dataIndex: "org_name",
      key: "organization",
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      render: (_, record) => (
        <EditAndDeleteBtns
          props={{ record, setOpen, setRecord, path: USERS_PATH }}
        />
      ),
    },
  ];

  const onSearch = async (value) => {
    value.length > 0 ? setFilter(true) : setFilter(false);
    await axios
      .get(`${BASE_URL}${USERS_PATH}`, {
        params: {
          searchString: value,
        },
      })
      .then((res) => {
        const data = res.data.map((v) => {
          const obj = { ...v };
          obj.key = obj.id;
          return obj;
        });
        dispatch(filterData(data));
      })
      .catch((err) => {
        openNotification("error", "Error", "Error Occured searching data!");
        console.log(err);
      });
  };

  return (
    <Card
      title="Users Information"
      loading={state.isLoading}
      bordered={false}
      extra={
        <>
          <Space size="middle">
            <Tooltip title="Search">
              <SearchBar onSearch={onSearch} placeholder="Search Users Info" />
            </Tooltip>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="add-new-btn"
              onClick={handleAddNewItem}
            >
              Add new
            </Button>
          </Space>
        </>
      }
    >
      <Table
        dataSource={filter ? state.filteredData : state.dataSource}
        columns={columns}
      />
    </Card>
  );
}
