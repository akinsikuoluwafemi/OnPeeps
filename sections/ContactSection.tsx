import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "utils/Buttons";

const Section = styled.section`
  min-height: auto; //change to auto later
  //   background: red;
  display: flex;
  //   justify-content: center;
  //   align-items: center;
  margin-bottom: 3rem;
  padding: 3rem 0;
  transition: display 0.3s ease-in-out;
`;

const ContactImageWrapper = styled.div`
  //   background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 0.4 1 0;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const ContactTextWrapper = styled.div`
  //   background-color: teal;
  flex: 0.6 1 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ContactTextContainer = styled.div`
  //   background: pink;

  .text-big {
    font-size: 36px;
    line-height: 54px;
    color: #151414;
    font-weight: ${({ theme }) => theme.defaultTheme.fontWeightMedium};
    margin-bottom: 1.5rem;
  }

  .text-small {
    font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
    font-size: ${({ theme }) => theme.defaultTheme.fontH2};
    line-height: 43.2px;
    color: #3c3b3b;
    margin-bottom: 1rem;
  }

  .icon-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;

    .contact-text {
      font-size: 18px;
      color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
    }
  }
`;

// interface MyInputProps {
//   label: string;
//   name: string;
//   type: string;
//   placeholder?: string;
//   id?: string;
// }

// const MyTextInput: FC<MyInputProps> = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <input className="text-input" {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

const ContactSection = () => {
  const [open, setOpen] = useState<boolean>(true);

  //   const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Section>
        <ContactImageWrapper>
          <img src="images/contact-us.svg" alt="contact-image" />
        </ContactImageWrapper>
        <ContactTextWrapper>
          <ContactTextContainer>
            <p className="text-big">We are here to help you</p>

            <p className="text-small">
              Got a question to ask? Our team is here to help you with any
              problem or confusion you encounter, open to serve you 24/7.
            </p>

            <Button
              onClick={(e) => {
                setOpen(!open);
                console.log(open);
              }}
              variant="tertiary"
              className="icon-wrapper"
            >
              <img src="images/icons/contact.svg" />
              <span className="contact-text">Contact Us</span>
            </Button>
          </ContactTextContainer>
        </ContactTextWrapper>
      </Section>

      {/* <>
        <ContactForm>
          <div className="empty"></div>
          <div className="form-wrapper">
            <MyForm onSubmit={() => {}}>
              <input type="text" placeholder="Full Name" />

              <input type="email" placeholder="johndoe@yahoo.com" />

              <textarea cols={30} rows={10} placeholder="Message"></textarea>

              <Button variant="primary">Send</Button>
            </MyForm>
          </div>
        </ContactForm>
      </> */}
    </>
  );
};

export default ContactSection;
