import * as React from "react";
import { useAccount } from "wagmi";
import { Link } from "react-router-dom";
import { Connect } from "../components";
import logo from "../assets/imgs/logo_w.png";
import { AccountInfo } from "./Profile/AccountInfo";

// TODO:
export const Header = () => {
  const [{ data: accountData }, disconnect] = useAccount();

  return (
    <div className="header">
      <Link
        className="logo"
        to="/"
        style={{
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        {/* <div style={{ display: "inline-block", width: "36px" }}>
          <img src={logo} />
        </div> */}
        <div style={{ color: "#fff", fontSize: "24px", letterSpacing: "4px" }}>
          ETH Lottery
        </div>
      </Link>
      <div className="right">
        {!accountData?.address ? (
          <Connect />
        ) : (
          <div className="flex-ac">
            <Link className="user-page-link" to="/myprofile">
              <AccountInfo />
            </Link>
            <div className="connect-btn" onClick={() => disconnect()}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
