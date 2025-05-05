"use client";

import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Image } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

const { Title, Paragraph } = Typography;

export default function InformasiShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading} canEdit={false}>
      <Title level={5}>ID</Title>
      <TextField value={record?.informasi_id} />

      <Title level={5}>Status</Title>
      <Tag color={record?.status === "aktif" ? "green" : "red"}>
        {record?.status}
      </Tag>

      <Title level={5}>Judul</Title>
      <TextField value={record?.judul} />

      <Title level={5}>Gambar</Title>
      {record?.image ? (
        <Image
          width={200}
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${record.image}`}
          alt="Gambar Informasi"
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

      <Title level={5}>Terakhir Update</Title>
      <Paragraph>
        {record?.created_at
            ? dayjs(record.updated_at).format("DD MMMM YYYY - HH:mm")
            : "-"}
      </Paragraph>
    </Show>
  );
}
