import React, { useState } from "react";
import { Button, Form, Input, Modal, DatePicker, Radio } from "antd";
import "./index.css";
import dayjs from "dayjs";
import axios from "axios";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { BASE_URL } from "../../constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

dayjs.extend(customParseFormat);

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    setLoading(true);
    form.resetFields();
    console.log("Success:", values);
    try {
      const data = await axios.post(`${BASE_URL}/api/register`, {
        firstname: values.firstname,
        surname: values.surname,
        email: values.email,
        password: values.password,
        dateofbirth: values.dateOfBirth.$d,
        gender: values.gender,
      });

      if (data.data.success) {
        toast.success("User Created Kindly Login");
        // alert("User Register Successfully");
        console.log("data", data);
        setIsModalOpen(false);

        navigate("/");
      } else {
        toast.error("User Already Register");
        console.log("data", data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="reg_main">
      <Button type="primary" onClick={showModal} className="re_btn">
        Create new account
      </Button>
      <Modal title="Sign Up" open={isModalOpen} onCancel={handleCancel} footer>
        <Form
          name="basic"
          form={form}
          layout="inline"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
            paddingTop: "15px",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="firstname"
            style={{
              width: "47%",
            }}
            rules={[
              {
                required: true,
                message: "What's your name?",
              },
            ]}
          >
            <Input placeholder="First name" />
          </Form.Item>
          <Form.Item
            name="surname"
            style={{
              width: "46%",
            }}
            rules={[
              {
                required: true,
                message: "What's your name!",
              },
            ]}
          >
            <Input placeholder="Surname" />
          </Form.Item>
          <Form.Item
            name="email"
            style={{
              width: "96%",
              padding: "15px 0px",
            }}
            rules={[
              {
                required: true,
                message:
                  "You'll use this when you log in and if you ever need to reset your password.!",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <Form.Item
            name="password"
            style={{
              width: "96%",
            }}
            rules={[
              {
                required: true,
                message:
                  "Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &amp;).",
              },
            ]}
          >
            <Input.Password placeholder="New password" />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label="Date of birth"
            style={{
              width: "70%",
              paddingTop: "15px",
            }}
            rules={[
              {
                type: "object",
                required: true,
                message:
                  "It looks like you've entered the wrong info. Please make sure that you use your real date of birth.",
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            style={{
              width: "50%",
              paddingTop: "15px",
            }}
            rules={[
              {
                required: true,
                message:
                  "Please choose a gender. You can change who can see this later.",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          {/* <p className="r_text">
            People who use our service may have uploaded your contact
            information to Facebook. Learn more.
          </p> */}
          <p className="r_text">
            By clicking Sign Up, you agree to our Terms, Privacy Policy and
            Cookies Policy. You may receive SMS notifications from us and can
            opt out at any time.
          </p>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            style={{
              textAlign: "center",
              width: "100%",
              paddingTop: "15px",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="r_btn"
              loading={loading}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default App;
