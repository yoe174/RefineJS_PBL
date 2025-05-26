"use client";

import React from "react";
import { List, useTable, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag, Image } from "antd";
import { BaseRecord } from "@refinedev/core";

export default function TempatReservasiList() {
  const { tableProps } = useTable({
    resource: "tempat_reservasi", // sesuaikan dengan route di backend
  });

  return (
    <List>
      <Table {...tableProps} rowKey="informasi_id">
        <Table.Column title="ID" dataIndex="tempat_reservasi_id" key="tempat_reservasi_id" />
        <Table.Column title="lokasi" dataIndex="lokasi" key="lokasi" />
        <Table.Column title="kapasistas" dataIndex="kapasitas" key="kapasitas" />
        <Table.Column
          title="Gambar"
          dataIndex="image"
          key="image"
          render={(image: string) =>
            image ? (
              <Image
                width={100}
                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${image}`}
                alt="Gambar Tempat Reservasi"
              />
            ) : (
              "Tidak ada"
            )
          }
        />
        <Table.Column title="Biaya" dataIndex="biaya" key="biaya" />
        <Table.Column
            title="Aksi"
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
                <Space>
                    <EditButton hideText size="small" recordItemId={record.tempat_reservasi_id} />
                    <ShowButton hideText size="small" recordItemId={record.tempat_reservasi_id} />
                    <DeleteButton hideText size="small" recordItemId={record.tempat_reservasi_id} />
                </Space>
            )}
        />
      </Table>
    </List>
  );
}
