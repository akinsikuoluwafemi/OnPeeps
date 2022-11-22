import React, { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/layout";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import Input from "utils/Input";
import { SignupFormValues } from "utils/FormValues";
import Button from "utils/Buttons";
import { FileUploader } from "react-drag-drop-files";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { ToastContainer, toast, TypeOptions } from "react-toastify";
import { notify } from "utils/errors";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentLoading,
  selectCurrentError,
} from "slices/currentUserSlice";
import { useSession } from "next-auth/react";
import {
  selectForgetPasswordUser,
  setForgetPasswordUser,
} from "slices/forgotPasswordUserSlice";
import {
  BtnWrapper,
  FormContainer,
  FormSection,
  FormTextHeader,
  FormTextHeaderSmall,
  FormWrapper,
  InputWrapper,
} from "utils/FormSection";

const fileTypes = ["JPG", "PNG", "PDF", "DOC", "DOCX", "XLS", "XLSX", "JPEG"];
// 1Fakinsiku_#

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  console.log(session?.user);
  useEffect(() => {
    if (session?.user && status === "authenticated") {
      router.replace("/feeds");
    }
  }, [session, status]);

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  const initialValues = {
    password: "",
  };

  const user = useSelector(selectCurrentUser);
  const uploadError = useSelector(selectCurrentError);
  const forgetPasswordUser = useSelector(selectForgetPasswordUser);
  console.log(forgetPasswordUser);
  const [formValues, setFormValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { token } = router.query;

  console.log(router);

  console.log(token === forgetPasswordUser?.token);

  console.log(forgetPasswordUser?.token);
  console.log(router.query.token);

  const [formErrors, setFormErrors] = useState<
    React.SetStateAction<SignupFormValues | any>
  >({});

  // useEffect(() => {
  //   if (router.isReady) {
  //     if (token !== forgetPasswordUser?.token) {
  //       console.log("token not match");
  //       router.replace("/auth/signin");
  //     } else if (token === forgetPasswordUser?.token) {
  //       console.log("token match");
  //     }
  //   }
  // }, [token, forgetPasswordUser]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const validate = (
    values: { password: string; confirm_password: string } | any
  ) => {
    let errors = {} as { password: string; confirm_password: string } | any;

    var passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,20}$/;

    if (!values.password) {
      errors = { ...errors, password: "Password is required" };
    } else if (values.password.length < 8) {
      errors = {
        ...errors,
        password: "Password should be 8 characters long ",
      };
    } else if (!passwordRegex.test(values.password)) {
      errors = {
        ...errors,
        password:
          "Password should contain at least one uppercase, one lowercase, one number and one special character",
      };
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting && !uploadError) {
      submitForm();
    }
  }, [formErrors]);

  const [showPassword, setShowPassword] = useState(false);

  // / this fires if all checks are passed
  // const submitForm = async () => {
  //   // do the try catch and submit here

  //   try {
  //     setLoading(true);
  //     if (token !== forgetPasswordUser?.token) {
  //       setLoading(false);
  //       notify("wrong reset password token", "error", "bottom-left", "light");
  //       return;
  //     } else {
  //       setLoading(true);
  //       const { data } = await axios.put(
  //         "http://localhost:3000/api/v1/users/signup/reset-password",
  //         {
  //           password: formValues.password,
  //           timeCreated: forgetPasswordUser.timeCreated,
  //           email: forgetPasswordUser.email,
  //         }
  //       );

  //       console.log(data);

  //       if (data.status === "success") {
  //         notify(data.message, "success", "bottom-left", "light");
  //         // setTimeout(() => {
  //         //   router.push("/auth/signin");
  //         // }, 1200);
  //         dispatch(setForgetPasswordUser({ data: null }));
  //       } else {
  //         setLoading(false);

  //         notify(data.message, "error", "bottom-left", "light");
  //       }
  //     }
  //   } catch (err: any) {
  //     console.log(err);
  //     setLoading(false);
  //     notify(err.response.data.message, "error", "bottom-left", "light");
  //   }
  //   console.log(formValues);
  // };

  const submitForm = async () => {
    // do the try catch and submit here

    try {
      setLoading(true);
      const { data } = await axios.put(
        "http://localhost:3000/api/v1/users/signup/reset-password",
        {
          password: formValues.password,
          timeCreated: forgetPasswordUser.timeCreated,
          email: forgetPasswordUser.email,
        }
      );

      console.log(data);

      if (data.status === "success") {
        notify(data.message, "success", "bottom-left", "light");
        // setTimeout(() => {
        //   router.push("/auth/signin");
        // }, 1200);
        setLoading(false);
        dispatch(setForgetPasswordUser({ data: null }));
      } else {
        setLoading(false);

        notify(data.message, "error", "bottom-left", "light");
      }
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      notify(err.message, "error", "bottom-left", "light");
    }
    console.log(formValues);
  };

  console.log(user);

  console.log(uploadError);

  return (
    <PageLayout name="Signup / OnPeeps">
      <FormSection>
        <FormContainer>
          <FormTextHeader>Reset Password</FormTextHeader>
          <FormTextHeaderSmall>
            Kindly keep your password safe.
          </FormTextHeaderSmall>

          <FormWrapper
            autoComplete="on"
            onSubmit={(e) => {
              e.preventDefault();
              setFormErrors(validate(formValues));
              setFormValues(formValues);

              setIsSubmitting(true);
              if (Object.keys(formErrors).length === 0 && isSubmitting) {
                submitForm();
              }
            }}
          >
            <InputWrapper>
              <Input
                // style={{ padding: "10px 16px", margin: "0 2rem" }}
                bdclr={formErrors.password && "red"}
                style={{ border: formErrors.password && "1px solid red" }}
                className="input"
                handleChange={handleChange}
                formValues={formValues.password}
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                name="password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="icon"
              >
                {showPassword ? <BiShowAlt /> : <BiHide />}
              </span>
            </InputWrapper>

            {formErrors?.password && (
              <small className="error">{formErrors.password}</small>
            )}

            <div style={{ marginTop: "1rem" }}></div>

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
              Back to signin &#8594;
            </Link>

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
                  "Reset Password"
                )}
                {/* Signup */}
              </Button>
            </BtnWrapper>
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

export default ResetPassword;
