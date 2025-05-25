// src\app\admin\user\create
"use client";

import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export default function UserCreate() {
  const { formProps, saveButtonProps } = useForm();

  // Ambil data role untuk dropdown
  const { selectProps: roleSelectProps } = useSelect({
    resource: "role", // Sesuai route endpoint kamu
    optionLabel: "role_name", // Nama field yang mau ditampilkan
    optionValue: "role_id",   // Nama field yang dikirim ke server
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
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
          rules={[{ required: true, min: 8 }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role_id"
          rules={[{ required: true }]}
        >
          <Select {...roleSelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
}
