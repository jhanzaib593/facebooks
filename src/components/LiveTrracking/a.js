import React, { useState } from "react";
import {
  Button,
  message,
  Steps,
  Form,
  Input,
  Select,
  DatePicker,
  theme,
} from "antd";

const { Option } = Select;
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

const App = () => {
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

  const submitData = (data) => {
    // Example code to send form data to backend or perform other actions
    console.log("Submitting data:", data);
    // Here you can send the data to your backend using fetch or axios
    // Example using fetch:
    // fetch('your-backend-url', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   message.success("Data submitted successfully!");
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    //   message.error("Failed to submit data!");
    // });
    message.success("Processing complete!");
  };

  const items = steps.map((item) => ({
    title: item.title,
  }));

  // const contentStyle = {
  //   lineHeight: "260px",
  //   textAlign: "center",
  //   color: token.colorTextTertiary,
  //   backgroundColor: token.colorFillAlter,
  //   borderRadius: token.borderRadiusLG,
  //   border: `1px dashed ${token.colorBorder}`,
  //   marginTop: 16,
  // };

  return (
    <>
      <Steps current={current} items={items} />
      {/* <div style={contentStyle}>{steps[current].content}</div> */}
      <Form onFinish={onFinish} layout="horizontal">
        {current === 0 && (
          <>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input />
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
              <Select>
                <Option value="USA">USA</Option>
                <Option value="UK">UK</Option>
                <Option value="Canada">Canada</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>
            <Form.Item
              name="birthdate"
              label="Birthdate"
              rules={[
                { required: true, message: "Please select your birthdate!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
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
      {/* <form
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
  );
};

export default App;
