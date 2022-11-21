import { Modal, Form } from "antd";
import UsersForm from "./Forms/UsersForm";
import OrganizationsForm from "./Forms/OrganizationsForm";
import OrdersForm from "./Forms/OrdersForm";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ORDERS_PATH, ORGANIZATIONS_PATH, USERS_PATH } from "../Constants";

export default function CollectionCreateForm({
  open,
  onCreate,
  onCancel,
  record,
  data,
  getData,
  setData,
}) {
  const location = useLocation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (record) {
      getData().then((d) => setData(d));
      console.log("Setting values: ", record);
      form.setFieldsValue(record);
    }
    return () => {
      form.resetFields();
    };
  }, [record, form]);

  const cancel = () => {
    form.resetFields();
    onCancel();
  };

  const allDone = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const getForm = () => {
    let formComp;
    switch (location.pathname) {
      case USERS_PATH:
        formComp = <UsersForm record={record} form={form} orgs={data} />;
        break;
      case ORGANIZATIONS_PATH:
        formComp = <OrganizationsForm form={form} />;
        break;
      case ORDERS_PATH:
        formComp = <OrdersForm record={record} form={form} users={data} />;
        break;
      default:
        formComp = <UsersForm form={form} orgs={data} />;
    }
    return formComp;
  };
  return (
    <div>
      <Modal
        open={open}
        title="Enter Data"
        okText={record ? "Confirm" : "Add"}
        cancelText="Cancel"
        destroyOnClose
        onCancel={cancel}
        onOk={allDone}
      >
        {getForm()}
      </Modal>
    </div>
  );
}
