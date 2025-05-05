"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export default function RoleEdit() {
  const { formProps, saveButtonProps } = useForm({
    // meta: { method: "put" },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Role Name"}
          name={["role_name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
}
