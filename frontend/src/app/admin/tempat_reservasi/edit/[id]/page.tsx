"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Upload, Button, message, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TempatReservasiEdit() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { formProps, form, queryResult, redirect } = useForm(); // penting: untuk ambil data awal

  const tempat = queryResult?.data?.data;

  useEffect(() => {
    if (tempat?.image) {
      const formattedImage: UploadFile[] = [
        {
          uid: "-1",
          name: tempat.image,
          status: "done" as const,
          url: `${process.env.NEXT_PUBLIC_API_URL}/storage/${tempat.image}`,
        },
      ];
  
      setFileList(formattedImage);
      form.setFieldsValue({ image: formattedImage }); // pastikan image field tetap berupa array
    } else {
      setFileList([]);
      form.setFieldsValue({ image: [] }); // jaga konsistensi, harus tetap array kosong
    }
  }, [tempat, form]);
  

  const handleFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("lokasi", values.lokasi);
    formData.append("kapasitas", values.kapasitas || "");
    formData.append("biaya", values.biaya || "");
    formData.append("keterangan", values.keterangan || "");

    const imageList = Array.isArray(values.image) ? values.image : [];
    const file = imageList[0]?.originFileObj;

    // Cek apakah Admin benar-benar ingin menghapus gambar
    const isRemovingImage = imageList.length === 0 && tempat?.image;

    if (file) {
      formData.append("image", file);
    } else if (isRemovingImage) {
      formData.append("remove_image", "true");
    }

    if (imageList.length > 0 && imageList[0]?.originFileObj) {
      formData.append("image", imageList[0].originFileObj);
    } else if (imageList.length === 0) {
      formData.append("remove_image", "true");
    }

    formData.append('_method', 'PATCH');

    try {
      // Cek keberadaan tempat_reservasi terlebih dahulu
      if (!tempat) {
        message.error('Data tempat reservasi tidak ditemukan');
        return;  // Tidak lanjut jika tempat reservasi tidak ada
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tempat_reservasi/${tempat.tempat_reservasi_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response dari server:", response.data);
      message.success("Tempat Reservasi berhasil diperbarui");
      redirect("list", "tempat_reservasi");
    } catch (error: any) {
      message.error("Gagal memperbarui Tempat Reservasi");
      console.error(error);
      console.error("Error saat mengirim patch:", error.response ? error.response.data : error.message)
    }
  };

  const normFile = (e: any) => {
    if (!e) return [];
    if (Array.isArray(e)) return e;
    return e.fileList || [];
  };  

  return (
    <Edit saveButtonProps={{ htmlType: "submit", form: "tempat_reservasi-edit-form" }}>
      <Form
        {...formProps}
        layout="vertical"
        id="tempat_reservasi-edit-form"
        form={form}
        onFinish={handleFinish}
      >
        <Form.Item label="Lokasi" name="lokasi" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Kapasitas" name="kapasitas">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Biaya" name="biaya">
          <InputNumber min={0} style={{ width: "100%" }} />
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
        
        <Form.Item
          label="Keterangan"
          name="keterangan"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Edit>
  );
}
