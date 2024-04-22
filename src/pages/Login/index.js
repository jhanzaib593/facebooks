import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import axios from "axios";
import { BASE_URL } from "../../constant";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store";
import toast from "react-hot-toast";
import Register from "../Register/index";
import "./index.css";
import img from "../../assets/img/TPL-Trakker-logo-170-x-43.png";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const onFinish = async (value) => {
    console.log("Success:", value);
    setLoading(true);

    try {
      const { data } = await axios.post(`${BASE_URL}/api/login`, {
        email: value.email,
        password: value.password,
      });

      if (data.success) {
        localStorage.setItem("soical_user", data?.user._id);
        dispatch(authActions.login());
        toast.success("User Login Successfully");
        // navigate("/");
        window.location.reload();
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          alert("Unauthorized: Invalid email or password.");
          console.error("if Error response data:", error.response?.data);
          console.error("if Error response status:", error.response?.status);
        } else {
          console.error("Error response data:", error.response?.data);
          console.error("Error response status:", error.response?.status);
          alert("An error occurred during login. Please try again later.");
        }
      } else {
        console.error("Non-Axios error:", error);
        alert("An error occurred during login. Please try again later.");
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="lo_ma">
      <Row className="log_main">
        <Col xs={24} md={24} sm={24} lg={12} className="log_t1">
          <img src={img} alt="facebook" height={106} />
          {/* <h2 className="log_t2">
            Facebook helps you connect and share with the people in your life.
          </h2> */}
        </Col>
        <Col xs={24} md={24} sm={24} lg={12} className="log_form">
          <Form
            name="basic"
            className="form_login"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Email Address" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
              style={{
                width: "100%",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                className="log_btn"
                loading={loading}
              >
                Log in
              </Button>
            </Form.Item>
            <a className="lon_forg" href="/">
              Forgotten password?
            </a>
          </Form>
          <Register />
        </Col>
      </Row>
    </div>
  );
};
export default Login;
