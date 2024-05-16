"use client";

import { COLOR } from "@/const/color";
import LocalStore from "@/service/localStore";
import useAuthStore from "@/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { useEffect, useState } from "react";
import GameConfirm from "./GameConfirm";
import GameRules from "./GameRules";
import Private from "./Private";
import Rangking from "./Ranking";
import RankingItem from "./RankingItem";
import RemainGift from "./RemainGift";

const GameDesktop = () => {
  const [iframeWidth, setIframeWidth] = useState<number>();
  const { reset, userInfo } = useAuthStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    setIframeWidth(276 * (window.innerHeight / 414));
  }, []);

  const bgHeight = ((iframeWidth || 0) * 208) / 513;
  console.log("bgHeight: ", bgHeight);

  return (
    <div
      className="flex h-screen"
      style={{ backgroundColor: COLOR.BLUE, overflow: "hidden" }}
    >
      {userInfo && (
        <Button
          danger
          style={{ position: "fixed", left: 10, top: 10 }}
          onClick={() => {
            reset();
            LocalStore.clearStorage();
            queryClient.invalidateQueries();
          }}
        >
          Đăng xuất
        </Button>
      )}

      <img
        width={100}
        style={{ position: "fixed", right: 10, top: 10 }}
        src="/logo.png"
        alt="logo"
      />

      <div style={{ flex: 1 }}>
        <Rangking />
      </div>

      <Private>
        <div style={{ position: "relative" }}>
          <iframe
            id="flappy_bird_iframe"
            style={{ width: iframeWidth, cursor: "pointer" }}
            className="w-full h-screen"
            src="/game-mobile.html"
          />
          <GameConfirm />
        </div>
      </Private>

      <div style={{ width: "30%" }}>
        <div
          className="flex"
          style={{
            flexDirection: "column",
            height: "100%",
            justifyContent: "flex-end",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", top: 20, left: 0 }}>
            <RemainGift />
          </div>
          <div style={{ position: "relative" }}>
            <img
              style={{
                width: "100%",
                position: "absolute",
                left: 0,
                bottom: 100,
                zIndex: 1,
              }}
              src="/img/BG.png"
              alt="bg"
            />
            <div
              style={{
                width: "100%",
                height: ((iframeWidth || 0) * 208) / 513,
                position: "absolute",
                left: 0,
                bottom: 0,
                zIndex: 2,
                display: "flex",
                overflow: "hidden",
              }}
            >
              {[1].map((item) => {
                return (
                  <img
                    key={item}
                    style={{
                      height: "100%",
                    }}
                    src="/img/ground/g1.png"
                    alt="g1"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDesktop;
