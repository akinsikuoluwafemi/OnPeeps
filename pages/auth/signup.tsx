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
  currentUserLoading,
  currentUserError,
} from "slices/currentUserSlice";

const fileTypes = ["JPG", "PNG", "PDF", "DOC", "DOCX", "XLS", "XLSX", "JPEG"];
// 1Fakinsiku_#
const Section = styled.section`
  min-height: 100vh;
  background-color: #fff;
  // margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  // width: 100vw;

  @media (min-width: 1500px) {
    justify-content: flex-start;
  }

  @media (max-width: 768px) {
    margin: 3rem auto;
    padding: 2rem 0;
  }

  .&copy {
    text-align: center;
  }
`;

const SignUpWrapper = styled.div`
  width: 550px;
  min-height: auto;
  background-color: #fbf9f6;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 2rem;
  // display: flex;
  // flex-direction: column;
  padding-bottom: 2rem;

  .input {
    margin-top: 1rem;
    margin-bottom: 0.2rem;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #1c3879;
    width: 100%;
    font-size: 1.2rem;

    &:focus {
      outline: none;
      border: 1px solid #95a9c6;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      transition: all 0.3s ease-in-out;
    }

    &::placeholder {
      color: #95a9c6;
      font-size: 0.8rem;
      font-weight: 300;
      transition: all 0.3s ease-in-out;
    }
  }
`;
const Spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  
`;
const FormWrapper = styled.form`
  padding-left: 2rem;
  padding-right: 2rem;
  // text-align: center;

  width: 100%;
  // background-color: red;
  min-height: 400px;

  .error {
    color: red;
    font-size: 0.8rem;
    margin-top: -1rem;
    margin-bottom: 1rem;
  }

  small {
    font-size: 0.7rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
    text-align: left !important;
  }

  .upload-wrapper {
    margin-top: 2rem;
  }

  .signup-btn {
    width: 300px;
    margin-top: 2rem;

    span {
      animation-name: ${Spinner};
      animation-duration: 5000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .guidelines {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .guidelines-text {
      margin: 0;
      font-size: 0.8rem;

      a {
        color: #ffaa05;
        font-weight: 500;
      }
    }
  }
`;

const SignupText = styled.p`
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  padding-top: 2rem;
  padding-left: 2rem;
  padding-bottom: 1rem;
  font-weight: ${({ theme }) => theme.defaultTheme.fontWeightMedium};
  font-size: 28px;
`;

const GoToSignintext = styled.p`
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  padding-left: 2rem;
  font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
  padding-bottom: 1rem;
  a {
    color: #ffaa05;
    font-weight: 500;
  }
`;

const InputWrapper = styled.div`
  position: relative;

  .icon {
    position: absolute;
    left: 88%;
    top: 45%;
    bottom: 0;
    cursor: pointer;
    font-size: 1.2rem;
  }
`;

const BtnWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const Signup = () => {
  const dispatch = useDispatch();

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

  // console.log(file && file.name);

  const numberToVerifyOtp = uuidv4();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]);
  // console.log(formErrors);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // do upload in verify.
  const handleUpload = async () => {
    try {
      if (!file) return;
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post(
        "http://localhost:3000/api/v1/upload",
        formData
      );

      setFormValues({ ...formValues, file: data.result.secure_url });

      // console.log(data.result);

      setLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  // / this fires if all checks are passed
  const submitForm = async () => {
    // do the try catch and submit here

    try {
      if (Object.keys(formErrors).length === 0 && isSubmitting) {
        // handleUpload();
        console.log(formValues);

        // try and sign up the user and send otp_number and email in a post request
        const { data } = await axios.post(
          "http://localhost:3000/api/v1/users/signup",
          {
            otp_number: numberToVerifyOtp,
            email: formValues.email,
          }
        );
        console.log(data);
        if (data.status === "success") {
          console.log(formValues);
          // console.log("this is firing");
          dispatch(setCurrentUser({ user: formValues }));

          router.push(
            `/verify-otp?email=${formValues.email}&otp_number=${numberToVerifyOtp}`
          );
        }
      }
    } catch (err: any) {
      setLoading(false);
      notify(err.response.data.message, "error", "bottom-left", "light");
      console.log(err.response.data.message);
    }
  };
  return (
    <PageLayout name="Signup / OnPeeps">
      <Section>
        <SignUpWrapper>
          <SignupText>Signup</SignupText>
          <GoToSignintext>
            Already a member?
            <Link href="/auth/signin">
              <a>&nbsp;Sign in</a>
            </Link>
          </GoToSignintext>

          <FormWrapper
            autoComplete="on"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = { ...formValues, file };
              setFormErrors(validate(formData));
              setFormValues(formData);

              // setFormErrors(validate(formValues));
              setIsSubmitting(true);
              if (Object.keys(formErrors).length === 0 && isSubmitting) {
                submitForm();
                dispatch(setCurrentUser({ user: formValues }));
              }
            }}
          >
            <Input
              // style={{ padding: "10px 16px", margin: "0 2rem" }}
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
                label="Upload/Drop Govt. approved ID right here"
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
        </SignUpWrapper>
        <p className="&copy">&copy; 2021 OnPeeps Inc. All rights reserved.</p>
        <ToastContainer />
      </Section>
    </PageLayout>
  );
};

export default Signup;
