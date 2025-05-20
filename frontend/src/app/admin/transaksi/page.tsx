"use client";

import React from "react";
import { List, useTable, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag, Image } from "antd";
import { BaseRecord, useMany } from "@refinedev/core";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

export default function TransaksiList() {
  const { tableProps } = useTable({
    resource: "transaksi", // sesuaikan dengan route backend
  });

  return (
    <List>
        <Table  {...tableProps} rowKey="">
            <Table.Column title="Jenis Transaksi"/>
            <Table.Column title="Saldo"/>
            {/* <Table.Column title="Nama Kegiatan" dataIndex="nama_kegiatan" key="nama_kegiatan" /> */}
        </Table>
        <Table  {...tableProps} rowKey="transaksi_id">
            <Table.Column title="ID" dataIndex="transaksi_id" key="transaksi_id" />
            <Table.Column title="Kategori" dataIndex="kategori" key="kategori" 
              render={(kategori: string) => (
                <Tag color={kategori === "pemasukan" ? "green" : "red"}>{kategori}</Tag>
              )}
            />
            <Table.Column
              title="Jenis"
              dataIndex={["jenis_transaksi", "jenis_name"]}
              key="jenis_transaksi"
              render={(jenis_transaksi: string) => (
                <Tag color={jenis_transaksi == "rekening" ? "blue" : ""}>{jenis_transaksi}</Tag>
              )}
            />
            {/* <Table.Column title="Nominal" dataIndex="nominal" key="nominal" /> */}
            <Table.Column
              title="Nominal"
              dataIndex="nominal"
              key="nominal"
              render={(_, record: BaseRecord) => {
                const symbol = record.kategori === "pemasukan" ? "+  " : "-  ";
                return `${symbol} ${record.nominal.toLocaleString("id-ID")}`;
              }}
            />
            <Table.Column title="Sumber" dataIndex="sumber" key="sumber" />
            <Table.Column title="Mengetahui" dataIndex="mengetahui" key="mengetahui" />
            <Table.Column title="Status" dataIndex="status" key="status" 
              render={(status: string) => (
                <Tag color={status === "valid" ? "yellow" : ""}>{status}</Tag>
              )}
            />
            <Table.Column
              title="Aksi"
              dataIndex="actions"
              render={(_, record: BaseRecord) => (
                <Space>
                {/* <ShowButton hideText size="small" recordItemId={record.transaksi_id} /> */}
                {record.status !== "valid" && (
                  <>
                    <EditButton hideText size="small" recordItemId={record.transaksi_id} />
                    <DeleteButton hideText size="small" recordItemId={record.transaksi_id} />
                  </>
                )}
              </Space>
              )}
            />  
            <Table.Column
              title=""
              dataIndex="actions"
              render={(_, record: BaseRecord) => (
                <Space>
                <ShowButton hideText size="small" recordItemId={record.transaksi_id} />
              </Space>
              )}
            />          
        </Table>
    </List>
  )
}