"use client";

import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Image } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

const { Title, Paragraph } = Typography;

export default function TransaksiShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const getStatusColor = (status: string) => {
    return status === "valid"
      ? "yellow"
      : "default";
  };

  return (
    <Show isLoading={isLoading} canEdit={false}>
      <Title level={5}>ID</Title>
      <TextField value={record?.transaksi_id} />

      <Title level={5}>Nominal</Title>
      <TextField value={record?.nominal} />

      <Title level={5}>Status</Title>
      <TextField value={record?.status} />
      <Tag color={getStatusColor(record?.status)}>{record?.status}</Tag>

      {/* <Title level={5}>Tanggal</Title>
      <TextField
        value={
          record?.tanggal
            ? dayjs(record.tanggal).format("DD MMMM YYYY")
            : "-"
        }
      />

      <Title level={5}>Waktu Mulai</Title>
      <TextField value={record?.waktu_mulai ?? "-"} />

      <Title level={5}>Waktu Selesai</Title>
      <TextField value={record?.waktu_selesai ?? "-"} />

      <Title level={5}>Lokasi</Title>
      <TextField value={record?.lokasi} />

      <Title level={5}>Gambar</Title>
      {record?.image ? (
        <Image
          width={200}
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${record.image}`}
          alt="Gambar Kegiatan"
        />
      ) : (
        <TextField value="Tidak ada gambar" />
      )}

      <Title level={5}>Isi</Title>
      <Paragraph>{record?.isi}</Paragraph>

      <Title level={5}>Dibuat</Title>
      <Paragraph>
        {record?.created_at
          ? dayjs(record.created_at).format("DD MMMM YYYY - HH:mm")
          : "-"}
      </Paragraph>

      <Title level={5}>Terakhir Diperbarui</Title>
      <Paragraph>
        {record?.updated_at
          ? dayjs(record.updated_at).format("DD MMMM YYYY - HH:mm")
          : "-"}
      </Paragraph>

      <Title level={5}>Keterangan</Title>
      <TextField value={record?.keterangan} /> */}
    </Show>
  );
}
