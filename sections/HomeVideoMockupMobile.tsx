import React from "react";
import styled from "styled-components";

const Section = styled.section`
  //   background: #fff;
  background-image: url("images/home-video-feature.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  //   height: 100vh;
  padding: 0 3rem;
  padding-top: 25rem;
  margin-top: -1rem;

  img {
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

  img {
    width: 500px;
    height: 100%;
  }
`;

const InnerSection = styled.div`
  height: 100vh;
  //   background: red;
  margin: auto;
`;

const TextBig = styled.p`
  font-size: 36px;
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
          <img src="/images/vc-mockup.svg" alt="video mockup" />
        </VideoMockupWrapperTablet>
      </InnerSection>
    </Section>
  );
};

export default HomeVideoMockupMobile;
