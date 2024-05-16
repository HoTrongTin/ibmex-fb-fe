"use client";

import api from "@/api";
import { COLOR } from "@/const/color";
import useDevice from "@/hook/useDevice";
import { isUsingMobile } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Rangking = () => {
  const [limit, setLimit] = useState(20);
  const { isMobile } = useDevice();

  const topThreeQuery = useQuery({
    queryKey: ["getRanking", 3],
    queryFn: () => api.getRanking({ limit: 3, offset: 0 }),
  });
  const rankingQuery = useQuery({
    queryKey: ["getRanking", limit],
    queryFn: () => api.getRanking({ limit, offset: 3 }),
  });

  return (
    <div className="flex flex-col">
      <div
        className=""
        style={{
          backgroundColor: COLOR.BLUE,
          borderBottomRightRadius: "35px",
          borderBottomLeftRadius: "35px",
          height: 330,
        }}
      >
        <div className="text-center pb-3 pt-6" style={{ fontSize: 25 }}>
          Bảng xếp hạng
        </div>
        <div className="flex pb-8 p-2">
          <div
            className="flex justify-center flex-col items-center"
            style={{
              width: "30%",
              position: "relative",
              marginTop: 80,
              zoom: isMobile ? 0.9 : 1,
            }}
          >
            <img
              width={100}
              height={100}
              src={"/medal-02.png"}
              alt="ranking-top-2"
            />
            <div className="mt-2">{topThreeQuery.data?.[1]?.user?.name}</div>
            <b style={{ color: COLOR.TEXT_YELLOW }}>
              {topThreeQuery.data?.[1]?.score} điểm
            </b>
          </div>

          <div
            className="flex justify-center flex-col items-center"
            style={{ width: "40%" }}
          >
            <img
              width={150}
              height={150}
              src={"/medal-01.png"}
              alt="ranking-top-1"
            />
            <div className="mt-2">{topThreeQuery.data?.[0]?.user?.name}</div>
            <b style={{ color: COLOR.TEXT_YELLOW }}>
              {topThreeQuery.data?.[0]?.score} điểm
            </b>
          </div>
          <div
            className="flex justify-center flex-col items-center"
            style={{ width: "30%", position: "relative", marginTop: 80 }}
          >
            <img
              width={100}
              height={100}
              src={"/medal-03.png"}
              alt="ranking-top-3"
            />
            <div className="mt-2">{topThreeQuery.data?.[2]?.user?.name}</div>
            <b style={{ color: COLOR.TEXT_YELLOW }}>
              {topThreeQuery.data?.[2]?.score} điểm
            </b>
          </div>
        </div>
      </div>
      <div style={{ height: "calc(100vh - 330px)", overflowY: "auto" }}>
        {rankingQuery.data?.map((item, index) => {
          return (
            <div
              key={`${item.user?.phone}${index}`}
              className="box-shadow flex justify-between items-center m-4 mt-6 p-2 bg-white"
              style={{ borderRadius: 30, zoom: isMobile ? 0.9 : 1 }}
            >
              <div
                className="flex items-center justify-start"
                style={{ flex: 1 }}
              >
                <div
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "#c38c4a",
                    width: 35,
                    height: 35,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                  }}
                  className="mx-3"
                >
                  {index + 4}
                </div>
                <div style={{ fontSize: 13, maxWidth: "50%" }}>
                  {item.user?.name}
                </div>
              </div>
              <div className="flex justify-end">
                {item.possibleGift && (
                  <>
                    <img
                      className="mr-2"
                      width={30}
                      height={30}
                      src={item.possibleGift?.image}
                      alt="possibleGift"
                    />
                    <b className="text-right pr-8" style={{ flex: 1 }}>
                      {item.possibleGift?.name}
                    </b>
                  </>
                )}
                <b style={{ color: COLOR.TEXT_YELLOW }}>{item.score} Điểm</b>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rangking;
