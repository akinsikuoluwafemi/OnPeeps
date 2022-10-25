import React from "react";
import styled from "styled-components";

const StepsWrapper = styled.div`
  height: auto;
  width: 100%;
  //   background-color: teal;
`;

const StepChild = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  //   background-color: red;
  padding: 3rem 0rem;
  height: auto;
`;

const InnerCircle = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: #fff;
    font-size: 25px;
  }
`;

const OuterCircle = styled.div`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
  position: relative;

  .dashes {
    position: absolute;
    top: 116px;
    right: -11px;
    border: 1px solid #000;
    min-width: 90px;
    border-style: dashed;
    transform: rotate(90deg);
  }

  //   margin-bottom: 2rem;
`;

const StepTitleWrapper = styled.div`
  .title-one {
    margin-bottom: 1rem;
    color: #000;
    font-size: 28px;

    @media (max-width: 562px) {
      font-size: 22px;
    }
  }
  .title-two {
    font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
  }
`;

const StepWrapperMobile = () => {
  return (
    <StepsWrapper>
      <StepChild>
        <OuterCircle>
          <InnerCircle>
            <span>1</span>
          </InnerCircle>
          <span className="dashes" />
        </OuterCircle>
        <StepTitleWrapper>
          <p className="title-one">Create a request</p>
          <p className="title-two">Send your request for other peeps to see</p>
        </StepTitleWrapper>
      </StepChild>

      <StepChild>
        <OuterCircle>
          <InnerCircle>
            <span>2</span>
          </InnerCircle>
          <span className="dashes" />
        </OuterCircle>
        <StepTitleWrapper>
          <p className="title-one">Someone gets to volunteer</p>
          <p className="title-two">People out there wants to help you.</p>
        </StepTitleWrapper>
      </StepChild>
      <StepChild>
        <OuterCircle>
          <InnerCircle>
            <span>3</span>
          </InnerCircle>
        </OuterCircle>
        <StepTitleWrapper>
          <p className="title-one">Chat with the volunteer</p>
          <p className="title-two">Get to chat with each other</p>
        </StepTitleWrapper>
      </StepChild>
    </StepsWrapper>
  );
};

export default StepWrapperMobile;
