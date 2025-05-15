"use client";

import { Edit,useForm } from "@refinedev/antd";
import { Form,Input,DatePicker,TimePicker,Upload,Button,message,Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import type { UploadFile } from "antd/es/upload/interface";

export default function KegiatanEdit() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { formProps, form, queryResult, redirect } = useForm({
    resource: "kegiatan",
    action: "edit",
  });

  const kegiatan = queryResult?.data?.data;

  const handleFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("nama_kegiatan", values.nama_kegiatan);
    formData.append("isi", values.isi);
    formData.append("tanggal", values.tanggal.format("YYYY-MM-DD"));
    formData.append("waktu_mulai", values.waktu_mulai?.format("HH:mm") || "");
    formData.append("waktu_selesai", values.waktu_selesai?.format("HH:mm") || "");
    formData.append("lokasi", values.lokasi);
    formData.append("status", values.status);


    if (values.image?.[0]?.originFileObj) {
      formData.append("image", values.image[0].originFileObj);
    }

    if (!values.image?.length && kegiatan?.image) {
      formData.append("remove_image", "true");
    }

    try {
      if (!kegiatan) {
        message.error("Data kegiatan tidak ditemukan");
        return;
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/kegiatan/${kegiatan.kegiatan_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Kegiatan berhasil diperbarui");
      redirect("list", "kegiatan");
    } catch (error) {
      console.error(error);
      message.error("Gagal memperbarui kegiatan");
    }
  };

  const normFile = (e: any) => Array.isArray(e) ? e : e?.fileList;

  return (
    <Edit saveButtonProps={{ htmlType: "submit", form: "edit-kegiatan-form" }}>
      <Form
        {...formProps}
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        id="edit-kegiatan-form"
        initialValues={{
          ...kegiatan,
          tanggal: kegiatan?.tanggal ? dayjs(kegiatan.tanggal) : null,
          waktu_mulai: kegiatan?.waktu_mulai ? dayjs(kegiatan.waktu_mulai, "HH:mm") : null,
          waktu_selesai: kegiatan?.waktu_selesai ? dayjs(kegiatan.waktu_selesai, "HH:mm") : null,
          status: kegiatan?.status || "dijadwalkan",
          image: kegiatan?.image
            ? [
                {
                  uid: "-1",
                  name: "image.jpg",
                  status: "done",
                  url: `${process.env.NEXT_PUBLIC_API_URL}/storage/${kegiatan.image}`,
                },
              ]
            : [],
        }}
      >
        <Form.Item label="Nama Kegiatan" name="nama_kegiatan" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Isi" name="isi" rules={[{ required: true }]}>
          <Input.TextArea rows={5} />
        </Form.Item>

        <Form.Item label="Tanggal" name="tanggal" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Waktu Mulai" name="waktu_mulai">
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Waktu Selesai" name="waktu_selesai">
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Lokasi" name="lokasi" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Status" name="status" rules={[{ required: true, message: "Status wajib diisi!" }]} >
          <Select>
            <Select.Option value="dijadwalkan">Dijadwalkan</Select.Option>
            <Select.Option value="dilaksanakan">Dilaksanakan</Select.Option>
            <Select.Option value="selesai">Selesai</Select.Option>
            <Select.Option value="dibatalkan">Dibatalkan</Select.Option>
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
            maxCount={1}
            accept="image/*"
            beforeUpload={(file) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                message.error("Hanya file gambar yang diperbolehkan!");
              }
              return isImage || Upload.LIST_IGNORE;
            }}
            defaultFileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
          >
            <Button icon={<UploadOutlined />}>Upload Gambar</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Edit>
  );
}
