import StepsChild from "@/components/StepsChild";
import React from "react";
import styled from "styled-components";

const Section = styled.section`
  height: auto;
  background-color: #fff;
  padding: 7rem 3rem;
`;

const StepsDescription = styled.p`
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  font-size: ${({ theme }) => theme.defaultTheme.fontH1};
  margin-top: 1rem;
  margin-bottom: 3rem;
  width: 661px;
`;

const StepsWrapper = styled.div`
  //   background-color: red;
  min-width: 80%;
  min-height: 200px;
  display: flex;
`;

const HomeStepsSection = () => {
  return (
    <Section>
      <p>What to expect ...</p>

      <StepsDescription>
        It takes only few steps to connect people in need to willing volunteers
        on Peepson.
      </StepsDescription>

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
    </Section>
  );
};

export default HomeStepsSection;
