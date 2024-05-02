// import { Box, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { PlusOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../constant";
// import TextArea from "antd/es/input/TextArea";
// import HorizontalNonLinearStepper from "./a";
import {
  Button,
  message,
  Steps,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  theme,
} from "antd";

const { Option } = Select;
const { Step } = Steps;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CreateBlog = () => {
  const id = localStorage.getItem("soical_user");
  // const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    image: "",
  });
  console.log("input inputs.ids", inputs);

  const [selectedValue, setSelectedValue] = useState(null);
  console.log("selectedValue", selectedValue);
  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };
  //input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const { Step } = Steps;

  const steps = [
    {
      title: "First",
      content: "First-content",
    },
    {
      title: "Second",
      content: "Second-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];

  const items = steps.map((item) => ({
    title: item.title,
  }));

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
    setFormData({ ...formData, ...values }); // Update formData state with form values
    if (current === steps.length - 1) {
      submitData(formData); // Submit data if it's the last step
    } else {
      next();
    }
  };
  const submitData = async (e) => {
    console.log("Submitting data:", e);
    // e.preventDefault();
    try {
      const trackingdata = {
        data: [],
      };
      const formData = new FormData();

      for (let i = 0; i < selectedValue - 1; i++) {
        const name = formData.get(`data${i}`);
        const input1 = formData.get(`xdata${i}`);
        const input2 = formData.get(`ydata${i}`);
        trackingdata.data.push({ name, input1, input2 });
      }
      formData.append("title", e.title);
      // formData.append("description", e.x - data);
      // formData.append("data", {
      //   name: `track0`,
      //   input1: e.xdata(0),
      //   input2: e.ydata(0),
      // });
      // formData.append("data");

      formData.append("image", inputs.image);
      formData.append("data", trackingdata);

      formData.append("user", id);
      console.log("formData", formData);

      const { data } = await axios.post(
        `${BASE_URL}/api/tracking/create-tracking`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data?.success) {
        toast.success("Blog Created");
        // navigate("/my-blogs");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleselect = () => {};
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append("title", inputs.title);
  //     formData.append("description", inputs.description);
  //     formData.append("image", inputs.image);
  //     formData.append("user", id);

  //     const { data } = await axios.post(
  //       `${BASE_URL}/api/tracking/create-tracking`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     if (data?.success) {
  //       toast.success("Blog Created");
  //       // navigate("/my-blogs");
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <>
        {/* 
        <form
        onSubmit={handleSubmit}
       
      >
        <Box
          width={"50%"}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
          backgroundColor="white"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="blod"
            padding={3}
            color="#af1e23 "
          >
            Create A Tracking
          </Typography>

          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextField
              value={inputs.title}
              onChange={handleChange}
              placeholder="Enter some Title"
              margin="auto"
              variant="outlined"
              name="title"
              required
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
          
            <TextField
              value={inputs.description}
              onChange={handleChange}
              placeholder="Enter some text"
              margin="auto"
              variant="outlined"
              name="description"
              required
            />
          </Form.Item>
          <Form.Item
            style={{
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop: 10,
              paddingBottom: 10,
            }}
            label="Upload"
            rules={[
              {
                required: true,
              },
            ]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            onChange={(e) => {
              console.log("e", e.target.files);
              setInputs({
                ...inputs,
                image: e.target.files[0],
              });
            }}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>
          <Button
            sx={{ mt: 1, mb: 1 }}
            type="submit"
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </form> */}
      </>

      <Steps
        current={current}
        items={items}
        style={{ width: "50%", margin: "auto" }}
      />
      {/* <div style={contentStyle}>{steps[current].content}</div> */}
      <Form
        onFinish={onFinish}
        layout="horizontal"
        style={{ width: "50%", margin: "auto", paddingTop: "2em" }}
      >
        {current === 0 && (
          <>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter your Text!" }]}
            >
              <Input value={inputs.title} />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter your Text!" }]}
            >
              <Input value={inputs.description} />
            </Form.Item>
            <Form.Item
              style={{
                paddingLeft: 5,
                paddingRight: 5,
                paddingTop: 10,
                paddingBottom: 10,
              }}
              label="Upload"
              rules={[
                {
                  required: true,
                },
              ]}
              valuePropName="fileList"
              getValueFromEvent={normFile}
              onChange={(e) => {
                console.log("e", e.target.files);
                setInputs({
                  ...inputs,
                  image: e.target.files[0],
                });
              }}
            >
              <Upload action="/upload.do" listType="picture-card">
                <button
                  style={{
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              </Upload>
            </Form.Item>
          </>
        )}
        {current === 1 && (
          <>
            <Form.Item
              name="country"
              label="Country"
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
            >
              <Select onChange={handleSelectChange}>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>

            {selectedValue && (
              <React.Fragment>
                {[...Array(parseInt(selectedValue))].map((_, index) => (
                  <React.Fragment key={index}>
                    <Form.Item name={`xdata${index}`} label={`x${index + 1}`}>
                      <Input placeholder={`Enter X Value ${index + 1}`} />
                    </Form.Item>
                    {/* Additional Input within loop */}
                    <Form.Item name={`ydata${index}`} label={`y${index + 1}`}>
                      <Input placeholder={`Enter Y Value ${index + 1}`} />
                    </Form.Item>
                  </React.Fragment>
                ))}
              </React.Fragment>
            )}
          </>
        )}
        {current === 2 && (
          <>
            <Form.Item
              name="feedback"
              label="Feedback"
              rules={[
                { required: true, message: "Please enter your feedback!" },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </>
        )}
        <div style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Done
            </Button>
          )}
        </div>
      </Form>
    </>
  );
};

export default CreateBlog;
