import { Form, Input, InputNumber } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function FormComponent(props) {
  return (
    <div>
      <Form {...layout} form={props.form} name="control-hooks">
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
        <Form.Item name="profession" label="Profession">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
}
