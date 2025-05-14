"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Upload, DatePicker, TimePicker, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

export default function KegiatanEdit() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { formProps, form, queryResult, redirect } = useForm();

  const kegiatan = queryResult?.data?.data;

  useEffect(() => {
    if (kegiatan?.image) {
      const formattedImage: UploadFile[] = [
        {
          uid: "-1",
          name: kegiatan.image,
          status: "done",
          url: `${process.env.NEXT_PUBLIC_API_URL}/storage/${kegiatan.image}`,
        },
      ];

      setFileList(formattedImage);
      form.setFieldsValue({ image: formattedImage });
    } else {
      setFileList([]);
      form.setFieldsValue({ image: [] });
    }

    if (kegiatan) {
      form.setFieldsValue({
        // tanggal: kegiatan.tanggal ? moment(kegiatan.tanggal) : null,
        // waktu_mulai: kegiatan.waktu_mulai ? moment(kegiatan.waktu_mulai, "HH:mm") : null,
        // waktu_selesai: kegiatan.waktu_selesai ? moment(kegiatan.waktu_selesai, "HH:mm") : null,
        tanggal: dayjs(kegiatan.tanggal),
        waktu_mulai: dayjs(kegiatan.waktu_mulai, "HH:mm"),
        waktu_selesai: dayjs(kegiatan.waktu_selesai, "HH:mm"),
      });
    }
  }, [kegiatan, form]);

  const handleFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("nama_kegiatan", values.nama_kegiatan);
    formData.append("isi", values.isi);
  
    if (values.tanggal) {
    // if (values.tanggal && dayjs.isDayjs(values.tanggal)) {
      // formData.append("tanggal", dayjs(values.tanggal).format("YYYY-MM-DD"));
      formData.append("tanggal", values.tanggal.format("YYYY-MM-DD"));
    }

    if (values.waktu_mulai) {
    // if (values.waktu_mulai && dayjs.isDayjs(values.waktu_mulai)) {
      // formData.append("waktu_mulai", values.waktu_mulai.format("HH:mm"));
      formData.append("waktu_mulai", values.waktu_mulai.format("HH:mm"));
    }
  
    if (values.waktu_selesai) {
    // if (values.waktu_selesai && dayjs.isDayjs(values.waktu_selesai)) {
      // formData.append("waktu_selesai", values.waktu_selesai.format("HH:mm"));
      formData.append("waktu_selesai", values.waktu_selesai.format("HH:mm"));
    }
  
    formData.append("lokasi", values.lokasi);
  
    const imageList = Array.isArray(values.image) ? values.image : [];
    const file = imageList[0]?.originFileObj;
  
    const isRemovingImage = imageList.length === 0 && kegiatan?.image;
  
    if (file) {
      formData.append("image", file);
    } else if (isRemovingImage) {
      formData.append("remove_image", "true");
    }
  
    formData.append("_method", "PATCH");
  
    try {
      if (!kegiatan) {
        message.error("Data kegiatan tidak ditemukan");
        return;
      }
  
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/kegiatan/${kegiatan.kegiatan_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      message.success("Kegiatan berhasil diperbarui");
      redirect("list", "kegiatan");
    } catch (error: any) {
      message.error("Gagal memperbarui kegiatan");
      console.error("Error saat update:", error.response?.data || error.message);
    }
  };
  

  const normFile = (e: any) => {
    if (!e) return [];
    if (Array.isArray(e)) return e;
    return e.fileList || [];
  };

  // const normDayjs = (e: any) => {
  //   return e ? dayjs(e) : null;
  // };
  
  // const normDate = (e: any) => {
  //   if (!e) return null;
  //   return dayjs(e);
  // };
  
  // const normTime = (e: any) => {
  //   if (!e) return null;
  //   return dayjs(e, "HH:mm:ss");
  // };

  return (
    <Edit saveButtonProps={{ htmlType: "submit", form: "kegiatan-edit-form" }}>
      <Form
        {...formProps}
        layout="vertical"
        id="kegiatan-edit-form"
        form={form}
        onFinish={handleFinish}
      >
        <Form.Item label="Nama Kegiatan" name="nama_kegiatan" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Isi" name="isi" rules={[{ required: true }]}>
          <Input.TextArea rows={5} />
        </Form.Item>

        <Form.Item 
          label="Tanggal" name="tanggal" rules={[{ required: true }]}
          // getValueFromEvent={normDate}
          // normalize={normDate}
          >
          <DatePicker style={{ width: "100%" }}/>
        </Form.Item>

        <Form.Item 
          label="Waktu Mulai" name="waktu_mulai"
          // getValueFromEvent={normTime}
          // normalize={normTime}
          >
          <TimePicker style={{ width: "100%" }}/>
        </Form.Item>

        <Form.Item 
          label="Waktu Selesai" name="waktu_selesai"
          // getValueFromEvent={normTime}
          // normalize={normTime}
          >
          <TimePicker style={{ width: "100%" }}/>
        </Form.Item>

        <Form.Item label="Lokasi" name="lokasi" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Gambar"
          name="image"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture"
            fileList={fileList}
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
    </Edit>
  );
}
