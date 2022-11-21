import { useContext, useState, useCallback, useEffect } from "react";
import { Layout, Grid, Menu, Select } from "antd";
import axios from "axios";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { dispatchContext } from "../Contexts";
import { sendDataAction, sendEditedDataAction } from "../Actions";
import CollectionCreateForm from "./CollectionCreateForm";
import { itemsList } from "../itemsList";
import UserInfo from "./userInfo";
import OrganizationsInfo from "./OrganizationsInfo";
import OrdersInfo from "./OrdersInfo";

import {
  ORDERS_PATH,
  ORGANIZATIONS_PATH,
  PATHS,
  USERS_PATH,
  BASE_URL,
} from "../Constants";

const { Option } = Select;
const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

export default function Home() {
  const screens = useBreakpoint();
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState("/");
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState(null);
  const [selected, setSelected] = useState();
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState([]);

  const dispatch = useContext(dispatchContext);

  const clearHomeState = useCallback((record) => {
    if (record) setRecord(null);
    setOpen(false);
  }, []);

  const getOptions = (data) => {
    return data.map((d) => {
      return (
        <Option key={d.id} value={d.id}>
          {d.name}
        </Option>
      );
    });
  };

  const getData = useCallback(async () => {
    let tempData = [];
    switch (path) {
      case USERS_PATH:
        tempData = await axios
          .get(`${BASE_URL}${ORGANIZATIONS_PATH}`)
          .then((res) => {
            return getOptions(res.data);
          });
        break;
      case ORDERS_PATH:
        tempData = await axios.get(`${BASE_URL}${USERS_PATH}`).then((res) => {
          return getOptions(res.data);
        });
        break;
      default:
        break;
    }
    return tempData;
  }, [path]);

  const handleAddNewItem = useCallback(async () => {
    setData(await getData());
    setOpen(true);
  }, [getData]);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate(ORGANIZATIONS_PATH);
      setPath(ORGANIZATIONS_PATH);
    } else {
      setPath(location.pathname);
    }
    setSelected([`${PATHS[location.pathname].key}`]);
  }, [location.pathname, navigate]);

  const onCreate = async (values) => {
    console.log("Values in onCreate: ", values);
    record
      ? sendEditedDataAction(
          { ...values, id: record.id },
          dispatch,
          path
        ).then(() => clearHomeState(record))
      : sendDataAction(values, dispatch, path).then(() =>
          clearHomeState(record)
        );
  };
  return (
    <div className="Home-div">
      {console.log("Home.jsx:: Record: ", record)}
      <CollectionCreateForm
        record={record}
        open={open}
        onCreate={onCreate}
        onCancel={() => clearHomeState(record)}
        data={data}
        getData={getData}
        setData={setData}
      />
      <Layout
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width="20%"
        >
          <Menu
            theme="dark"
            selectedKeys={selected}
            mode="inline"
            items={itemsList}
          />
        </Sider>

        <Content
          style={{
            width: "80%",
          }}
        >
          <Routes>
            <Route
              path={USERS_PATH}
              element={
                <UserInfo
                  setOpen={setOpen}
                  setRecord={setRecord}
                  handleAddNewItem={handleAddNewItem}
                />
              }
            />
            <Route
              path={ORGANIZATIONS_PATH}
              element={
                <OrganizationsInfo
                  setOpen={setOpen}
                  setRecord={setRecord}
                  handleAddNewItem={handleAddNewItem}
                />
              }
            />
            <Route
              path={ORDERS_PATH}
              element={
                <OrdersInfo
                  setOpen={setOpen}
                  setRecord={setRecord}
                  handleAddNewItem={handleAddNewItem}
                />
              }
            />
          </Routes>
        </Content>
      </Layout>
    </div>
  );
}
