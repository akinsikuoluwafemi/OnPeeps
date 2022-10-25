import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

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
  padding-bottom: 0rem;
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

  @media (max-width: 1100px) {
    font-size: 24px;
    width: 500px;
  }
`;

const HomeSendRequestMockup = () => {
  const showSection = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const t1 = gsap.timeline();
    t1.fromTo(
      showSection.current,
      {
        opacity: 0,
        y: 100,
      },
      {
        scrollTrigger: {
          trigger: showSection.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          markers: false,
        },

        opacity: 1,
        y: 0,
        duration: 1,
        once: true,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <Section>
      <LeftSideWrapper ref={showSection}>
        <TextBig>Add and publish your request for other peeps to see</TextBig>
        <TextSmall>
          Create a request and publish it to the world. You can also add your
          location to this request so that other peeps can see it on the map.
        </TextSmall>
      </LeftSideWrapper>
      <RightSideWrapper ref={showSection}>
        <img src="/images/mockup-request.svg" alt="hero-mockup" />
      </RightSideWrapper>
    </Section>
  );
};

export default HomeSendRequestMockup;
