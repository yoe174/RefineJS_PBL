// src/app/user/page.tsx

"use client";

import {
  List,
  EditButton,
  DeleteButton,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { BaseRecord } from "@refinedev/core";
import { useMany } from "@refinedev/core";

export default function UserList() {
  const { tableProps } = useTable({
    resource: "user", // pastikan ini sesuai dengan nama endpoint backend kamu
    syncWithLocation: true,
  });

  // Ambil semua role yang terkait dengan user
  const roleIds = tableProps.dataSource?.map((item) => item.role_id) ?? [];
  const { data: rolesData } = useMany({
    resource: "role",
    ids: roleIds,
    queryOptions: {
      enabled: roleIds.length > 0,
    },
  });

  return (
    <List title="User">
      <Table {...tableProps} rowKey="users">
        <Table.Column dataIndex="user_id" title="ID" />
        <Table.Column
          dataIndex="role_id"
          title="Role"
          render={(roleId: number) =>
            rolesData?.data.find((role) => role.role_id === roleId)?.role_name ?? "-"
          }
        />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column dataIndex="password" title="Password" />
        <Table.Column
          title="Aksi"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.user_id} />
              <ShowButton hideText size="small" recordItemId={record.user_id} />
              <DeleteButton hideText size="small" recordItemId={record.user_id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
