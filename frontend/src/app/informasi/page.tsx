"use client";

import React from "react";
import { List, useTable, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag, Image } from "antd";
import { BaseRecord } from "@refinedev/core";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

export default function InformasiList() {
  const { tableProps } = useTable({
    resource: "informasi", // sesuaikan dengan route di backend
  });

  return (
    <List>
      <Table {...tableProps} rowKey="informasi_id">
        <Table.Column title="ID" dataIndex="informasi_id" key="informasi_id" />
        <Table.Column title="Judul" dataIndex="judul" key="judul" />
        <Table.Column
          title="Gambar"
          dataIndex="image"
          key="image"
          render={(image: string) =>
            image ? (
              <Image
                width={100}
                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${image}`}
                alt="Gambar Informasi"
              />
            ) : (
              "Tidak ada"
            )
          }
        />
        <Table.Column
            title="Isi"
            dataIndex="isi"
            key="isi"
            render={(isi: string) =>
                isi.length > 100 ? isi.slice(0, 100) + "..." : isi
            }
        />
        <Table.Column 
            title="Dibuat" 
            dataIndex="created_at" 
            key="created_at" 
            render={(createdAt: string) =>
                dayjs(createdAt).format("DD MMMM YYYY - HH:mm")
            }
        />
        <Table.Column title="Status" dataIndex="status" key="status" 
          render={(status: string) => (
            <Tag color={status === "aktif" ? "green" : "red"}>{status}</Tag>
          )}
        />
        <Table.Column
            title="Aksi"
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
                <Space>
                    <EditButton hideText size="small" recordItemId={record.informasi_id} />
                    <ShowButton hideText size="small" recordItemId={record.informasi_id} />
                    <DeleteButton hideText size="small" recordItemId={record.informasi_id} />
                </Space>
            )}
        />
      </Table>
    </List>
  );
}
