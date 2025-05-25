// src\app\admin\user\edit\[id]
"use client";

import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export default function UserEdit() {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const userData = queryResult?.data?.data;

  // Ambil data role dari backend
  const { selectProps: roleSelectProps } = useSelect({
    resource: "role",
    optionLabel: "role_name",
    optionValue: "role_id",
    defaultValue: userData?.role_id, // Preselect dropdown dengan role sekarang
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ min: 8 }]}
        >
          <Input.Password placeholder="Leave blank to keep current password" />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role_id"
          rules={[{ required: true }]}
        >
          <Select {...roleSelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
}
