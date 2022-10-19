import PageLayout from "@/components/layout";
import React from "react";
import styled from "styled-components";
import Button from "utils/Buttons";

const Section = styled.div`
  min-height: auto;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding: 3rem;
`;

const ContactForm = styled.div`
  //   background-color: pink;
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
`;
const MyForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 416px;

  input {
    height: 48px;

    ${InputStyles}
  }

  textarea {
    ${InputStyles}
    resize: none;
  }
`;

const LeftSideWrapper = styled.div`
  flex: 0.4 1 0;

  .title {
    font-size: 28px;
    font-weight: 400;
    color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  }
`;
const RightSideWrapper = styled.div`
  flex: 0.6 1 0;
  padding: 3rem;
  //   background-color: red;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  img {
    max-width: 100%;
    height: auto;
    // display: flex;
    // justify-content: center;
    // align-items: flex-start;
  }
`;

const contact = () => {
  return (
    <PageLayout name="Contact / OnPeeps">
      <Section>
        <LeftSideWrapper>
          <p className="title">Get In Touch</p>
          <ContactForm>
            <div className="form-wrapper">
              <MyForm onSubmit={() => {}}>
                <input type="text" placeholder="Full Name" />

                <input type="email" placeholder="johndoe@yahoo.com" />

                <textarea cols={30} rows={10} placeholder="Message"></textarea>

                <Button variant="primary">Send</Button>
              </MyForm>
            </div>
          </ContactForm>
        </LeftSideWrapper>

        <RightSideWrapper>
          <img src="images/contact-bg.svg" />
        </RightSideWrapper>
      </Section>
    </PageLayout>
  );
};

export default contact;
