"use client";

import { Create, useForm } from "@refinedev/antd";
import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  message,
  TimePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/id";
// import { Calendar } from "@refinedev/antd";
import { Calendar } from "antd";

export default function KegiatanCreate() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { formProps, form, redirect } = useForm();

  const handleFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("nama_kegiatan", values.nama_kegiatan);
    formData.append("isi", values.isi);
    formData.append("tanggal", values.tanggal.format("YYYY-MM-DD"));
    formData.append("waktu_mulai", values.waktu_mulai?.format("HH:mm") ?? "");
    formData.append("waktu_selesai", values.waktu_selesai?.format("HH:mm") ?? "");
    formData.append("lokasi", values.lokasi);
    formData.append("status", values.status);

    const file = values.image?.[0]?.originFileObj;
    if (file) {
      formData.append("image", file);
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/kegiatan`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Kegiatan berhasil ditambahkan");
      redirect("list", "kegiatan");
    } catch (error: any) {
      message.error("Gagal menambahkan kegiatan");
      console.error(error);
    }
  };

  const normFile = (e: any) => Array.isArray(e) ? e : e?.fileList;

  return (
    <Create saveButtonProps={{ htmlType: "submit", form: "kegiatan-form" }}>
      <Form
        {...formProps}
        layout="vertical"
        id="kegiatan-form"
        form={form}
        onFinish={handleFinish}
      >
        <Form.Item label="Nama Kegiatan" name="nama_kegiatan" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Isi" name="isi" rules={[{ required: true }]}>
          <Input.TextArea rows={5} />
        </Form.Item>

        <Form.Item label="Tanggal" name="tanggal" rules={[{ required: true }]}>
          <Calendar />
        </Form.Item>

        <Form.Item label="Waktu Mulai" name="waktu_mulai">
          <TimePicker format="HH:mm" />
        </Form.Item>

        <Form.Item label="Waktu Selesai" name="waktu_selesai">
          <TimePicker format="HH:mm" />
        </Form.Item>

        <Form.Item label="Lokasi" name="lokasi" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {/* <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="dijadwalkan">Dijadwalkan</Select.Option>
            <Select.Option value="dilaksanakan">Dilaksanakan</Select.Option>
            <Select.Option value="selesai">Selesai</Select.Option>
            <Select.Option value="dibatalkan">Dibatalkan</Select.Option>
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
              return isImage || Upload.LIST_IGNORE;
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
