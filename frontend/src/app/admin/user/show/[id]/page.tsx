// src\app\admin\user\show\[id]
"use client";

import { Show, TextField } from "@refinedev/antd";
import { useShow, useOne } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export default function UserShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;
  const record = data?.data;

  // Ambil role_name dari role_id
  const { data: roleData } = useOne({
    resource: "role",
    id: record?.role_id,
    queryOptions: {
      enabled: !!record?.role_id, // hanya fetch jika role_id ada
    },
  });

  return (
    <Show isLoading={isLoading} canEdit={false} canDelete={false}  >
      <Title level={5}>ID</Title>
      <TextField value={record?.user_id} />

      <Title level={5}>Name</Title>
      <TextField value={record?.name} />

      <Title level={5}>Role</Title>
      <TextField value={roleData?.data?.role_name || "Memuat..."} />

      <Title level={5}>Email</Title>
      <TextField value={record?.email} />

      <Title level={5}>Password</Title>
      <TextField value={record?.password} />

      <Title level={5}>Dibuat</Title>
      <TextField value={record?.created_at} />

    </Show>
  );
}
