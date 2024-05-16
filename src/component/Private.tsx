import useAuthStore from "@/store/useAuthStore";
import { Modal } from "antd";
import React, { CSSProperties, HTMLAttributes, ReactChild, useState } from "react";
import Login from "./Login";
interface IProps extends HTMLAttributes<any> {
    children: ReactChild;
    onClick?: () => void;
    style?: CSSProperties;
    className?: string;
}

const Private = (props: IProps) => {
    const { style, children, className, onClick } = props;

    const { userInfo } = useAuthStore();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        if (userInfo) {
            onClick && onClick();
        } else {
            setOpen(true);
        }
    };

    return (
        <>
            <div className={className} style={{ ...style, cursor: "pointer" }}>
                <div onClick={handleClick}>
                    <div
                        style={{
                            pointerEvents: userInfo ? "unset" : "none",
                        }}
                    >
                        <div {...props}>{children}</div>
                    </div>
                </div>
            </div>
            <Modal title={false} open={open} onCancel={() => setOpen(false)} footer={false}>
                <Login onDone={() => setOpen(false)} />
            </Modal>
        </>
    );
};

export default Private;
