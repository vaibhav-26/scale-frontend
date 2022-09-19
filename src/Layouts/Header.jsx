import React, { useEffect, useState } from "react";
import { Badge, Button, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginOutlined, LogoutOutlined, RobotFilled } from "@ant-design/icons";
import { getRequest } from "../api";
import { useAuth } from "../components/Auth";
import { useDispatch } from "react-redux";
import { remove } from "../features/authTokenSlice";

const { Item } = Menu;
function Header() {
  const [path, setPath] = useState("/");

  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  const handleLogout = async () => {
    dispatch(remove());
    auth.logout();
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          alignItems: "center",
          padding: "10px",
          width: "100%",
          borderBottom: "1px solid lightgrey",
        }}
        className="header"
      >
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[path]}
          selectedKeys={[path]}
          style={{
            width: "100%",
            border: "none",
          }}
          className="header"
        >
          <RobotFilled
            style={{ fontSize: "24px", fontWeight: "bold", color: "#6534da" }}
          />
        </Menu>

        {auth.user ? (
          <>
            <Button
              style={{
                height: "37px",
                width: "11px 0px",
              }}
              className="button"
              type="primary"
              icon={<LogoutOutlined />}
              onClick={() => handleLogout()}
            >
              LogOut
            </Button>
          </>
        ) : (
          <>
            <Link to="/">
              <Button
                className="button"
                style={{
                  height: "40px",
                  width: "110px",
                }}
                icon={<LoginOutlined />}
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                style={{
                  height: "40px",
                  width: "110px",
                  marginLeft: "20px",
                }}
                className="button"
                type="primary"
                icon={<LoginOutlined />}
              >
                Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default Header;
