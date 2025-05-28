"use client";

import { Show, TextField } from "@refinedev/antd";
import { useShow, useOne } from "@refinedev/core";
import { Typography, Tag, Image } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

const { Title, Paragraph } = Typography;

export default function ReservasiShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: tempatData } = useOne({
      resource: "tempat_reservasi",
      id: record?.tempat_reservasi_id,
      queryOptions: {
        enabled: !!record?.tempat_reservasi_id, // hanya fetch jika role_id ada
      },
    });

  const getStatusColor = (status: string) => {
    return status === "dijadwalkan"
      ? "yellow"
      : status === "dilaksanakan"
      ? "blue"
      : status === "selesai"
      ? "green"
      : status === "batal"
      ? "red"
      : "default";
  };

  return (
    <Show isLoading={isLoading} canEdit={false}>
      <Title level={5}>ID</Title>
      <TextField value={record?.reservasi_id} />

      <Title level={5}>Tanggal</Title>
      <TextField
        value={
          record?.tanggal_acara
            ? dayjs(record.tanggal_acara).format("DD MMMM YYYY")
            : "-"
        }
      />      

      <Title level={5}>Tempat</Title>
      <TextField value={tempatData?.data?.lokasi || "Memuat..."} />

      <Title level={5}>Status</Title>
      <Tag color={getStatusColor(record?.status_reservasi)}>{record?.status_reservasi}</Tag>    

      <Title level={5}>Nama Pemesan</Title>
      <TextField value={record?.nama_pemesan} />

      <Title level={5}>Kontak Pemesan</Title>
      <TextField value={record?.kontak_pemesan} />

      <Title level={5}>Nama Acara</Title>
      <TextField value={record?.nama_acara} />

      <Title level={5}>Waktu Mulai</Title>
      <TextField value={record?.waktu_mulai} />

      <Title level={5}>Waktu Selesai</Title>
      <TextField value={record?.waktu_selesai} />

      <Title level={5}>Mengetahui</Title>
      <TextField value={record?.mengetahui} />

      <Title level={5}>Keterangan</Title>
      <TextField value={record?.keterangan} />

      <Title level={5}>Keterangan</Title>
      <Paragraph>{record?.keterangan}</Paragraph>

      <Title level={5}>Dibuat</Title>
      <Paragraph>
        {record?.created_at
            ? dayjs(record.created_at).format("DD MMMM YYYY - HH:mm")
            : "-"}
      </Paragraph>

      <Title level={5}>Terakhir Update</Title>
      <Paragraph>
        {record?.created_at
            ? dayjs(record.updated_at).format("DD MMMM YYYY - HH:mm")
            : "-"}
      </Paragraph>
      
    </Show>
  );
}
