import React from "react";
import styled from "styled-components";

const Section = styled.section`
  //   background: red;
  background-image: url("images/home-video-feature.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  //   height: 100vh;
  padding: 0 3rem;
  padding-top: 25rem;
  margin-top: 2rem;

  @media (max-width: 562px) {
    padding: 0 2rem;
    padding-top: 20rem;
  }
`;

const VideoMockupWrapperTablet = styled.div`
  //   background-color: red;
  //   flex: 1 1 0;
  display: flex;
  justify-content: center;
  align-items: center;
  //   padding: 5rem 3rem;
  margin: 0 auto;
  //   margin-bottom: 5rem;

  img {
    width: 400px;
    height: 100%;
    transform: translateX(-35px);

    @media (max-width: 562px) {
      transform: translateX(-25px);
    }
  }
`;

const InnerSection = styled.div`
  height: auto;
  //   background: red;
  margin: auto;

  @media (max-width: 768px) {
    margin-top: 5rem;
  }
`;

const TextBig = styled.p`
  font-size: 35px;
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  font-weight: ${({ theme }) => theme.defaultTheme.fontWeightBold};
`;

const TextSmall = styled.p`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  margin: 3rem 0rem;
  line-height: 32.4px;
`;

const HomeVideoMockupMobile = () => {
  return (
    <Section>
      <InnerSection>
        <TextBig>Real time chat with the volunteer.</TextBig>
        <TextSmall>
          Get the chance to chat with an helper for further information of the
          situation you need an help for and also a video call feature. After
          which the volunteerwould able to mark fufilled if help was
          successfully rendered.
        </TextSmall>

        <VideoMockupWrapperTablet>
          <img src="/images/vc-mockup-mobile.svg" alt="video mockup" />
        </VideoMockupWrapperTablet>
      </InnerSection>
    </Section>
  );
};

export default HomeVideoMockupMobile;
