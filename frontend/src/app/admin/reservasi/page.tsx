"use client";

import React from "react";
import { List, useTable, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { BaseRecord, useMany } from "@refinedev/core";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

export default function ReservasiList() {
  const { tableProps } = useTable({
    resource: "reservasi", // sesuaikan dengan route di backend
  });

  // Ambil semua tempat_reservasi_id dari data reservasi
  const tempatIds = tableProps.dataSource?.map(
    (item) => item.tempat_reservasi_id
  ) ?? [];

  // Ambil data tempat dari resource "tempat_reservasi"
  const { data: tempatData } = useMany({
    resource: "tempat_reservasi",
    ids: tempatIds,
    queryOptions: {
      enabled: tempatIds.length > 0,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="reservasi_id">
        <Table.Column title="ID" dataIndex="reservasi_id" key="reservasi_id" />
        {/* <Table.Column title="Tempat" dataIndex="tempat_reservasi_id" key="tempat_reservasi_id" /> */}
        <Table.Column 
            title="Tanggal" 
            dataIndex="tanggal_acara" 
            key="tanggal_acara" 
            render={(tanggal_acara: string) =>
                dayjs(tanggal_acara).format("DD MMMM YYYY")
            }
        />
        <Table.Column
          title="Tempat"
          dataIndex="tempat_reservasi_id"
          key="tempat_reservasi_id"
          render={(id: number) =>
            tempatData?.data.find((tempat) => tempat.tempat_reservasi_id === id)
              ?.lokasi ?? "-"
          }
        />
        <Table.Column title="Pemesan" dataIndex="nama_pemesan" key="nama_pemesan" />
        <Table.Column title="Acara" dataIndex="nama_acara" key="nama_acara" />
        
        <Table.Column title="Status" dataIndex="status_reservasi" key="status_reservasi" 
          render={(status: string) => {
            const color =
            status === "dijadwalkan" ? "yellow" :
            status === "dilaksanakan" ? "blue" :
            status === "selesai" ? "green" :
            status === "batal" ? "red" :
            "gray";
          
            return <Tag color={color}>{status}</Tag>;
            }}
        />
        <Table.Column
            title="Aksi"
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
                <Space>
                    <EditButton hideText size="small" recordItemId={record.reservasi_id} />
                    <ShowButton hideText size="small" recordItemId={record.reservasi_id} />
                    <DeleteButton hideText size="small" recordItemId={record.reservasi_id} />
                </Space>
            )}
        />
      </Table>
    </List>
  );
}
