import React, { FC, useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import styled from "styled-components";
import Button from "../utils/Buttons";
import PageLayout from "../components/layout";
import { useRouter } from "next/router";
import axios from "axios";
import { selectCurrentUser, setCurrentUser } from "slices/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "utils/errors";
import { ToastContainer } from "react-toastify";
import jwt from "jsonwebtoken";
import { useSession } from "next-auth/react";

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
    gap: 2rem;
  }

  @media (max-width: 768px) {
    margin: 3rem auto;
    padding: 2rem 0;
    gap: 2rem;
  }

  h1 {
    font-size: 40px;
    font-weight: 500;
  }

  p {
    font-size: 25px;
    font-weight: 300;

    span {
      color: #1c3879;
      font-weight: 500;
      margin-left: 1rem;
      font-size: 20px;
      cursor: pointer;
      border-bottom: 1px solid #1c3879;
    }
  }
`;

const VerifyEmail: FC = () => {
  const [otp, setOtp] = React.useState("");
  const router = useRouter();
  console.log(router);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const { data: session, status } = useSession();
  console.log(session?.user);
  console.log(status);

  useEffect(() => {
    if (session?.user && status === "authenticated") {
      router.replace("/feeds");
    }
  }, [session, status]);
  console.log(user);

  const [unsignedUser, setUnsignedUser] = useState(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (user?.file !== null && user?.email) {
      let currUser = jwt.sign({ unsignedInUser: user }, "xxttyyppqqtttyy", {
        expiresIn: "1d",
      });

      console.log(currUser);
      localStorage.setItem("user", currUser);

      setUnsignedUser(localStorage.getItem("user"));
    }
  }, [user]);

  console.log(unsignedUser);

  const handleChange = (otp: React.SetStateAction<string>) => setOtp(otp);
  console.log(otp);

  console.log(router.query.otp_number);

  const verifyOtp = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/v1/users/signup/verify`,
        {
          otp_number: router.query.otp_number,
          otp: otp,
        },
        {
          headers: {
            Authorization: `Bearer ${unsignedUser}`,
          },
        }
      );
      console.log(data);
      if (data.status === "success") {
        notify("Email Verified", "success", "bottom-left", "light");
        console.log(data.user.email);

        dispatch(setCurrentUser({ user: data.user }));

        router.replace("/auth/signin");
      } else {
        console.log("error");
        notify("Failed to verify email", "error", "bottom-left", "light");
      }
    } catch (err: any) {
      console.log(err);
      notify(err.response.data.message, "error", "bottom-left", "light");
    }
  };

  const resendOtp = async () => {
    try {
      const { data } = await axios.post(`/api/v1/resendOtp`, {
        email: user.email,
        otp_number: router.query.otp_number,
      });
      console.log(data);
      if (data.status === "success") {
        notify(data.message, "success", "bottom-left", "light");
      } else {
        notify(data.message, "error", "bottom-left", "light");
      }
    } catch (err: any) {
      console.log(err);
      notify(err.response.data.message, "error", "bottom-left", "light");
    }
  };

  return (
    <PageLayout showFooter={false} name="verifyEmail /OnPeeps">
      <Section>
        <img src="../images/padlock.svg" alt="otp-image" />

        <h1>Enter Code</h1>
        <small>Code expires in 5mins.</small>

        <p>
          We sent an OTP code to your email
          <span onClick={resendOtp}>Send Again</span>
        </p>

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
        <ToastContainer />
      </Section>
    </PageLayout>
  );
};

export default VerifyEmail;
