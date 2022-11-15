import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout";
import styled from "styled-components";
import Link from "next/link";
import Input from "utils/Input";
import { SignInformValues, SignupFormValues } from "utils/FormValues";
import Button from "utils/Buttons";
import { FileUploader } from "react-drag-drop-files";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCurrentUser } from "slices/currentUserSlice";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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

const SignInWrapper = styled.div`
  width: 500px;
  // min-height: 300px;
  height: auto;
  background-color: #fbf9f6;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 2rem;
  // display: flex;
  // flex-direction: column;
  padding-bottom: 2rem;
  // padding-top: 2rem;

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

const FormWrapper = styled.form`
  padding-left: 2rem;
  padding-right: 2rem;
  // text-align: center;

  width: 100%;
  // background-color: red;
  // min-height: 400px;

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

  label {
    // padding: 1rem 2rem;
  }

  .upload-wrapper {
    margin-top: 2rem;
  }

  .signup-btn {
    width: 300px;
    margin-top: 2rem;
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

const SignIn = () => {
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

    const res = await signIn("credentials", {
      redirect: false,
      email: formValues.email,
      password: formValues.password,
    });
    console.log(res);
    if (res?.status === 200) {
      router.replace("/feeds");
    } else {
      //
    }
  };

  console.log("unSignedInUser", unSignedInUser);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(setCurrentUser({ user: formValues }));
  }, [unSignedInUser]);

  return (
    <PageLayout name="SignIn / OnPeeps">
      <Section>
        <SignInWrapper>
          <SignupText>SigIn</SignupText>
          <GoToSignintext>
            Not a member?
            <Link href="/auth/signup">
              <a>&nbsp;Sign Up</a>
            </Link>
          </GoToSignintext>

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

            <div
              style={{
                margin: "0 auto",
                textAlign: "center",
                marginTop: "5rem",
              }}
            >
              <Button
                style={{
                  width: "100%",
                  padding: "15px 0",
                  fontSize: "1.2rem",
                }}
                className="signup-btn"
                variant="primary"
                type="submit"
              >
                Sign In
              </Button>
            </div>
          </FormWrapper>
        </SignInWrapper>
        <p className="&copy">&copy; 2021 OnPeeps Inc. All rights reserved.</p>
      </Section>
    </PageLayout>
  );
};

export default SignIn;
