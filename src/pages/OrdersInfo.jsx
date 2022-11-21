import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Table, Card, Space, Tooltip, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { dispatchContext, stateContext } from "../Contexts";
import {
  filterData,
  openNotification,
  dataLoaded,
  loadingData,
  setOrders,
} from "../Actions";
import { BASE_URL, ORDERS_PATH } from "../Constants";
import { EditAndDeleteBtns } from "../components/EditAndDeleteBtns";
import { SearchBar } from "../components/Search";

export default function OrdersInfo({ setRecord, setOpen, handleAddNewItem }) {
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
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      render: (_, record) => (
        <EditAndDeleteBtns
          props={{
            record,
            setOpen,
            setRecord,
            path: ORDERS_PATH,
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(loadingData());
    axios
      .get(`${BASE_URL}${ORDERS_PATH}`)
      .then((res) => {
        dispatch(dataLoaded());
        if (res.data.length <= 0) {
          dispatch(setOrders(res.data));
          return;
        }
        const data = res.data.map((v) => {
          const obj = { ...v };
          obj.key = obj.id.toString();
          return obj;
        });
        dispatch(setOrders(data));
      })
      .catch((err) => {
        openNotification(
          "error",
          "Error Occured",
          "An Error occured while fetching data!"
        );
        console.error(err);
      });
  }, [dispatch]);

  const onSearch = async (value) => {
    value.length > 0 ? setFilter(true) : setFilter(false);
    await axios
      .get(`${BASE_URL}${ORDERS_PATH}`, {
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
      title="Orders Information"
      loading={state.isLoading}
      bordered={false}
      extra={
        <>
          <Space size="middle">
            <Tooltip title="Search">
              <SearchBar onSearch={onSearch} placeholder="Search Orders Info" />
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
        dataSource={filter ? state.filteredData : state.orders}
        columns={columns}
      />
    </Card>
  );
}
