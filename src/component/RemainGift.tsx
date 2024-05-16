"use client";

import api from "@/api";
import { useQuery } from "@tanstack/react-query";

const RemainGift = () => {
  const giftQuery = useQuery({
    queryKey: ["getGift"],
    queryFn: api.getGift,
    refetchInterval: 1000 * 60,
  });

  return (
    <div className="flex p-5" style={{ width: "100%", flexWrap: "wrap" }}>
      {giftQuery.data?.map((item) => {
        return (
          <div
            key={item?.id}
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img width={150} src={item?.image} alt="gifl" />
            {item?.redeemedCount === 0 ? (
              <b>Hết quà</b>
            ) : (
              <b>{item?.redeemedCount} Giải</b>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RemainGift;
