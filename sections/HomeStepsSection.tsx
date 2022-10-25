import StepsChild from "@/components/StepsChild";
import StepWrapperMobile from "@/components/StepWrapperMobile";
import React, { useLayoutEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import gsap from "gsap";

const Section = styled.section`
  height: auto;
  background-color: #fff;
  padding: 7rem 3rem;

  @media (max-width: 562px) {
    padding: 5rem 2rem;
  }
`;

const StepsDescription = styled.p`
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  font-size: ${({ theme }) => theme.defaultTheme.fontH1};
  margin-top: 1rem;
  margin-bottom: 3rem;
  width: 661px;

  @media (max-width: 1023px) {
    width: 100%;
  }

  @media (max-width: 562px) {
    font-size: 24px;
  }
`;

const StepsWrapper = styled.div`
  // background-color: red;
  min-width: 80%;
  min-height: 200px;
  display: flex;
`;

const HomeStepsSection = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const showSection = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const t1 = gsap.timeline();
    t1.fromTo(
      showSection.current,
      {
        opacity: 0,
        y: 100,
        // y: 100,
      },
      {
        scrollTrigger: {
          trigger: showSection.current,
          start: "2% bottom",
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
      <div ref={showSection}>
        <p>What to expect ...</p>

        <StepsDescription>
          It takes only few steps to connect people in need to willing
          volunteers on Peepson.
        </StepsDescription>

        {isBigScreen && (
          <StepsWrapper>
            <StepsChild
              stepNumber={1}
              title="Create a Request"
              subTitle="Add a request on the app."
              dashed={true}
            />

            <StepsChild
              stepNumber={2}
              title="Someone volunteers"
              subTitle="People out there want to help you."
              dashed={true}
            />

            <StepsChild
              stepNumber={3}
              title="Chat with the volunteer"
              subTitle="Chatting in real time with your volunteer."
              dashed={false}
            />
          </StepsWrapper>
        )}

        {isTabletOrMobile && <StepWrapperMobile />}
      </div>
    </Section>
  );
};

export default HomeStepsSection;
