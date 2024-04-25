import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constant";
import { Col, Row } from "antd";
import "./index.css";

const SingleTracking = () => {
  const id = useParams().id;
  const [inputs, setInputs] = useState({});
  //get blog deliats
  console.log("id ", id);
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/tracking/get-track/${id}`
      );
      console.log("data", data);
      if (data?.success) {
        setInputs({
          title: data?.userTracking.title,
          description: data?.userTracking.description,
          image: data?.userTracking.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogDetail();
  }, [id]);

  return (
    <>
      <div className="main_single">
        <Row>
          <Col sm={24} md={24} lg={12}>
            <img
              alt={inputs.title}
              src={inputs.image}
              width={600}
              height={500}
            />
          </Col>
          <Col sm={24} md={24} lg={12} style={{ padding: 10 }}>
            <h1 className="tracking_h">{inputs.title}</h1>
            <p className="tracking_d">{inputs.description}</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SingleTracking;
