import * as React from "react";
import "./index.css";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { Col, Row } from "antd";
import { DollarOutlined } from "@ant-design/icons";

export default function BasicSparkLineCustomization() {
  const [showHighlight, setShowHighlight] = React.useState(true);
  const [showTooltip, setShowTooltip] = React.useState(true);
  console.log(setShowHighlight, setShowTooltip);
  return (
    <>
      <div className="main">
        <Row>
          <Col sm={12} md={11} lg={5} className="count">
            <div>
              <h3>Sale</h3>
              <h1>Pkr: 4525</h1>
            </div>
            <div>
              <DollarOutlined className="icon" />
            </div>
          </Col>
          <Col sm={12} md={11} lg={5} className="count">
            <div>
              <h3>Sale</h3>
              <h1>Pkr: 4525</h1>
            </div>
            <div>
              <DollarOutlined className="icon" />
            </div>
          </Col>
          <Col sm={12} md={11} lg={5} className="count">
            <div>
              <h3>Sale</h3>
              <h1>Pkr: 4525</h1>
            </div>
            <div>
              <DollarOutlined className="icon" />
            </div>
          </Col>
          <Col sm={12} md={11} lg={5} className="count">
            <div>
              <h3>Sale</h3>
              <h1>Pkr: 4525</h1>
            </div>
            <div>
              <DollarOutlined className="icon" />
            </div>
          </Col>
        </Row>
      </div>
      <Stack direction="column" sx={{ width: "100%" }}>
        <Stack direction="row" sx={{ width: "100%" }}>
          <Box sx={{ flexGrow: 1 }}>
            <SparkLineChart
              data={[1, 4, 2, 5, 7, 2, 4, 6]}
              height={300}
              showHighlight={showHighlight}
              showTooltip={showTooltip}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <SparkLineChart
              plotType="bar"
              data={[1, 4, 2, 5, 7, 2, 4, 6]}
              height={300}
              showHighlight={showHighlight}
              showTooltip={showTooltip}
            />
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
