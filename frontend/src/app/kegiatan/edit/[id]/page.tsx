"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Upload, Button, message, TimePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Calendar, ConfigProvider } from "antd";
import moment from 'moment';

export default function KegiatanEdit() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { formProps, form, queryResult, redirect } = useForm(); // untuk mengambil data awal

  const kegiatan = queryResult?.data?.data;

  const CustomCalendar = () => {
    return (
      <Calendar
        // value={dayjs()}  // Gunakan dayjs untuk tanggal saat ini
        value={moment()}  // Gunakan moment untuk tanggal saat ini
        onChange={(date) => console.log(date.format('YYYY-MM-DD'))}  // Contoh penggunaan onChange
      />
    );
  };

  // Pastikan `dayjs` digunakan sebagai library default untuk tanggal
// ConfigProvider.config({
//     theme: {
//       primaryColor: '#1890ff',
//     },
//     locale: 'id',  // Ganti dengan locale yang sesuai
//     dateLocale: dayjs,
//   });

  useEffect(() => {
    if (kegiatan?.image) {
      setFileList([
        {
          uid: "-1",
          name: kegiatan.image,
          status: "done",
          url: `${process.env.NEXT_PUBLIC_API_URL}/storage/${kegiatan.image}`,
        },
      ]);
      form.setFieldsValue({
        image: [
          {
            uid: "-1",
            name: kegiatan.image,
            status: "done",
            url: `${process.env.NEXT_PUBLIC_API_URL}/storage/${kegiatan.image}`,
          },
        ],
        nama_kegiatan: kegiatan.nama_kegiatan,
        isi: kegiatan.isi,
        status: kegiatan.status,
        tanggal: dayjs(kegiatan.tanggal),
        waktu_mulai: dayjs(kegiatan.waktu_mulai, "HH:mm"),
        waktu_selesai: dayjs(kegiatan.waktu_selesai, "HH:mm"),
        lokasi: kegiatan.lokasi,
      });
    }
  }, [kegiatan, form]);

  const handleFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("nama_kegiatan", values.nama_kegiatan);
    formData.append("isi", values.isi);
    formData.append("tanggal", values.tanggal.format("YYYY-MM-DD"));
    formData.append("waktu_mulai", values.waktu_mulai?.format("HH:mm") ?? "");
    formData.append("waktu_selesai", values.waktu_selesai?.format("HH:mm") ?? "");
    formData.append("lokasi", values.lokasi);
    formData.append("status", values.status);

    // Menangani file gambar
    const imageList = Array.isArray(values.image) ? values.image : [];
    const file = imageList[0]?.originFileObj;
    if (file) {
      formData.append("image", file);
    } else {
      // Kalau user tidak upload gambar baru, kita anggap dia menghapus gambar
      formData.append("remove_image", "true");
    }

    formData.append("_method", "PATCH");

    try {
      // Cek keberadaan data kegiatan terlebih dahulu
      if (!kegiatan) {
        message.error("Data kegiatan tidak ditemukan");
        return; // Tidak lanjut jika data kegiatan tidak ada
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/kegiatan/${kegiatan.kegiatan_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response dari server:", response.data);
      message.success("Kegiatan berhasil diperbarui");
      redirect("list", "kegiatan");
    } catch (error: any) {
      message.error("Gagal memperbarui kegiatan");
      console.error(error);
      console.error(
        "Error saat mengirim patch:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const normFile = (e: any) => Array.isArray(e) ? e : e?.fileList;

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

        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
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
