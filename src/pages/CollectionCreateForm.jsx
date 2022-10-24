import { Modal, Form } from "antd";
import FormComponent from "./FormComponent";
import { useEffect } from "react";

export default function CollectionCreateForm({
  open,
  onCreate,
  onCancel,
  record,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (record) {
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

  return (
    <div>
      <Modal
        open={open}
        title="Enter Data"
        okText="Add"
        cancelText="Cancel"
        destroyOnClose
        onCancel={cancel}
        onOk={allDone}
      >
        <FormComponent form={form} />
      </Modal>
    </div>
  );
}
