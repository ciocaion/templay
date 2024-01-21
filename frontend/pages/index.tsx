import React from "react";
import MainButton from "../components/ui/primarybutton";
import SecondaryButton from "../components/ui/secondarybutton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import styles from "../styles/home.module.css";
import Link from "next/link";
import { Input } from "@chakra-ui/react";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#020281",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px",
      }}
    >
      {/* Left Side - Image with Padding */}
      <div
        style={{
          width: "calc(45%)",
          height: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0px",
        }}
      >
        <img
          src="./assets/gea-globe.png"
          alt="GEA Image"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>

      <div className={styles.responsiveCard}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              textAlign: "left",
              fontWeight: "bold",
              marginBottom: "48px",
            }}
          >
            <p>GEA Templay App</p>
            <p
              style={{ fontSize: "20px", marginTop: "18px", fontWeight: "500" }}
            >
              Where simplicity meets creativity in content design
            </p>
          </div>
          <div
            style={{
              fontSize: "18px",
              textAlign: "left",
              marginBottom: "32px",
            }}
          >
            <p
              style={{
                border: "1px solid #020281",
                marginBottom: "12px",
                padding: "16px",
              }}
            >
              Dashboard with templates overview
            </p>
            <p
              style={{
                border: "1px solid #020281",
                marginBottom: "12px",
                padding: "16px",
              }}
            >
              Create desired layouts or templates of different pages
            </p>
            <p
              style={{
                border: "1px solid #020281",
                marginBottom: "12px",
                padding: "16px",
              }}
            >
              Option to share template with colleagues
            </p>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Link href="/dashboard" passHref>
            <MainButton
              icon={<VisibilityOutlinedIcon style={{ color: "#020281" }} />}
            />
          </Link>
        </div>
        <p>A tool by Group Communications and Brand | Digital Channels</p>
      </div>
    </div>
  );
}
