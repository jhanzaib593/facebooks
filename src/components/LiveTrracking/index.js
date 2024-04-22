import { Box, Typography, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Upload } from "antd";
import { BASE_URL } from "../../constant";
import TextArea from "antd/es/input/TextArea";

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
    title: "",
    description: "",
    image: "",
  });
  console.log("input inputs.ids", inputs);

  //input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("image", inputs.image);
      formData.append("user", id);

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
  return (
    <>
      <form
        onSubmit={handleSubmit}
        // labelCol={{
        //   flex: "110px",
        // }}
        // labelAlign="left"
        // labelWrap
        // wrapperCol={{
        //   flex: 1,
        // }}
        // colon={false}
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
            {/* <Input
              value={inputs.title}
              onChange={handleChange}
              placeholder="Enter some Title..."
            /> */}
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
            {/* <Input.TextArea
              value={inputs.description}
              onChange={handleChange}
              placeholder="Enter some text..."
              autoSize={{ minRows: 3, maxRows: 6 }}
            /> */}
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
      </form>
    </>
  );
};

export default CreateBlog;
