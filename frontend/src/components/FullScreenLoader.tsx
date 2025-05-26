"use client";

import React from "react";
import { Spin } from "antd";

export const FullScreenLoader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[9999] bg-white flex items-center justify-center">
      <Spin size="large" tip="Memuat halaman..." />
    </div>
  );
};
