import React from "react";
import styled from "styled-components";

const Section = styled.div`
  background: #fff;
  //   background: red;
  //   min-height: 90vh;
  //   padding: 3rem;
  //   padding: 3rem 0rem;
  display: flex;
  flex-direction: column;
  //   width: 100vw;
`;

const InnerSection = styled.div`
  background: #fff;
  //   background: red;
  margin: 0 auto;
  padding: 5rem 3rem;
  //   text-align: center;
  //   width: 700px;

  @media (max-width: 562px) {
    padding: 3rem 2rem;
    padding-top: 0rem;
  }
`;

const InnerSectionBg = styled.div`
  position: relative;
  //   background: pink;
  height: 500px;
  width: 100%;
  background-image: url("images/Layrer3.png");

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-bottom: -1rem;

  img {
    position: absolute;
    top: 281px;
    left: 50%;
    transform: translate(-56%, -50%);
  }

    @media (max-width: 562px) {
    img {
        top: 331px;
        max-width: 400px;
    }
`;

const BigText = styled.p`
  font-size: 35px;
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  font-weight: ${({ theme }) => theme.defaultTheme.fontWeightBold};
  //   text-align: center;
  margin: 0 auto;
  margin-bottom: 3rem;
`;

const SmallText = styled.p`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
  color: #000;
  line-height: 32.4px;
`;

const HomeSendRequestMockupMobile = () => {
  return (
    <Section>
      <InnerSection>
        <BigText>Add and publish your request for other peeps to see</BigText>
        <SmallText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis
        </SmallText>
      </InnerSection>
      <InnerSectionBg>
        <img src="/images/mockup-request.svg" alt="" />
      </InnerSectionBg>
    </Section>
  );
};

export default HomeSendRequestMockupMobile;
