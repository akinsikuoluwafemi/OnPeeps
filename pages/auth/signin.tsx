import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout";
import styled from "styled-components";
import Link from "next/link";
import Input from "utils/Input";
import { SignInformValues, SignupFormValues } from "utils/FormValues";
import Button from "utils/Buttons";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCurrentUser } from "slices/currentUserSlice";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { notify } from "utils/errors";
import { ToastContainer } from "react-toastify";
import {
  BtnWrapper,
  FormContainer,
  FormSection,
  FormTextHeader,
  FormTextHeaderSmall,
  FormWrapper,
  InputWrapper,
} from "utils/FormSection";
import { FaSpinner } from "react-icons/fa";

// 1Fakinsiku_#  akinsiku.o@yahoo.com: 1Fbcinsiku_#

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  console.log(session?.user);
  console.log(status);

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

  const initialValues: SignInformValues = {
    email: "" || unSignedInUser?.email,
    password: "",
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

  const validate = (values: SignInformValues) => {
    let errors = {} as SignInformValues | any;

    if (!values.email) {
      errors = { ...errors, email: "Email is required" };
    }

    if (!values.password) {
      errors = { ...errors, password: "Password is required" };
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]);
  console.log(formErrors);

  // / this fires if all checks are passed
  const submitForm = async () => {
    // do the try catch and submit here

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
      });
      console.log(res);
      if (res?.status === 200) {
        setLoading(false);
        notify("Signed in successfully", "success", "bottom-left", "light");

        router.replace("/feeds");
      } else {
        setLoading(false);
        notify("invalid password", "error", "bottom-left", "light");
      }
    } catch (err: any) {
      setLoading(false);
      notify("invalid password", "error", "bottom-left", "light");
    }
  };

  console.log("unSignedInUser", unSignedInUser);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(setCurrentUser({ user: formValues }));
  }, [unSignedInUser]);

  return (
    <PageLayout name="SignIn / OnPeeps">
      <FormSection>
        <FormContainer>
          <FormTextHeader>SigIn</FormTextHeader>
          <FormTextHeaderSmall>
            Not a member?
            <Link href="/auth/signup">&nbsp;Sign Up</Link>
          </FormTextHeaderSmall>

          <FormWrapper
            autoComplete="on"
            onSubmit={(e) => {
              e.preventDefault();
              setFormErrors(validate(formValues));
              setFormValues(formValues);
              // setFormErrors(validate(formValues));
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
              placeholder="Email"
              name="email"
            />

            {formErrors?.email && (
              <small className="error">{formErrors.email}</small>
            )}

            <InputWrapper>
              <Input
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

            <div style={{ marginTop: "1rem" }}></div>

            <Link
              href="/auth/forgot-password"
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
              Forgot Password &#8594;
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
                    "Signin"
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
