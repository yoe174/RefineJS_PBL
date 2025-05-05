"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";
import axios from "axios";

export default function InformasiCreate() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { formProps, form, redirect } = useForm();

  const handleFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("judul", values.judul);
    formData.append("isi", values.isi);
    formData.append("status", values.status);

    const file = values.image?.[0]?.originFileObj;
    if (file) {
      formData.append("image", file);
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/informasi`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Informasi berhasil ditambahkan");
      redirect("list", "informasi"); // kembali ke list
    } catch (error: any) {
      message.error("Gagal menambahkan informasi");
      console.error(error);
    }
  };

  const normFile = (e: any) => Array.isArray(e) ? e : e?.fileList;

  return (
    <Create saveButtonProps={{ htmlType: "submit", form: "informasi-form" }}>
      <Form
        {...formProps}
        layout="vertical"
        id="informasi-form"
        form={form}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Judul"
          name="judul"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Isi"
          name="isi"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="aktif">Aktif</Select.Option>
            <Select.Option value="arsip">Arsip</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Gambar"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture"
            beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  message.error("Hanya file gambar yang diperbolehkan!");
                }
                return isImage || Upload.LIST_IGNORE; // Tolak jika bukan gambar
              }}
              accept="image/*"
              maxCount={1}
              onChange={({ fileList }) => setFileList(fileList)}
          >
            <Button icon={<UploadOutlined />}>Upload Gambar</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Create>
  );
}
