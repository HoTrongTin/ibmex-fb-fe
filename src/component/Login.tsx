"use client";

import api from "@/api";
import LocalStore, { LOCAL_STORAGE } from "@/service/localStore";
import useAuthStore from "@/store/useAuthStore";
import { Button, Form, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const validateMobileNumber = (rule: any, value: any) => {
  const phoneRegExp = /^\d{10}$/;
  if (!value || phoneRegExp.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject("Số điện thoại không đúng định dạng");
};

interface IProps {
  onDone: () => void;
}

const Login = ({ onDone }: IProps) => {
  const [form] = Form.useForm();
  const { update: fetch } = useAuthStore();
  const [messageApi] = message.useMessage();

  const loginMutation = useMutation({
    mutationFn: async (payload) => {
      try {
        const session = await api.login(payload);
        if (session?.access_token) {
          LocalStore.setItem(LOCAL_STORAGE.SESSION, session);
          const userInfo = await api.whoami();
          fetch(userInfo);
          LocalStore.setItem(LOCAL_STORAGE.USER_INFO, userInfo);
          onDone && onDone();
        }
      } catch (error) {
        messageApi.error("Đăng nhập không thành công!");
      }
    },
  });

  const onFinish = async (values: any) => {
    loginMutation.mutate(values);
  };

  return (
    <>
      <h1 className="py-4" style={{ fontSize: 20 }}>
        Vui lòng nhập thông tin để chơi game
      </h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Tên của bạn"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên của bạn!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "E-mail không hợp lệ",
            },
            {
              required: true,
              message: "Vui lòng nhập E-mail của bạn",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại của bạn" },
            { validator: validateMobileNumber },
          ]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout} className="flex justify-center">
          <Button
            className="m-auto"
            type="primary"
            htmlType="submit"
            loading={loginMutation.isPending}
          >
            Bắt đầu chơi
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
