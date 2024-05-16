import { isUsingMobile } from "@/utils";
import { useEffect, useState } from "react";

const useDevice = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isUsingMobile()) {
      setIsMobile(true);
    }
  }, []);

  return { isMobile };
};

export default useDevice;
