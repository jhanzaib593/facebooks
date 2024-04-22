import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import "./index.css";
import { Link, Outlet } from "react-router-dom";
import img from "../../assets/img/TPL-Trakker-logo-170-x-43.png";
import { BASE_URL } from "../../constant/";
import axios from "axios";
import { Button, Popover } from "antd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store";
import toast from "react-hot-toast";
import SpeedIcon from "@mui/icons-material/Speed";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const { Header, Content, Footer, Sider } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [trackData, setTrackData] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  //get blogs
  const getAllTrackData = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/tracking/all-tracking`);
      if (data?.success) {
        setTrackData(data.track);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTrackData();
  }, []);
  const handlelogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      window.location.reload();
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{ backgroundColor: "white" }}
      >
        <div className="demo-logo-vertical" />
        <img
          alt=""
          src={img}
          height={50}
          width={200}
          style={{ paddingLeft: "1em" }}
        />
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          style={{ paddingTop: "5em" }}
        >
          <Menu.Item icon={<SpeedIcon style={{ fontSize: "22px" }} />}>
            <Link to={"/"}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item
            icon={<AddCircleOutlineIcon style={{ fontSize: "22px" }} />}
          >
            <Link to={"/LiveTracking"}>Add Tracking</Link>
          </Menu.Item>
          <Menu.SubMenu
            key="sub1"
            title="Live Tracking"
            icon={<LocationOnIcon style={{ fontSize: "22px" }} />}
          >
            {trackData &&
              trackData.map((blog, ind) => (
                // <h1 key={ind}>{blog?.title}</h1>
                <Menu.Item key={ind}>
                  <Link to={`/${blog?.title}`}>{blog?.title}</Link>
                </Menu.Item>
              ))}
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "7px 20px",
            backgroundColor: "white",
            textAlign: "end",
          }}
        >
          <Popover
            content={
              <Button onClick={handlelogout} className="icon_btn">
                Logout
              </Button>
            }
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement="bottomRight"
          >
            <ManageAccountsIcon className="ManageAccountsIcon" />
          </Popover>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            {location.pathname.split("/").map((path, index) => (
              <Breadcrumb.Item key={index}>{path}</Breadcrumb.Item>
            ))}
          </Breadcrumb> */}
          <div style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          TPL Trakker ©{new Date().getFullYear()} Created by Jhanzaib
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
