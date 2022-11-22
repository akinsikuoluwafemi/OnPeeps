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
  setCurrentUser,
  setLoading,
  setError,
  selectCurrentLoading,
  selectCurrentError,
} from "slices/currentUserSlice";
import { useSession } from "next-auth/react";
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

const Signup = () => {
  const { data: session, status } = useSession();
  console.log(session?.user);
  useEffect(() => {
    if (session?.user && status === "authenticated") {
      router.replace("/feeds");
    }
  }, [session, status]);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    file: null,
    cell_phone: "",
    created_at: "",
    updated_at: "",
    verified: false,
    id: 0,
  };

  const user = useSelector(selectCurrentUser);
  const loading = useSelector(selectCurrentLoading);
  const uploadError = useSelector(selectCurrentError);
  // save the user in local storage

  const [formValues, setFormValues] = useState(initialValues);

  const router = useRouter();

  const [formErrors, setFormErrors] = useState<
    React.SetStateAction<SignupFormValues | any>
  >({});

  const [file, setFile] = useState(null as any);

  const handleFileChange = (file: any) => {
    setFile(file);
  };

  useEffect(() => {
    dispatch(setCurrentUser({ user: formValues }));
    // console.log("changing user to empty");
  }, []);

  const numberToVerifyOtp = uuidv4();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const validate = (values: SignupFormValues | any) => {
    let errors = {} as SignupFormValues | any;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,20}$/;

    if (!values.username) {
      errors = { ...errors, username: "Username is required" };
    } else if (values.username.length < 4) {
      errors = {
        ...errors,
        username: "Username is should be above 3 characters",
      };
    }

    if (!values.email) {
      errors = { ...errors, email: "Email is required" };
    } else if (!regex.test(values.email)) {
      errors = { ...errors, email: "Email is invalid" };
    }
    if (values.confirm_password !== values.password) {
      errors = { ...errors, confirm_password: "Passwords do not match" };
    } else if (!values.confirm_password) {
      errors = {
        ...errors,
        confirm_password: "Confirm Password is required",
      };
    }

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
    if (!file) {
      errors = { ...errors, file: "File is required" };
    } else if (file.size > 5000000) {
      errors = { ...errors, file: "File size is too large" };
      // "JPG", "PNG", "PDF", "DOC", "DOCX", "XLS", "XLSX"
    } else if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "application/pdf" &&
      file.type !== "application/msword" &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
      file.type !== "application/vnd.ms-excel" &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      errors = { ...errors, file: "File type is invalid" };
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting && !uploadError) {
      submitForm();
    }
  }, [formErrors]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // do upload in verify.
  const handleUpload = async () => {
    try {
      if (!file) return;
      // dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/upload",
        formData
      );

      if (data) {
        setFormValues({ ...formValues, file: data.result.secure_url });

        dispatch(
          setCurrentUser({
            user: { ...formValues, file: data.result.secure_url },
          })
        );
      }
      // dispatch(setLoading(false));
    } catch (error: any) {
      // dispatch(setLoading(false));
      console.log(error.response.data.message);
      console.log(error);
      dispatch(setError(error.response.data.message));
      notify(error.response.data.message, "error", "bottom-left", "light");
    }
  };

  useEffect(() => {
    if (!file) return;

    if (file.length > 0) return;

    handleUpload();
  }, [file]);

  console.log(formValues);

  // / this fires if all checks are passed
  const submitForm = async () => {
    // do the try catch and submit here

    try {
      if (
        Object.keys(formErrors).length === 0 &&
        isSubmitting &&
        uploadError === null
      ) {
        // try and sign up the user and send otp_number and email in a post request

        if (uploadError !== null) {
          // return; remove this later
          dispatch(setLoading(false));

          dispatch(setError("error in file upload"));
          console.log("error in file upload");
          notify(
            "error in file upload or form validation",
            "error",
            "bottom-left",
            "light"
          );
        } else {
          dispatch(setLoading(true));

          // let currUser = jwt.sign({ user }, "secret", {
          //   expiresIn: "1d",
          // });
          // console.log(currUser);
          const { data } = await axios.post(
            "http://localhost:3000/api/v1/users/signup",
            {
              otp_number: numberToVerifyOtp,
              email: formValues.email,
            }
            // {
            //   headers: {
            //     Authorization: `Bearer ${currUser}`,
            //   },
            // }
          );
          console.log(data);
          dispatch(setLoading(false));
          notify(data.message, "success", "bottom-left", "light");
          if (data.status === "success") {
            setTimeout(() => {
              router.replace(
                `/verify-otp?email=${formValues.email}&otp_number=${numberToVerifyOtp}`
              );
            }, 1500);
          }
        }
      }
    } catch (err: any) {
      dispatch(setLoading(false));
      dispatch(setError(err.response.data.message));

      notify(err.response.data.message, "error", "bottom-left", "light");
      console.log(err.response.data.message);
    }
  };

  console.log(user);

  console.log(uploadError);

  return (
    <PageLayout name="Signup / OnPeeps">
      <FormSection>
        <FormContainer>
          <FormTextHeader>Signup</FormTextHeader>
          <FormTextHeaderSmall>
            Already a member?
            <Link href="/auth/signin">&nbsp;Sign in</Link>
          </FormTextHeaderSmall>

          <FormWrapper
            autoComplete="on"
            onSubmit={(e) => {
              e.preventDefault();
              setFormErrors(validate(formValues));
              setFormValues(formValues);
              dispatch(setCurrentUser({ user: formValues }));

              setIsSubmitting(true);
              if (
                Object.keys(formErrors).length === 0 &&
                isSubmitting &&
                file &&
                uploadError === null
              ) {
                dispatch(setLoading(true));

                submitForm();
                dispatch(setLoading(false));
              } else if (uploadError !== null) {
                dispatch(setLoading(false));

                dispatch(setError("error in file upload"));
                console.log("error in file upload");
                notify(
                  "error in file upload or form validation",
                  "error",
                  "bottom-left",
                  "light"
                );
              }
            }}
          >
            <Input
              // style={{ padding: "10px 16px", margin: "0 2rem" }}
              bdclr={formErrors.username && "red"}
              style={{ border: formErrors.username && "1px solid red" }}
              className="input"
              handleChange={handleChange}
              formValues={formValues.username}
              type="text"
              placeholder="User Name"
              name="username"
            />
            {formErrors?.username && (
              <small className="error">{formErrors.username}</small>
            )}
            <Input
              // style={{ padding: "10px 16px", margin: "0 2rem" }}
              bdclr={formErrors.email && "red"}
              style={{ border: formErrors.email && "1px solid red" }}
              className="input"
              handleChange={handleChange}
              formValues={formValues.email}
              type="email"
              placeholder="Email"
              name="email"
            />

            {formErrors?.email && (
              <small className="error">{formErrors.email}</small>
            )}

            <InputWrapper>
              <Input
                // style={{ padding: "10px 16px", margin: "0 2rem" }}
                bdclr={formErrors.password && "red"}
                style={{ border: formErrors.password && "1px solid red" }}
                className="input"
                handleChange={handleChange}
                formValues={formValues.password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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

            <InputWrapper>
              <Input
                // style={{ padding: "10px 16px", margin: "0 2rem" }}
                bdclr={formErrors.confirm_password && "red"}
                style={{
                  border: formErrors.confirm_password && "1px solid red",
                }}
                className="input"
                handleChange={handleChange}
                formValues={formValues.confirm_password}
                type={showConfirmPassword ? "text" : "Password"}
                placeholder="Confirm Password"
                name="confirm_password"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="icon"
              >
                {showConfirmPassword ? <BiShowAlt /> : <BiHide />}
              </span>
            </InputWrapper>
            {formErrors?.confirm_password && (
              <small className="error">{formErrors.confirm_password}</small>
            )}
            <div className="upload-wrapper">
              <small>Drivers License / Passport / National ID </small>

              <FileUploader
                handleChange={handleFileChange}
                name="file"
                types={fileTypes}
                label="Drag & Drop Govt. approved ID right here"
                style={{ borderColor: "red" }}
                multiple={false}
                onTypeErr={(err: any) => {
                  console.log(err);
                }}
              />

              <small>
                <strong>
                  {file ? `File name: ${file?.name}` : "No files uploaded yet"}
                </strong>
              </small>
            </div>

            {formErrors?.file && (
              <>
                <small className="error">{formErrors.file}</small>
              </>
            )}

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
                  "Signup"
                )}
                {/* Signup */}
              </Button>
            </BtnWrapper>

            <p className="guidelines">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                style={{ margin: "0 0.5rem" }}
              />

              <small className="guidelines-text">
                By signing up, you agree to our
                <a
                  referrerPolicy="no-referrer-when-downgrade"
                  href="https://onpeeps.com/privacy-policy"
                >
                  <span>{" Terms of Use &  Privacy Policy  "}</span>
                </a>
              </small>
            </p>
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

export default Signup;
