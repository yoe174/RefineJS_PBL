// src\app\admin\transaksi
"use client";

import React from "react";
import { List, useTable, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag, Button, message, Card, Col, Row, Statistic, Select } from "antd";

import { BaseRecord, useUpdate, useCustom, CrudFilters } from "@refinedev/core";
import { CheckOutlined, ArrowDownOutlined, ArrowUpOutlined, WalletOutlined, FormOutlined, CreditCardOutlined  } from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  label: dayjs().month(i).format("MMMM"),
  value: i + 1,
}));

const yearOptions = Array.from({ length: 5 }, (_, i) => {
  const year = dayjs().year() - i;
  return { label: year.toString(), value: year };
});

export default function TransaksiList() {
  const [selectedMonth, setSelectedMonth] = React.useState<number | undefined>(undefined);
  const [selectedYear, setSelectedYear] = React.useState<number | undefined>(undefined);
  const [refreshKey, setRefreshKey] = React.useState(0);

  const filters: CrudFilters = [];

  if (selectedMonth) {
    filters.push({ field: "bulan", operator: "eq", value: selectedMonth });
  }
  if (selectedYear) {
    filters.push({ field: "tahun", operator: "eq", value: selectedYear });
  }
  
  const { tableProps } = useTable({
    resource: "transaksi",
    meta: { key: refreshKey },
  });

  const { data: summaryData, isLoading } = useCustom({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/transaksi/summary`,
    method: "get",
    config: {
    query: { meta: { key: refreshKey } },
    },
  });

  const formatRupiah = (value: number) => {
  // return value.toLocaleString("id-ID");
  return `Rp ${value.toLocaleString("id-ID")}`;
};

  const { mutate: update } = useUpdate();

  const handleValidasi = (id: number) => {
    update(
      {
        resource: "transaksi",
        id,
        values: { status: "valid" },
      },
      {
        onSuccess: () => {
          message.success("Transaksi berhasil divalidasi!");
          // refetch(); // refresh tabel
          setRefreshKey(prev => prev + 1); // ini akan trigger fetch ulang
        },
        onError: () => {
          message.error("Gagal memvalidasi transaksi.");
        },
      },
    );
  };

  return (
    <List>
        <Row gutter={16} style={{ marginBottom: "1rem" }}>
          <Col span={24} md={12} lg={8}>
            <Card>
              <Statistic
                title="Jumlah Pemasukan"
                value={formatRupiah(summaryData?.data?.pemasukan ?? 0)}
                prefix={<ArrowDownOutlined style={{ color: "green" }} />}
                valueStyle={{ color: "green" }}
              />
            </Card>
          </Col>

          <Col span={24} md={12} lg={8}>
            <Card>
              <Statistic
                title="Jumlah Pengeluaran"
                value={formatRupiah(summaryData?.data?.pengeluaran ?? 0)}
                prefix={<ArrowUpOutlined style={{ color: "red" }} />}
                valueStyle={{ color: "red" }}
              />
            </Card>
          </Col>

          <Col span={24} md={12} lg={8}>
            <Card>
              <Statistic
                title="Draft"
                value={summaryData?.data?.draft ?? 0}
                prefix={<FormOutlined style={{ color: "" }} />}
              />
            </Card>
          </Col>

          <Col span={24} md={12} lg={8}>
            <Card>
              <Statistic
                title="Rekening"
                value={formatRupiah(summaryData?.data?.rekening ?? 0)}
                prefix={<CreditCardOutlined style={{ color: "blue" }}/>}
              />
            </Card>
          </Col>

          <Col span={24} md={12} lg={8}>
            <Card>
              <Statistic
                title="Tunai"
                value={formatRupiah(summaryData?.data?.tunai ?? 0)}
                prefix={<WalletOutlined />}
              />
            </Card>
          </Col>

          <Col span={24} md={12} lg={8}>
            <Card>
              <Statistic
                title="Total Saldo"
                value={formatRupiah(summaryData?.data?.total_saldo ?? 0)}
                prefix={<WalletOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: "1rem" }}>
        <Col span={24} md={12} lg={6}>
          <Select
            style={{ width: "100%" }}
            placeholder="Pilih Bulan"
            options={monthOptions}
            allowClear
            onChange={(value) => {
              setSelectedMonth(value);
              setRefreshKey((prev) => prev + 1);
            }}
            value={selectedMonth}
          />
        </Col>
        <Col span={24} md={12} lg={6}>
          <Select
            style={{ width: "100%" }}
            placeholder="Pilih Tahun"
            options={yearOptions}
            allowClear
            onChange={(value) => {
              setSelectedYear(value);
              setRefreshKey((prev) => prev + 1);
            }}
            value={selectedYear}
          />
        </Col>
      </Row>

        <Table  {...tableProps} rowKey="transaksi_id">
            <Table.Column title="ID" dataIndex="transaksi_id" key="transaksi_id" />
            <Table.Column 
              title="Tanggal" 
              dataIndex="created_at" 
              key="created_at" 
              render={(createdAt: string) =>
              dayjs(createdAt).format("DD MMMM YYYY - HH:mm")
              }
            />
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
            <Table.Column
              title="Nominal"
              dataIndex="nominal"
              key="nominal"
              render={(value) => formatRupiah(value)}
            />
            <Table.Column title="Sumber" dataIndex="sumber" key="sumber" />
            <Table.Column title="Mengetahui" dataIndex="mengetahui" key="mengetahui" />
            <Table.Column title="Status" dataIndex="status" key="status" 
              render={(status: string) => (
                <Tag color={status === "valid" ? "yellow" : ""}>{status}</Tag>
              )}
            />
            <Table.Column
              title="Validasi"
              key="validasi"
              render={(_, record: BaseRecord) =>
                record.status === "draft" && (
                  <Button
                    icon={<CheckOutlined />}
                    type="primary"
                    size="small"
                    onClick={() => handleValidasi(record.transaksi_id)}
                  />
                )
              }
            />
            <Table.Column
              title="Aksi"
              dataIndex="actions"
              render={(_, record: BaseRecord) => (
                <Space>
                <ShowButton hideText size="small" recordItemId={record.transaksi_id} />
                {record.status !== "valid" && (
                  <>
                    <EditButton hideText size="small" recordItemId={record.transaksi_id} />
                    <DeleteButton hideText size="small" recordItemId={record.transaksi_id} />
                  </>
                )}
              </Space>
              )}
            />  
        </Table>
    </List>
  )
}