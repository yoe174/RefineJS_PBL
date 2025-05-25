"use client";

import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Checkbox } from "antd";
import { useState } from "react";

export default function TransaksiCreate() {
  const { formProps, saveButtonProps } = useForm();

  // Ambil jenis transaksi dari tabel `jenis_transaksi`
  const { selectProps: jenisSelectProps } = useSelect({
    resource: "jenis_transaksi",
    optionLabel: "jenis_name",
    optionValue: "jenis_transaksi_id",
  });

  const [useHambaAllah, setUseHambaAllah] = useState(false);

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        onValuesChange={(changedValues) => {
          if (changedValues.useHambaAllah !== undefined) {
            setUseHambaAllah(changedValues.useHambaAllah);
            if (changedValues.useHambaAllah) {
              formProps.form?.setFieldsValue({ sumber: "hamba Allah" });
            } else {
              formProps.form?.setFieldsValue({ sumber: "" });
            }
          }
        }}
      >
        <Form.Item
          label="Kategori"
          name="kategori"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: "Pemasukan", value: "pemasukan" },
              { label: "Pengeluaran", value: "pengeluaran" },
            ]}
            placeholder="pilih kategori"
          />
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
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="masukkan nominal"/>
        </Form.Item>

        <Form.Item
          label="Sumber"
          name="sumber"
        >
          <Input disabled={useHambaAllah} placeholder="masukkan sumber"/>
        </Form.Item>

        <Form.Item name="useHambaAllah" valuePropName="checked" noStyle>
          <Checkbox>hamba Allah</Checkbox>
        </Form.Item>

        <Form.Item
          label="Mengetahui"
          name="mengetahui"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Keterangan" name="keterangan">
          <Input.TextArea rows={5} placeholder="masukkan  keterangan"/>
        </Form.Item>

      </Form>
    </Create>
  );
}
