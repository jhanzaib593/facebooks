import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Button, Input, Form, Row, Col } from "antd";
import { BASE_URL } from "../../constant";
import toast from "react-hot-toast";
import axios from "axios";

const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const App = () => {
  // const [previewOpen, setPreviewOpen] = useState(false);
  // const [previewImage, setPreviewImage] = useState("");
  // const [fileList, setFileList] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [textFieldValue, setTextFieldValue] = useState(""); // Added state for text field

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  console.log("inputs", inputs);

  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  // };

  // const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Form submitted with image:",
      inputs.title,
      "text:",
      inputs.description,
      "and text field:",
      inputs.image
    );

    // try {
    //   const formData = new FormData();
    //   formData.append("title", inputs.title);
    //   formData.append("description", inputs.description);
    //   formData.append("image", inputs.image);

    //   const { data } = await axios.post(
    //     `${BASE_URL}/api/create-tracking`,
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   if (data?.success) {
    //     toast.success("Live Created");
    //     window.location.reload();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col sm={24} md={12} lg={12}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              value={inputs.title}
              onChange={handleChange}
              placeholder="Enter some Title..."
            />
          </Form.Item>
        </Col>
        <Col sm={24} md={24} lg={24}>
          <Form.Item
            style={{
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop: 10,
              paddingBottom: 10,
            }}
            label="Upload"
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
              {inputs.image.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          {/* <Form.Item
            name="file"
            label="File"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Form.Item> */}
        </Col>
        <Col sm={24} md={12} lg={12}>
          <Form.Item
            name="textarea"
            label="textarea"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              value={inputs.description}
              onChange={handleChange}
              placeholder="Enter some text..."
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
        </Col>
        <Col sm={24} md={24} lg={24}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default App;
