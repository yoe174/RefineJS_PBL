// "use client";

// import { Edit, useForm } from "@refinedev/antd";
// import { Form, Input, Select, Upload, message, Button } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { useState } from "react";
// import type { UploadFile } from "antd/es/upload/interface";

// export default function InformasiEdit() {
//     // const [fileList, setFileList] = useState<UploadFile[]>([]);
//   const { formProps, saveButtonProps, setFileList } = useForm();

  
//   const normFile = (e: any) => Array.isArray(e) ? e : e?.fileList;

//   return (
//     <Edit saveButtonProps={saveButtonProps}>
//       <Form {...formProps} layout="vertical">
//         <Form.Item
//           label="Judul"
//           name="judul"
//           rules={[{ required: true, message: "Judul harus diisi" }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Isi"
//           name="isi"
//           rules={[{ required: true, message: "Isi harus diisi" }]}
//         >
//           <Input.TextArea rows={5} />
//         </Form.Item>

//         <Form.Item
//           label="Status"
//           name="status"
//           rules={[{ required: true, message: "Status harus diisi" }]}
//             >
//           <Select>
//             <Select.Option value="aktif">Aktif</Select.Option>
//             <Select.Option value="arsip">Arsip</Select.Option>
//           </Select>
//         </Form.Item>

//         {/* <Form.Item
//           label="gambar"
//           name="image"
//             >
//             <Upload
//             listType="picture"
//             beforeUpload={(file) => {
//                 const isImage = file.type.startsWith("image/");
//                 if (!isImage) {
//                   message.error("Hanya file gambar yang diperbolehkan!");
//                 }
//                 return isImage || Upload.LIST_IGNORE; // Tolak jika bukan gambar
//               }}
//               accept="image/*"
//               maxCount={1}
//               onChange={({ fileList }) => setFileList(fileList)}
//           ></Upload>
//           {/* <Input placeholder="Masukkan path atau URL gambar" /> */}
//         {/* </Form.Item> */} 
//         <Form.Item
//                   label="Gambar"
//                   name="image"
//                   valuePropName="fileList"
//                   getValueFromEvent={normFile}
//                 >
//                   <Upload
//                     listType="picture"
//                     beforeUpload={(file) => {
//                         const isImage = file.type.startsWith("image/");
//                         if (!isImage) {
//                           message.error("Hanya file gambar yang diperbolehkan!");
//                         }
//                         return isImage || Upload.LIST_IGNORE; // Tolak jika bukan gambar
//                       }}
//                       accept="image/*"
//                     //   accept=".jpg,.jpeg,.png"
//                       maxCount={1}
//                       onChange={({ fileList }) => setFileList(fileList)}
//                   >
//                     <Button icon={<UploadOutlined />}>Upload Gambar</Button>
//                   </Upload>
//                 </Form.Item>
//       </Form>
//     </Edit>
//   );
// }
