"use client";

import React from "react";
import { List, useTable, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag, Image } from "antd";
import { BaseRecord } from "@refinedev/core";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

export default function KegiatanList() {
  const { tableProps } = useTable({
    resource: "kegiatan",
  });

  return (
    <List>
      <Table {...tableProps} rowKey="kegiatan_id">
        <Table.Column title="ID" dataIndex="kegiatan_id" key="kegiatan_id" />
        <Table.Column title="Nama Kegiatan" dataIndex="nama_kegiatan" key="nama_kegiatan" />
        <Table.Column
          title="Tanggal"
          dataIndex="tanggal"
          key="tanggal"
          render={(tanggal: string) => dayjs(tanggal).format("DD MMMM YYYY")}
        />
        <Table.Column
          title="Waktu"
          key="waktu"
          render={(_, record: BaseRecord) =>
            `${record.waktu_mulai || "-"} s/d ${record.waktu_selesai || "-"}`
          }
        />
        <Table.Column title="Lokasi" dataIndex="lokasi" key="lokasi" />
        <Table.Column
          title="Gambar"
          dataIndex="image"
          key="image"
          render={(image: string) =>
            image ? (
              <Image
                width={100}
                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${image}`}
                alt="Gambar Kegiatan"
              />
            ) : (
              "Tidak ada"
            )
          }
        />
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status: string) => {
            const color =
              status === "dijadwalkan" ? "yellow" :
              status === "dilaksanakan" ? "blue" :
              status === "selesai" ? "green" :
              status === "dibatalkan" ? "red" :
              "gray";

            return <Tag color={color}>{status}</Tag>;
          }}
        />
        <Table.Column
          title="Aksi"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.kegiatan_id} />
              <ShowButton hideText size="small" recordItemId={record.kegiatan_id} />
              <DeleteButton hideText size="small" recordItemId={record.kegiatan_id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
