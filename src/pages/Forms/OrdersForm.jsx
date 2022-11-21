import { Form, Input, InputNumber, Select } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function OrdersForm({ users, record, form }) {
  return (
    <div>
      <Form {...layout} form={form} name="control-hooks">
        <Form.Item
          // name={record ? "user_name" : "user_id"}
          name="user_id"
          label="User"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>{users}</Select>
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Order Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
}
