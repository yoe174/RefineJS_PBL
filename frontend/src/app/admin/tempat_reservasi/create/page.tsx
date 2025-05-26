"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";
import axios from "axios";

export default function TempatReservasiCreate() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { formProps, form, redirect } = useForm();

  const handleFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("lokasi", values.lokasi);
    formData.append("kapasitas", values.kapasitas || "");
    formData.append("biaya", values.biaya || "");
    formData.append("keterangan", values.keterangan || "");

    const file = values.image?.[0]?.originFileObj;
    if (file) {
      formData.append("image", file);
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tempat_reservasi`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Tempat Reservasi berhasil ditambahkan");
      redirect("list", "tempat_reservasi"); // kembali ke list
    } catch (error: any) {
      message.error("Gagal menambahkan Tempat Reservasi");
      console.error(error);
    }
  };

  const normFile = (e: any) => Array.isArray(e) ? e : e?.fileList;

  return (
    <Create saveButtonProps={{ htmlType: "submit", form: "tempat_reservasi-form" }}>
      <Form
        {...formProps}
        layout="vertical"
        id="tempat_reservasi-form"
        form={form}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Lokasi"
          name="lokasi"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kapasitas"
          name="kapasitas"
          // rules={[{ required: true }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>

        <Form.Item
          label="Biaya"
          name="biaya"
          // rules={[{ required: true }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>

        {/* <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="aktif">Aktif</Select.Option>
            <Select.Option value="arsip">Arsip</Select.Option>
          </Select>
        </Form.Item> */}

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

        <Form.Item
          label="Keterangan"
          name="keterangan"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Create>
  );
}
