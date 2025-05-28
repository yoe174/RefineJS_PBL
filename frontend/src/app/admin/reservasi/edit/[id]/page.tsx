// src\app\admin\reservasi\create

"use client";

import { Create, useForm, useSelect } from "@refinedev/antd";
import {
  Form,
  Input,
  Select,
  message,
  InputNumber,
  TimePicker,
  DatePicker,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

export default function ReservasiCreate() {
  const { formProps, form, queryResult, redirect } = useForm({
    resource: "reservasi",
    action: "edit",
  });

  const reservasi = queryResult?.data?.data;

  const { selectProps: tempatSelectProps } = useSelect({
    resource: "tempat_reservasi", // Sesuai route endpoint kamu
    optionLabel: "lokasi", // Nama field yang mau ditampilkan
    optionValue: "tempat_reservasi_id",   // Nama field yang dikirim ke server
  });

  const handleFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("nama_pemesan", values.nama_pemesan);
    formData.append("kontak_pemesan", values.kontak_pemesan);
    formData.append("tempat_reservasi_id", values.tempat_reservasi_id);
    formData.append("nama_acara", values.nama_acara);
    formData.append("tanggal_acara", values.tanggal_acara.format("YYYY-MM-DD"));
    formData.append("waktu_mulai", values.waktu_mulai?.format("HH:mm") ?? "");
    formData.append("waktu_selesai", values.waktu_selesai?.format("HH:mm") ?? "");
    formData.append("jumlah_tamu", values.jumlah_tamu ?? "");
    formData.append("mengetahui", values.mengetahui ?? "");
    formData.append("keterangan", values.keterangan ?? "");

    // try {
    //   await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/reservasi`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   message.success("Reservasi berhasil dibuat");
    //   redirect("list", "reservasi");
    // } catch (error: any) {
    //   message.error("Gagal membuat reservasi");
    //   console.error(error);
    // }

    try {
      if (!reservasi) {
        message.error("Data reservasi tidak ditemukan");
        return;
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/reservasi/${reservasi.reservasi_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Reservasi berhasil diperbarui");
      redirect("list", "reservasi");
    } catch (error) {
      console.error(error);
      message.error("Gagal memperbarui reservasi");
    }
  };

  return (
    <Create saveButtonProps={{ htmlType: "submit", form: "reservasi-form" }}>
      <Form
        {...formProps}
        layout="vertical"
        id="reservasi-form"
        form={form}
        onFinish={handleFinish}
        initialValues={{
          ...reservasi,
          tanggal_acara: reservasi?.tanggal_acara ? dayjs(reservasi.tanggal_acara) : null,
          waktu_mulai: reservasi?.waktu_mulai ? dayjs(reservasi.waktu_mulai, "HH:mm") : null,
          waktu_selesai: reservasi?.waktu_selesai ? dayjs(reservasi.waktu_selesai, "HH:mm") : null,
          // status: reservasi?.status || "dijadwalkan",
        }}
      >
        <Form.Item label="Tanggal" name="tanggal_acara" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Tempat"
          name="tempat_reservasi_id"
          rules={[{ required: true }]}
        >
          <Select {...tempatSelectProps} />
        </Form.Item>

        <Form.Item
          label="Nama Pemesan" name="nama_pemesan" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Kontak Pemesan" name="kontak_pemesan" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Nama Acara" name="nama_acara" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Waktu Mulai" name="waktu_mulai">
          <TimePicker style={{ width: "100%" }} format="HH:mm" />
        </Form.Item>

        <Form.Item label="Waktu Selesai" name="waktu_selesai">
          <TimePicker style={{ width: "100%" }} format="HH:mm" />
        </Form.Item>

        <Form.Item
          label="Jumlah tamu" name="jumlah_tamu" rules={[{ required: false, type:"number" }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Keterangan" name="keterangan">
          <Input.TextArea rows={5} />
        </Form.Item>

      </Form>
    </Create>
  );
}
