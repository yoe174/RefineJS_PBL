"use client";

import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Image } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

const { Title, Paragraph } = Typography;

export default function TempatReservasiShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading} canEdit={false}>
      <Title level={5}>ID</Title>
      <TextField value={record?.tempat_reservasi_id} />

      {/* <Title level={5}>Status</Title>
      <Tag color={record?.status === "aktif" ? "green" : "red"}>
        {record?.status}
      </Tag> */}

      <Title level={5}>Lokasi</Title>
      <TextField value={record?.lokasi} />

      <Title level={5}>Kapasitas</Title>
      <TextField value={record?.kapasitas} />

      <Title level={5}>Gambar</Title>
      {record?.image ? (
        <Image
          width={200}
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${record.image}`}
          alt="Gambar Tempat Reservasi"
        />
      ) : (
        <TextField value="Tidak ada gambar" />
      )}

      <Title level={5}>Biaya</Title>
      <TextField value={record?.biaya} />

      <Title level={5}>Keterangan</Title>
      <TextField value={record?.keterangan} />

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
