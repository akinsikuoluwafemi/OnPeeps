import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout";
import styled from "styled-components";
import Link from "next/link";
import Input from "utils/Input";
import { SignInformValues, SignupFormValues } from "utils/FormValues";
import Button from "utils/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCurrentUser } from "slices/currentUserSlice";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { notify } from "utils/errors";
import axios from "axios";
import {
  selectForgetPasswordUser,
  setForgetPasswordUser,
  selectForgetPasswordUserLoading,
  setLoading,
} from "slices/forgotPasswordUserSlice";
import { ToastContainer } from "react-toastify";
import {
  BtnWrapper,
  FormContainer,
  FormSection,
  FormTextHeader,
  FormTextHeaderSmall,
  FormWrapper,
} from "utils/FormSection";
import { FaSpinner } from "react-icons/fa";

// 1Fakinsiku_#

const SignIn = () => {
  const { data: session, status } = useSession();
  console.log(session?.user);
  console.log(status);

  const forgetPasswordUser = useSelector(selectForgetPasswordUser);
  console.log(forgetPasswordUser);

  const loading = useSelector(selectForgetPasswordUserLoading);

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  const unSignedInUser = useSelector(selectCurrentUser);
  console.log("unSignedInUser", unSignedInUser);
  const router = useRouter();

  useEffect(() => {
    if (session?.user && status === "authenticated") {
      router.replace("/feeds");
    }
  }, [session, status]);

  const initialValues = {
    email: "" || unSignedInUser?.email,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState<
    React.SetStateAction<SignupFormValues | any>
  >({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const validate = (values: { email: string }) => {
    let errors = {} as { email: string } | any;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors = { ...errors, email: "Email is required" };
    } else if (!regex.test(values.email)) {
      errors = { ...errors, email: "Email is invalid" };
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]);

  // / this fires if all checks are passed
  const submitForm = async () => {
    // do the try catch and submit here

    dispatch(setLoading(true));

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/users/signup/forgot-password",
        {
          email: formValues.email,
        }
      );
      if (data.status === "success") {
        notify(
          data.message + " pls check your mail",
          "success",
          "bottom-left",
          "light"
        );
        console.log(data);
        dispatch(setForgetPasswordUser({ data: data.data }));
      } else {
        notify(data.message, "error", "bottom-left", "light");
      }

      dispatch(setLoading(false));
    } catch (err: any) {
      dispatch(setLoading(false));
      notify(err.response.data.message, "error", "bottom-left", "light");
    }

    console.log(formValues);
  };

  useEffect(() => {
    dispatch(setCurrentUser({ user: formValues }));
  }, [unSignedInUser]);

  console.log(forgetPasswordUser);

  return (
    <PageLayout name="forgot-password / OnPeeps">
      <FormSection>
        <FormContainer>
          <FormTextHeader>Forgot password</FormTextHeader>

          <FormTextHeaderSmall>
            Don’t worry, it happens to the best of us.
          </FormTextHeaderSmall>

          <FormWrapper
            autoComplete="on"
            onSubmit={(e) => {
              e.preventDefault();
              setFormErrors(validate(formValues));
              setIsSubmitting(true);
              if (Object.keys(formErrors).length === 0 && isSubmitting) {
                submitForm();
              }
            }}
          >
            <Input
              bdclr={formErrors.email && "red"}
              style={{ border: formErrors.email && "1px solid red" }}
              className="input"
              handleChange={handleChange}
              formValues={formValues.email}
              type="email"
              placeholder="Enter your email address to get a link to reset your password"
              name="email"
            />

            {formErrors?.email && (
              <small className="error">{formErrors.email}</small>
            )}

            <div style={{ marginTop: ".5rem" }}></div>

            <br />

            <Link
              href="/auth/signin"
              style={{
                borderBottom: "1px solid #FFAA05",
                width: "max-content",
                marginTop: "5rem",
                color: "#FFAA05",
                fontSize: "0.8rem",
                fontWeight: 700,
                textAlign: "left",
              }}
            >
              Signin to your account &#8594;
            </Link>
            <div
              style={{
                margin: "0 auto",
                textAlign: "center",
                // marginTop: "5rem",
              }}
            >
              <BtnWrapper>
                <Button
                  style={{
                    width: "100%",
                    padding: "15px 0",
                    fontSize: "1.2rem",
                  }}
                  disabled={loading}
                  className="signup-btn"
                  variant="primary"
                  type="submit"
                >
                  {loading ? (
                    <span>
                      <FaSpinner />
                    </span>
                  ) : (
                    "Send Password reset link"
                  )}
                  {/* Signup */}
                </Button>
              </BtnWrapper>
            </div>
          </FormWrapper>
        </FormContainer>
        <p className="&copy">
          &copy; {new Date().getFullYear()} OnPeeps Inc. All rights reserved.
        </p>
        <ToastContainer />
      </FormSection>
    </PageLayout>
  );
};

export default SignIn;
