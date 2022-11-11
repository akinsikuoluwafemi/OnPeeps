import React, { FC, useEffect } from "react";
import OtpInput from "react-otp-input";
import styled from "styled-components";
import Button from "../utils/Buttons";
import PageLayout from "../components/layout";
import { useRouter } from "next/router";
import axios from "axios";
import { selectCurrentUser } from "slices/currentUserSlice";
import { useSelector } from "react-redux";

const Section = styled.section`
  min-height: 100vh;
  background-color: #fff;
  // margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 3rem 0;
  padding: 3rem;

  @media (min-width: 1500px) {
    justify-content: flex-start;
  }

  @media (max-width: 768px) {
    margin: 3rem auto;
    padding: 2rem 0;
  }

  h1 {
    font-size: 40px;
    font-weight: 500;
  }

  p {
    font-size: 25px;
    font-weight: 300;
  }
`;

const VerifyEmail: FC = () => {
  const [otp, setOtp] = React.useState("");
  const router = useRouter();
  console.log(router);
  const user = useSelector(selectCurrentUser);

  // ||
  // JSON.parse(localStorage.getItem("user") || "{}");

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }, [user && user]);

  console.log("user", user);

  const handleChange = (otp: React.SetStateAction<string>) => setOtp(otp);
  console.log(otp);

  // const handleUpload = async () => {
  //   try {
  //     if (!file) return;
  //     setLoading(true);

  //     const formData = new FormData();
  //     formData.append("file", file);

  //     const { data } = await axios.post(
  //       "http://localhost:3000/api/v1/upload",
  //       formData
  //     );

  //     setFormValues({ ...formValues, file: data.result.secure_url });

  //     // console.log(data.result);

  //     setLoading(false);
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };

  const verifyOtp = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/v1/users/signup/verify`,
        {
          otp_number: router.query.otp_number,
          otp: otp,
          user: user,
        }
      );
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <PageLayout showFooter={false} name="verifyEmail /OnPeeps">
      <Section>
        <img src="../images/padlock.svg" alt="otp-image" />

        <h1>Enter Code</h1>

        <p>We sent an OTP code to your email</p>

        <OtpInput
          inputStyle={{
            width: "4rem",
            height: "4rem",
            margin: "0 1rem",
            fontSize: "2rem",
            border: "none",
            backgroundColor: "#D2D7E4",
          }}
          hasErrored={true}
          value={otp}
          onChange={handleChange}
          numInputs={6}
          separator={
            <span>
              <strong></strong>
            </span>
          }
        />

        <Button
          style={{ width: "200px" }}
          className="signup-btn"
          variant="primary"
          type="submit"
          onClick={verifyOtp}
        >
          Verify Email
        </Button>
      </Section>
    </PageLayout>
  );
};

export default VerifyEmail;
