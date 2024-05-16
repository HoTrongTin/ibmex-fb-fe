"use client";

import api from "@/api";
import { COLOR } from "@/const/color";
import { ISession } from "@/model/user";
import LocalStore, { LOCAL_STORAGE } from "@/service/localStore";
import useAuthStore from "@/store/useAuthStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import "./globals.css";
import Head from "next/head";
import { NextSeo } from "next-seo";

const queryClient = new QueryClient();

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { update } = useAuthStore();

  useEffect(() => {
    fetUserData();
  }, []);

  const fetUserData = async () => {
    const session = LocalStore.getItem<ISession>(LOCAL_STORAGE.SESSION);
    if (!session?.access_token) return;

    const whoamiData = await api.whoami();
    update(whoamiData);
    LocalStore.setItem(LOCAL_STORAGE.USER_INFO, whoamiData);
  };

  return (
    <html lang="en">
      <Head>
        <title>Flapimex Bird - Bay càng lâu nhận quà càng khủng</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=1.1.1" />
        <meta
          name="description"
          content="Tổng giá trị giải thưởng lên tới 100,000,000 triệu đồng"
        />
        <meta property="og:image" content="/og-image.png" />
      </Head>
      <body className="m-auto">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: COLOR.BLUE,
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ConfigProvider>
      </body>
    </html>
  );
};

export default RootLayout;
