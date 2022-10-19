import React from "react";
import styled from "styled-components";

const Section = styled.section`
  height: 664px;
  //   background-color: #f4f1e8;
  display: flex;
  background-image: url("/images/Layrer3.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
`;

const RightSideWrapper = styled.div`
  // background-color: red;
  flex: 0.7 1 auto;
  padding: 5rem 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;

  img {
    align-self: end;
    // background-color: teal;
    position: absolute;
    bottom: 0;
    left: auto;
  }
`;

const LeftSideWrapper = styled.div`
  flex: 0.3 1 auto;
  padding: 7rem 3rem;
  //   background-color: teal;
  display: flex;
  flex-direction: column;
`;

const TextBig = styled.p`
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  font-size: 36px;
  width: 500px;
  margin-bottom: 2rem;
`;

const TextSmall = styled.p`
  font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
  color: ${({ theme }) => theme.defaultTheme.fontTextDark};
  font-size: 28px;
  width: 600px;
  line-height: 50.4px;
`;

const HomeSendRequestMockup = () => {
  return (
    <Section>
      <LeftSideWrapper>
        <TextBig>Add and publish your request for other peeps to see</TextBig>
        <TextSmall>
          Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad
        </TextSmall>
      </LeftSideWrapper>
      <RightSideWrapper>
        <img src="/images/mockup-request.svg" alt="hero-mockup" />
      </RightSideWrapper>
    </Section>
  );
};

export default HomeSendRequestMockup;
