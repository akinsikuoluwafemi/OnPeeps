import React from "react";
import styled from "styled-components";

const Section = styled.section`
  min-height: auto;
  background-image: url("images/home-video-feature.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  padding-bottom: 3rem;
  padding-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoMockupWrapper = styled.div`
  //   background-color: red;
  flex: 1 1 0;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   padding: 5rem 3rem;

  img {
    width: 500px;
    height: 100%;
  }
`;

const VideoMockupText = styled.div`
  //   background-color: teal;
  flex: 1 1 0;
  //   height: 100%;
  text-align: center;
  padding-right: 3rem;
`;

const VideomockupInnerText = styled.div`
  //   background-color: red;

  .text-big {
    font-size: 36px;
    color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
    font-weight: ${({ theme }) => theme.defaultTheme.fontWeightMedium};
    line-height: 43.2px;
    margin-bottom: 2rem;
  }

  .text-small {
    font-size: 24px;
    font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
    color: #607eaa;
    line-height: 43.2px;
  }
`;

const HomeVideoMockup = () => {
  return (
    <Section>
      <VideoMockupWrapper>
        <img src="/images/vc-mockup-mobile.svg" alt="video mockup" />
      </VideoMockupWrapper>
      <VideoMockupText>
        <VideomockupInnerText>
          <p className="text-big">Real time chat with the volunteer.</p>
          <p className="text-small">
            Get the chance to chat with an helper for further information of the
            situation you need an help for and also a video call feature. After
            which the volunteer would able to mark fulfilled if help was
            successfully rendered.
          </p>
        </VideomockupInnerText>
      </VideoMockupText>
    </Section>
  );
};

export default HomeVideoMockup;
