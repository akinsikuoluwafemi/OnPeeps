import React, { FC } from "react";
import styled from "styled-components";

const StepsChildren = styled.div`
  flex: 1 1 33%;
  justify-content: center;
  align-items: flex-start;
  display: flex;

  flex-direction: column;
  position: relative;

  &:first-child {
    // background-color: red;
  }
  &:nth-child(2) {
    // background-color: orange;
  }
  &:last-child {
    // background-color: pink;
  }

  .dashes {
    position: absolute;
    top: 47px;
    left: 147px;
    transform: translate(-5%, -50%);
    border: 1px solid #000;
    min-width: 50%;
    border-style: dashed;
    // display: none;

    @media (max-width: 1023px) {
      left: 125px;
    }
  }
`;

const OuterCircle = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 2rem;
`;

const InnerCircle = styled.div`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  background: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: #fff;
    font-size: 36px;
  }
`;

const StepTitleWrapper = styled.div`
  .title-one {
    margin-bottom: 1rem;
    color: #000;
    font-size: 28px;
  }
  .title-two {
    font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
  }
`;

interface StepsChildProps {
  stepNumber: number;
  dashed: boolean;
  title: string;
  subTitle: string;
}

const StepsChild: FC<StepsChildProps> = ({
  stepNumber,
  dashed,
  title,
  subTitle,
}) => {
  return (
    <StepsChildren>
      <OuterCircle>
        <InnerCircle>
          <span>{stepNumber}</span>
        </InnerCircle>
        {dashed && <span className="dashes" />}
      </OuterCircle>

      <StepTitleWrapper>
        <p className="title-one">{title}</p>
        <p className="title-two">{subTitle}</p>
      </StepTitleWrapper>
    </StepsChildren>
  );
};

export default StepsChild;
