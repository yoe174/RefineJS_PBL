// src/app/role/page.tsx

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

export default function RoleList() {
  const { tableProps } = useTable({
    resource: "role", // pastikan ini sesuai dengan nama endpoint backend kamu
    syncWithLocation: true,
  });

  return (
    <List title="Role">
      <Table {...tableProps} rowKey="role">
        <Table.Column dataIndex="role_id" title="ID" />
        <Table.Column dataIndex="role_name" title="Role Name" />
        <Table.Column
          title="Aksi"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.role_id} />
              <ShowButton hideText size="small" recordItemId={record.role_id} />
              <DeleteButton hideText size="small" recordItemId={record.role_id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
