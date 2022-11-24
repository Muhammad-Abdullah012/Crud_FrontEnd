import { Form, Input, InputNumber, Select } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function UsersForm({ form, record, orgs }) {
  return (
    <div>
      <Form {...layout} form={form} name="control-hooks">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber min={1} max={200} />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="org_id"
          label="Organization"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>{orgs}</Select>
        </Form.Item>
        <Form.Item name="profession" label="Profession">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
}
