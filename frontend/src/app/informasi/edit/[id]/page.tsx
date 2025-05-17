"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { useState, useEffect } from "react";
import axios from "axios";

export default function InformasiEdit() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { formProps, form, queryResult, redirect } = useForm(); // penting: untuk ambil data awal

  const informasi = queryResult?.data?.data;

  useEffect(() => {
    if (informasi?.image) {
      const formattedImage: UploadFile[] = [
        {
          uid: "-1",
          name: informasi.image,
          status: "done" as const,
          url: `${process.env.NEXT_PUBLIC_API_URL}/storage/${informasi.image}`,
        },
      ];
  
      setFileList(formattedImage);
      form.setFieldsValue({ image: formattedImage }); // pastikan image field tetap berupa array
    } else {
      setFileList([]);
      form.setFieldsValue({ image: [] }); // jaga konsistensi, harus tetap array kosong
    }
  }, [informasi, form]);
  

  const handleFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("judul", values.judul);
    formData.append("isi", values.isi);
    formData.append("status", values.status);
    formData.append("keterangan", values.keterangan);

    const imageList = Array.isArray(values.image) ? values.image : [];
    const file = imageList[0]?.originFileObj;

    // Cek apakah Admin benar-benar ingin menghapus gambar
    const isRemovingImage = imageList.length === 0 && informasi?.image;

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
      // Cek keberadaan informasi terlebih dahulu
      if (!informasi) {
        message.error('Data informasi tidak ditemukan');
        return;  // Tidak lanjut jika informasi tidak ada
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/informasi/${informasi.informasi_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response dari server:", response.data);
      message.success("Informasi berhasil diperbarui");
      redirect("list", "informasi");
    } catch (error: any) {
      message.error("Gagal memperbarui informasi");
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
    <Edit saveButtonProps={{ htmlType: "submit", form: "informasi-edit-form" }}>
      <Form
        {...formProps}
        layout="vertical"
        id="informasi-edit-form"
        form={form}
        onFinish={handleFinish}
      >
        <Form.Item label="Judul" name="judul" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Isi" name="isi" rules={[{ required: true }]}>
          <Input.TextArea rows={5} />
        </Form.Item>

        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="aktif">Aktif</Select.Option>
            <Select.Option value="arsip">Arsip</Select.Option>
          </Select>
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
