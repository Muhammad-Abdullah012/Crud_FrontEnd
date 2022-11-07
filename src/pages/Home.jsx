import { Table, Button, Space, Card, Tooltip, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useContext, useState, useCallback } from "react";
import { debounce } from "lodash";
import { stateContext, dispatchContext } from "../Contexts";
import {
  filterData,
  openNotification,
  sendDataAction,
  sendEditedDataAction,
} from "../Actions";
import CollectionCreateForm from "./CollectionCreateForm";
import { EditAndDeleteBtns } from "../components/EditAndDeleteBtns";
import axios from "axios";
const { Search } = Input;

export default function Home() {
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState(null);
  const [filter, setFilter] = useState(false);

  const state = useContext(stateContext);
  const dispatch = useContext(dispatchContext);

  const clearHomeState = useCallback((record) => {
    if (record) setRecord(null);
    setOpen(false);
  }, []);

  const onCreate = async (values) => {
    record
      ? sendEditedDataAction({ ...values, id: record.id }, dispatch).then(() =>
          clearHomeState(record)
        )
      : sendDataAction(values, dispatch).then(() => clearHomeState(record));
  };

  const handleAddNewItem = useCallback(() => {
    setOpen(true);
  }, []);

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
        <EditAndDeleteBtns props={{ record, setOpen, setRecord }} />
      ),
    },
  ];

  const onSearch = async (value) => {
    value.length > 0 ? setFilter(true) : setFilter(false);
    await axios
      .get(`http://localhost:8000/raw/user`, {
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
      });
  };

  const debouncedSearch = debounce(onSearch, 500);
  return (
    <div className="Home-div">
      <CollectionCreateForm
        record={record}
        open={open}
        onCreate={onCreate}
        onCancel={() => clearHomeState(record)}
      />
      <Card
        title="Users Information"
        loading={state.isLoading}
        bordered={false}
        extra={
          <>
            <Space size="middle">
              <Tooltip title="Search">
                <Search
                  placeholder="Search User info"
                  onChange={(e) => debouncedSearch(e.target.value)}
                  onSearch={onSearch}
                  style={{
                    width: 200,
                  }}
                />
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
    </div>
  );
}
