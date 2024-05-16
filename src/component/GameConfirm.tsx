import { COLOR } from "@/const/color";
import useFappyBird from "@/hook/useFlappyBird";
import useScore from "@/hook/useScore";
import useAuthStore from "@/store/useAuthStore";
import { Alert } from "antd";

const GameConfirm = () => {
  const { userInfo } = useAuthStore();
  const { showConfirm, redeemGiftMutation, continuePlay } = useFappyBird();
  const scoreQuery = useScore();
  return (
    <>
      {userInfo?.user?.isRedeemedGift ? (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        >
          <Alert
            message={`Bạn chốt phần quà: ${scoreQuery.data?.possibleGift?.name}`}
            description={`Điểm của bạn sẽ không được tính, Liên hệ đội ngũ IBMEX để được hỗ trợ`}
            type="warning"
            showIcon
          />
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            display: showConfirm ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <>
            <div
              style={{
                backgroundColor: "#fff",
                justifyContent: "center",
                borderRadius: 20,
                width: "90%",
                position: "relative",
                marginBottom: 96,
              }}
            >
              <div
                style={{
                  justifyContent: "center",
                  borderRadius: 20,
                  color: "#000",
                  position: "absolute",
                  bottom: -70,
                  fontSize: 18,
                  left: "50%",
                  width: "100%",
                  transform: "translateX(-50%)",
                }}
              >
                <img
                  width={"100%"}
                  src="/replace-text.png"
                  alt="replace-text"
                />
              </div>
            </div>
            <div className="flex justify-center pb-5">
              <img
                style={
                  redeemGiftMutation.isPending
                    ? { pointerEvents: "none", opacity: 0.7 }
                    : {}
                }
                onClick={() => redeemGiftMutation.mutate()}
                className="mr-7"
                width={"30%"}
                src="/chot-qua.png"
                alt="chot-qua"
              />
              <img
                width={"30%"}
                src="/choi-tiep.png?v=1.1.1"
                alt="choi-tiep"
                onClick={() => continuePlay()}
              />
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default GameConfirm;
