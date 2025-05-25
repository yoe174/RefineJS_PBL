"use client";

import { Show, TextField } from "@refinedev/antd";
import { useShow, useOne } from "@refinedev/core";
import { Typography, Tag} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

const { Title, Paragraph } = Typography;

export default function TransaksiShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: jenis_name } = useOne({
      resource: "jenis_transaksi",
      id: record?.jenis_transaksi_id,
      queryOptions: {
        enabled: !!record?.jenis_transaksi_id, // hanya fetch jika role_id ada
      },
    });

  return (
    <Show isLoading={isLoading} canEdit={false}>
      <Title level={5}>ID</Title>
      <TextField value={record?.transaksi_id} />

      <Title level={5}>Tanggal</Title>
      <TextField value=
        {record?.created_at
        ? dayjs(record.created_at).format("DD MMMM YYYY - HH:mm")
        : "-"}
        >
      </TextField>

      <Title level={5}>Kategori</Title>
      <Tag color={record?.kategori === "pemasukan" ? "green" : "red"}>
        {record?.kategori}
      </Tag>

      <Title level={5}>Jenis Transaksi</Title>
        <Tag color={record?.jenis_transaksi === "rekening" ? "blue" : ""}>
        {jenis_name?.data?.jenis_name}
        
      </Tag>      

      <Title level={5}>Nominal</Title>
      <TextField value={record?.nominal} />

      <Title level={5}>Status</Title>
      <Tag color={record?.status === "valid" ? "yellow" : ""}>
        {record?.status}
      </Tag>

      <Title level={5}>Sumber</Title>
      <TextField value={record?.sumber} />

      <Title level={5}>Mengetahui</Title>
      <TextField value={record?.mengetahui} />
      
      <Title level={5}>Terkahir Update</Title>
      <TextField value=
        {record?.updated_at
        ? dayjs(record.updated_at).format("DD MMMM YYYY - HH:mm")
        : "-"}
        >
      </TextField>

      <Title level={5}>Keterangan</Title>
      <TextField value={record?.keterangan} />

    </Show>
  );
}
