"use client";

import React from "react";
import { List, useTable, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag, Image } from "antd";
import { BaseRecord } from "@refinedev/core";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

export default function TransaksiList() {
  const { tableProps } = useTable({
    resource: "transaksi", // sesuaikan dengan route backend
  });

  return (
    <List>
        <Table  {...tableProps} rowKey="transaksi_id">
            <Table.Column title="Jenis Transaksi"/>
            <Table.Column title="Saldo"/>
            {/* <Table.Column title="Nama Kegiatan" dataIndex="nama_kegiatan" key="nama_kegiatan" /> */}

        </Table>

        <Table  {...tableProps} rowKey="transaksi_id">
            <Table.Column title="ID" dataIndex="transaksi_id" key="transaksi_id" />
            {/* <Table.Column title="Nama Kegiatan" dataIndex="nama_kegiatan" key="nama_kegiatan" /> */}

        </Table>
    </List>
  )
}