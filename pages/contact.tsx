import PageLayout from "@/components/layout";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "utils/Buttons";
// import { Formik, Field, Form } from "formik";
// import * as Yup from "yup";
import Input from "utils/Input";
import { MyContactFormValues } from "utils/FormValues";

const Section = styled.div`
  min-height: auto;
  background-color: #fff;
  // background: teal;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  // width: 100vw;
  min-height: 100vh;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 4rem;
    align-items: center;
  }

  @media (max-width: 768px) {
    // margin-top: 15rem;
  }
`;

const ContactForm = styled.div`
  // background-color: pink;
  padding: 3rem 0;
  padding-bottom: 3rem;

  display: flex;

  width: 100%;

  transition: all 0.5s ease-in-out;

  .form-wrapper {
    flex: 1 1 0;
    // background-color: purple;
  }
`;
const InputStyles = `
padding: 10px 16px;
gap: 10px;
border: 1px solid #95a9c6;
border-radius: 8px;
margin-bottom: 2rem;
font-family: "Poppins", sans-serif;
font-size: 1rem;


&:focus {
  outline: none;
  border: 1px solid #95a9c6;

  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);

  transition: all 0.3s ease-in-out;
  
}

&::placeholder {
  color: #95a9c6;

  font-size: 1rem;

  font-weight: 400;

  transition: all 0.3s ease-in-out;
}

`;
const MyForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 416px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 100%;
  }

  input {
    height: 45px;

    ${InputStyles}
  }

  textarea {
    ${InputStyles}
    resize: none;
  }

  .error {
    color: red;
    font-size: 0.8rem;
    margin-top: -1rem;
    margin-bottom: 1rem;
  }
`;

const LeftSideWrapper = styled.div`
  // flex: 0.5 1 0;

  // .title {
  //   font-size: 28px;
  //   font-weight: 400;
  //   color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  // }
  width: 50%;
  // background-color: purple;
  height: 100%;
  padding: 3rem;

  @media (max-width: 1024px) {
    // width: 100%;
    padding: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem;
    padding-top: 0;
  }
`;
const RightSideWrapper = styled.div`
  // display: none;
  // flex: 0.5 1 0;
  // padding: 3rem;
  // background-color: red;
  // display: flex;
  // justify-content: center;
  // align-items: flex-start;
  width: 50%;
  // background-color: pink
  height: 100%;
  padding: 3rem;
  // background-image: url("/images/contact_bg.jpeg");
  // background-repeat: no-repeat;
  // background-position: center;
  // background-size: cover;
  margin: 0 auto;
  color: #000;
  border-radius: 8px;

  @media (max-width: 1024px) {
    // width: 100%;
    padding: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem;
    padding-bottom: 0;
  }

  .header {
    font-size: 40px;
    font-weight: 700;

    margin-bottom: 1rem;
    color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  }

  .header-text {
    // font-size: 18px;
    // font-weight: 400;
    margin-bottom: 1rem;
    // line-height: 1.4;
    // color: #7a7a7a;
    font-size: 21px;
    font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
    color: #607eaa;
    line-height: 43.2px;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  .contact {
    margin-bottom: 1rem;
    color: #7a7a7a;
  }
`;

// const ContactSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Required"),
//   email: Yup.string().email("Invalid email").required("Required"),
//   message: Yup.string()
//     .min(2, "Too Short!")
//     .max(500, "Too Long!")
//     .required("Required"),
// });

const contact = () => {
  const initialValues: MyContactFormValues = {
    name: "",
    email: "",
    message: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const [formErrors, setFormErrors] = useState<
    React.SetStateAction<MyContactFormValues | any>
  >({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(formErrors);

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  // form validate handler
  const validate = (values: MyContactFormValues) => {
    let errors = {} as MyContactFormValues | any;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      errors = { ...errors, name: "Name is required" };
      // errors.name = "Name is required";
    }

    if (!values.email) {
      errors = { ...errors, email: "Email is required" };
      // errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors = { ...errors, email: "Email is invalid" };
      // errors.email = "Email is invalid";
    }

    if (!values.message) {
      errors = { ...errors, message: "Message is required" };
      // errors.message = "Message is required";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]);

  // this fires if all checks are passed
  const submitForm = async () => {
    // do the try catch and submit here
    console.log(formValues);
  };

  return (
    <PageLayout showFooter={true} name="Contact / OnPeeps">
      <Section>
        <RightSideWrapper>
          <h1 className="header">Get In Touch</h1>

          <p className="header-text">
            Have an inquiry or some feedback for us? Please fill out the form
            and send us a message. We will get back to you as soon as possible.
          </p>

          <p className="header-text">
            Our team is here to help you from Monday to Friday, 9:00 AM to 7:00
            PM Central European Time.
          </p>
        </RightSideWrapper>

        <LeftSideWrapper>
          <ContactForm>
            <div className="form-wrapper">
              <MyForm
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
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  handleChange={handleChange}
                  formValues={formValues.name}
                />
                {formErrors?.name && (
                  <small className="error">{formErrors.name}</small>
                )}

                {/* <input
                  name="email"
                  value={formValues.email}
                  type="email"
                  placeholder="Johndoe@yahoo.com"
                  onChange={handleChange}
                  required
                /> */}
                {/* <small className="error">error</small> */}

                <Input
                  name="email"
                  type="email"
                  placeholder="Johndoe@yahoo.com"
                  handleChange={handleChange}
                  formValues={formValues.email}
                />
                {formErrors?.email && (
                  <small className="error">{formErrors?.email}</small>
                )}
                {/* <small className="error">error</small> */}

                {/* <textarea
                  name="message"
                  value={formValues.message}
                  cols={30}
                  rows={10}
                  placeholder="Message"
                  onChange={handleChange}
                ></textarea> */}
                {/* <small className="error">error</small> */}

                <Input
                  ta
                  name="message"
                  placeholder="Send us a message"
                  handleChange={handleChange}
                  formValues={formValues.message}
                />
                {formErrors?.message && (
                  <small className="error">{formErrors?.message}</small>
                )}
                {/* <small className="error">error</small> */}

                <Button type="submit" variant="primary">
                  Send
                </Button>
              </MyForm>
            </div>
          </ContactForm>
        </LeftSideWrapper>
      </Section>
    </PageLayout>
  );
};

export default contact;
