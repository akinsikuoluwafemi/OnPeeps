import React from "react";
import styled from "styled-components";

const Section = styled.div`
  background: #fff;
  min-height: 90vh;
  //   padding: 3rem;
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const InnerSection = styled.div`
  background: #fff;
  margin: 0 auto;
  padding-bottom: 3rem;
  text-align: center;
  width: 700px;
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

  img {
    position: absolute;
    top: 281px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const BigText = styled.p`
  font-size: 36px;
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  font-weight: ${({ theme }) => theme.defaultTheme.fontWeightBold};
  text-align: center;
  margin: 0 auto;
  margin-bottom: 2rem;
`;

const SmallText = styled.p`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
  color: #000;
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
