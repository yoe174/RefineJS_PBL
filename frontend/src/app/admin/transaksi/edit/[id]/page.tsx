"use client";

import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Checkbox, InputNumber } from "antd";

export default function TransaksiEdit() {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const transaksiData = queryResult?.data?.data;

  // Dropdown untuk jenis_transaksi
  const { selectProps: jenisSelectProps } = useSelect({
    resource: "jenis_transaksi",
    optionLabel: "jenis_name",
    optionValue: "jenis_transaksi_id",
    defaultValue: transaksiData?.jenis_transaksi_id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Kategori"
          name="kategori"
          rules={[{ required: true }]}
        >
          <Select placeholder="pilih kategori">
            <Select.Option value="pemasukan">Pemasukan</Select.Option>
            <Select.Option value="pengeluaran">Pengeluaran</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Jenis Transaksi"
          name="jenis_transaksi_id"
          rules={[{ required: true }]}
        >
          <Select {...jenisSelectProps} placeholder="pilih jenis transaksi"/>
        </Form.Item>

        <Form.Item
          label="Nominal"
          name="nominal"
          rules={[{ required: true}]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="masukkan nominal"/>
        </Form.Item>

        <Form.Item
          label="Sumber"
          name="sumber"
        >
          <Input placeholder="masukkan sumber" />
        </Form.Item>

        <Form.Item name="sumberCheck" valuePropName="checked" noStyle>
          <Checkbox
            onChange={(e) => {
              if (e.target.checked) {
                formProps.form?.setFieldsValue({ sumber: "hamba Allah" });
              } else {
                formProps.form?.setFieldsValue({ sumber: "" });
              }
            }}
            checked={formProps.form?.getFieldValue("sumber") === "hamba Allah"}
            style={{ marginTop: 8 }}
          >
            hamba Allah
          </Checkbox>
        </Form.Item>

        <Form.Item
          label="Mengetahui"
          name="mengetahui"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true }]}
        >
          <Select placeholder="pilih status">
            <Select.Option value="draft">Draft</Select.Option>
            <Select.Option value="valid">Valid</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Keterangan" name="keterangan">
          <Input.TextArea rows={5} placeholder="masukkan keterangan"/>
        </Form.Item>

      </Form>
    </Edit>
  );
}
